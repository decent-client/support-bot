import { Events } from "~/structures/Client";
import type { Event } from "~/types/event";

const replies = [
	"what do you want",
	"don't ping me bro",
	"leave me alone you peasant",
	"why don't you bother someone else",
	"either use my commands or get out",
	"i'm not your friend",
	"you're a pain, you know that?",
	"no.",
	"stop.",
	"(╯°□°)╯︵ ┻━┻",
];

export default {
	event: Events.MessageCreate,
	listener: (message) => {
		if (message.author.id !== message.client.user.id || !message.author.bot) {
			if (message.mentions.has(message.client.user.id)) {
				const randomReply = replies[Math.floor(Math.random() * replies.length)];

				return message.reply({
					content: randomReply,
					allowedMentions: {
						repliedUser: true,
					},
				});
			}
		}
	},
} satisfies Event<"messageCreate">;
