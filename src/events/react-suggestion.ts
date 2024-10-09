import { DiscordEvent } from "~/structures/Event";

export default new DiscordEvent({
	event: "messageReactionAdd",
	listener: async (reaction) => {
		if (reaction.emoji.name === "💡") {
			await reaction.message.react("✅");
			await reaction.message.react("❌");
		}
	},
});
