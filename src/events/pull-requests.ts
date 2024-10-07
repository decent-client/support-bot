import { ChannelType } from "discord.js";
import { DiscordEvent } from "~/structures/Event";

const pullRequestsChannel = "1292517593952948274";

export default new DiscordEvent({
	event: "ready",
	once: true,
	listener: async (client) => {
		setInterval(async () => {
			const channel = client.channels.cache.get(pullRequestsChannel);
			const pullRequests: [] = await fetch(
				"https://api.github.com/repos/decent-client/launcher/pulls",
			).then((response) => response.json());

			if (channel && channel.type === ChannelType.GuildVoice) {
				channel.setName(`Pull Requests: ${pullRequests.length}`);
			}
		}, 600000);
	},
});
