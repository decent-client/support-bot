import type { CommandInteractionOptionResolver } from "discord.js";
import type DiscordClient from "~/structures/Client";
import { DiscordEvent } from "~/structures/Event";

export default new DiscordEvent({
	event: "interactionCreate",
	listener: async (interaction) => {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

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
					client: interaction.client as DiscordClient,
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
});
