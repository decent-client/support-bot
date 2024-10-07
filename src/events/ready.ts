import chalk from "chalk";
import { ActivityType } from "discord.js";
import { Logger } from "~/lib/logger";
import { DiscordEvent } from "~/structures/Event";

const logger = new Logger();

export default new DiscordEvent({
	event: "ready",
	once: true,
	listener: async (client) => {
		logger.init(
			`Successfully logged in as ${chalk.bold(client.user.username)}!`,
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
