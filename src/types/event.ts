import type { ClientEvents } from "discord.js";

export type Event<Key extends keyof ClientEvents> = {
	event: Key;
	once?: boolean;
	listener: (...args: ClientEvents[Key]) => unknown;
};
