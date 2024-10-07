import {
	type ApplicationCommandDataResolvable,
	Client,
	type ClientEvents,
	Collection,
	Events,
	GatewayIntentBits,
} from "discord.js";
import { glob } from "glob";
import { logger } from "~/lib/logger";
import type { Command } from "~/types/command";
import type { Event } from "~/types/event";

export class ExtendedClient extends Client {
	commands: Collection<unknown, Command>;
	constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMessages,
			],
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
		guild,
	}: {
		commands: ApplicationCommandDataResolvable[];
		guild?: string;
	}) {
		if (guild) {
			this.guilds.cache.get(guild)?.commands.set(commands);
			logger.init(`Registering commands to ${guild}`);
		} else {
			this.application?.commands.set(commands);
			logger.init("Registering global commands");
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

		this.once(Events.ClientReady, () => {
			this.registerCommands({
				commands: applicationCommands,
				guild: process.env.GUILD_ID,
			});
		});
	}
}
