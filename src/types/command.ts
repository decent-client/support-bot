import type {
	CommandInteraction,
	CommandInteractionOptionResolver,
	SlashCommandBuilder,
} from "~/structures/Client";
import type ExtendedClient from "~/structures/Client";

export type Command = {
	data: SlashCommandBuilder;
	execute: (options: {
		client: ExtendedClient;
		interaction: CommandInteraction;
		args: CommandInteractionOptionResolver;
	}) => unknown;
};
