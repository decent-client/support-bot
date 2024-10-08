import chalk from "chalk";
import { ActivityType } from "discord.js";
import { DiscordEvent } from "~/structures/Event";

export default new DiscordEvent({
	event: "ready",
	once: true,
	listener: async (client) => {
		console.log(
			`✅ Successfully logged in as ${chalk.bold(client.user.username)}!`,
		);

		client.user.setPresence({
			activities: [
				{
					name: "Decent Client",
					type: ActivityType.Playing,
				},
			],
			status: "dnd",
		});
	},
});
