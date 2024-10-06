declare module "bun" {
	interface Env {
		DISCORD_TOKEN: string;
		GUILD_ID?: string;
	}
}
