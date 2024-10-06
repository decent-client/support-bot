import type ExtendedClient from "~/structures/Client";
import {
	type CommandInteractionOptionResolver,
	Events,
} from "~/structures/Client";
import type { Event } from "~/types/event";

export default {
	event: Events.InteractionCreate,
	listener: async (interaction) => {
		if (interaction.isChatInputCommand()) {
			const command = (interaction.client as ExtendedClient).commands.get(
				interaction.commandName,
			);

			if (!command) {
				if (interaction.replied || interaction.deferred) {
					return await interaction.followUp({
						content: "This command appears to not exists!",
						ephemeral: true,
					});
				}

				return await interaction.reply({
					content: "This command appears to not exists!",
					ephemeral: true,
				});
			}

			try {
				command.execute({
					client: interaction.client as ExtendedClient,
					interaction,
					args: interaction.options as CommandInteractionOptionResolver,
				});
			} catch (error) {
				console.error(error);

				if (interaction.replied || interaction.deferred) {
					return await interaction.followUp({
						content: "There was an error while executing this command!",
						ephemeral: true,
					});
				}

				await interaction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		}
	},
} satisfies Event<"interactionCreate">;
