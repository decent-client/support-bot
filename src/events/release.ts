import {
	type DiscordGatewayAdapterCreator,
	joinVoiceChannel,
} from "@discordjs/voice";
import { ChannelType } from "discord.js";
import config from "~/lib/config";
import { DiscordEvent } from "~/structures/Event";

export default new DiscordEvent({
	event: "ready",
	once: true,
	listener: async (client) => {
		const channel = client.channels.cache.get(config.channels.release);

		if (channel && channel.type === ChannelType.GuildVoice) {
			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild
					.voiceAdapterCreator as DiscordGatewayAdapterCreator,
				selfDeaf: false,
			});
		}

		setInterval(async () => {
			const tags: { ref: string }[] = await fetch(
				"https://api.github.com/repos/decent-client/launcher/git/refs/tags",
			).then((response) => response.json());

			if (channel && channel.type === ChannelType.GuildVoice) {
				channel.setName(
					`Release: ${tags.at(0)?.ref.replace(/refs\/tags\//gim, "")}`,
				);
			}
		}, 600000);
	},
});
