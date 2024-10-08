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
			const release: { tag_name: string } = await fetch(
				"https://api.github.com/repos/decent-client/launcher/releases/latest",
			).then((response) => response.json());

			if (channel && channel.type === ChannelType.GuildVoice) {
				channel.setName(`Release: ${release.tag_name}`);
			}
		}, 600000);
	},
});
