import {
	type ApplicationCommandDataResolvable,
	Client,
	type ClientEvents,
	Collection,
	Events,
	GatewayIntentBits,
	Partials,
} from "discord.js";
import { glob } from "glob";
import config from "~/lib/config";
import type { Command } from "~/types/command";
import type { Event } from "~/types/event";

export default class ExtendedClient extends Client {
	public commands: Collection<unknown, Command>;

	constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildEmojisAndStickers,
			],
			partials: [Partials.Message, Partials.Channel, Partials.Reaction],
		});

		this.commands = new Collection();
	}

	public initialize() {
		const { DISCORD_TOKEN } = process.env;

		this.registerModules();
		this.login(DISCORD_TOKEN);
	}

	private async importFile(filePath: string) {
		return (await import(filePath))?.default;
	}

	private async registerCommands({
		commands,
	}: {
		commands: ApplicationCommandDataResolvable[];
	}) {
		if (config.server) {
			this.guilds.cache.get(config.server)?.commands.set(commands);
		} else {
			this.application?.commands.set(commands);
		}
	}

	private async registerModules() {
		const applicationCommands: ApplicationCommandDataResolvable[] = [];

		for (const path of await glob("**/src/commands/**/*.ts")) {
			const command: Command = await this.importFile(path);

			if ("data" in command && "execute" in command) {
				this.commands.set(command.data.name, command);
				applicationCommands.push(command.data.toJSON());
			}
		}

		for (const path of await glob("**/src/events/*.ts")) {
			this.importFile(path).then((event: Event<keyof ClientEvents>) => {
				if (event.once) {
					this.once(event.event, event.listener);
				} else {
					this.on(event.event, event.listener);
				}
			});
		}

		this.once("ready", () => {
			try {
				this.registerCommands({
					commands: applicationCommands,
				});
			} finally {
				if (config.server) {
					const server = this.guilds.cache.get(config.server);
					console.log(
						`Registering commands to ${server?.name} (${config.server})`,
					);
				} else {
					console.log("Registering commands (globally)");
				}
			}
		});
	}
}
