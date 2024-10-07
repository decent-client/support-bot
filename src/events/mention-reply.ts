import { DiscordEvent } from "~/structures/Event";

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

export default new DiscordEvent({
	event: "messageCreate",
	listener: (message) => {
		const { client } = message;

		if (message.author.id !== client.user.id || !message.author.bot) {
			if (message.mentions.has(client.user.id)) {
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
});
