import { Client, Collection, Events, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import config from "./config/config";

(async () => {
    const client = new Client({
        intents: [
            "Guilds",
            "GuildMessages",
            "GuildMembers",
        ]
    })
    
    client.commands = new Collection();

    const files = readdirSync("./src/commands").filter(file => file.endsWith(".ts"));

    for (const file of files) {
        const command = await import(`./commands/${file}`);
        client.commands.set(command.default.name, command.default);
    }
})();


declare module "discord.js" {
    interface Client {
        commands: Collection<string, any>
    }
}