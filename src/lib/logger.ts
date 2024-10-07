import chalk from "chalk";
import { repeat } from "string-ts";

export class Logger {
	public init(...data: string[]) {
		console.log(
			repeat(" ", 2),
			chalk.bgCyan(" INITIALIZED "),
			repeat(" ", 1),
			...data,
		);
	}
}
