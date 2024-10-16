import { EmbedBuilder } from "@discordjs/builders";
import type { ThreadChannel } from "discord.js";
import config from "~/lib/config";
import { DiscordEvent } from "~/structures/Event";

export default new DiscordEvent({
	event: "threadCreate",
	listener: async (thread) => {
		if (thread.parent?.id === config.channels.suggestions) {
			handleSuggestionThread(thread);
		}

		if (thread.parent?.id === config.channels.bugReport) {
			handleBugReportThread(thread);
		}
	},
});

async function handleSuggestionThread(thread: ThreadChannel) {
	const message = await thread.send({
		embeds: [
			new EmbedBuilder()
				.setTitle("You have made a suggestion!")
				.setDescription(
					"React to any message within this thread with the `💡 (:bulb:)` emoji to mark is as a suggestion. Afterwards any user can react to the same message with either `✅` or `❌` to show whether they agree or not.",
				)
				.setColor(config.embedColor),
		],
	});

	await message.react("💡");
	await message.react("✅");
	await message.react("❌");
}

async function handleBugReportThread(thread: ThreadChannel) {
	const message = await thread.send({
		embeds: [
			new EmbedBuilder()
				.setTitle("You have mad a bug report!")
				.setColor(config.embedColor),
		],
	});

	await message.react("🐞");
}
