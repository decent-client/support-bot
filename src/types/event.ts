import type { ClientEvents } from "discord.js";
import type { DiscordEvent } from "~/structures/Event";

export type Event<Key extends keyof ClientEvents> = DiscordEvent<Key>;
