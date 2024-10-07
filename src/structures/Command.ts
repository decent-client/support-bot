import type {
	CommandInteraction,
	CommandInteractionOptionResolver,
	SlashCommandBuilder,
} from "discord.js";
import type DiscordClient from "~/structures/Client";

interface RunOptions {
	client: DiscordClient;
	interaction: CommandInteraction;
	args: CommandInteractionOptionResolver;
}

type ExecuteFunction = (options: RunOptions) => unknown;

export class DiscordCommand {
	public data: SlashCommandBuilder;
	public execute: ExecuteFunction;

	constructor(command: {
		data: SlashCommandBuilder;
		execute: ExecuteFunction;
	}) {
		this.data = command.data;
		this.execute = command.execute;
	}
}
