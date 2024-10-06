import chalk from "chalk";
import { logger } from "~/lib/logger";
import { ActivityType, ChannelType, Events } from "~/structures/Client";
import type { Event } from "~/types/event";

export default {
	event: Events.ClientReady,
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

		setInterval(async () => {
			const channel = client.channels.cache.get("1292517593952948274");
			const pullRequests: [] = await fetch(
				"https://api.github.com/repos/decent-client/launcher/pulls",
			).then((response) => response.json());

			if (channel && channel.type === ChannelType.GuildVoice) {
				channel.setName(`Pull Requests: ${pullRequests.length}`);
			}
		}, 600000);
	},
} satisfies Event<"ready">;
