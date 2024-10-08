import type { Client, Collection } from "discord.js";
import type DiscordClient from "~/structures/Client";
import type { Command } from "~/types/command";

declare module "bun" {
	interface Env {
		DISCORD_TOKEN: string;
		GUILD_ID?: string;
	}
}

declare module "discord.js" {
	export interface Client {
		commands: Collection<unknown, Command>;
	}
}
