import type { ClientEvents } from "discord.js";

export class DiscordEvent<Key extends keyof ClientEvents> {
	public event: Key;
	public once = false;
	public listener: (...args: ClientEvents[Key]) => unknown;

	constructor(options: {
		event: Key;
		once?: boolean;
		listener: (...args: ClientEvents[Key]) => unknown;
	}) {
		this.event = options.event;
		this.once = options.once ?? false;
		this.listener = options.listener;
	}
}
