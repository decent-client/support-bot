import { SlashCommandBuilder } from "discord.js";
import { name, version } from "~/../package.json";
import { DiscordCommand } from "~/structures/Command";

export default new DiscordCommand({
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("bot version and ping"),
	execute: async ({ client, interaction }) => {
		await interaction.reply({
			content: `\`${name}@${version}\`\n latency: **${
				Date.now() - interaction.createdTimestamp
			}ms**\n websocket: **${Math.max(client.ws.ping, 0)}ms**`,
			ephemeral: true,
		});
	},
});
