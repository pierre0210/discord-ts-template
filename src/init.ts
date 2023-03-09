import path from "path";
import fs from "fs";
import { REST, Routes } from "discord.js";
import { ClientExtension } from "./interfaces/clientExtension";
import { Command } from "./interfaces/command";

const exampleConfig = {
  DevGuildId: "",
  DevMode: false,
};

export const config = () => {
  const configFilePath = path.join(process.cwd(), "prod", "config.json");
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(path.join(process.cwd(), "prod", "config.json"), JSON.stringify(exampleConfig, null, 4));
    console.log("config.json not found.");
    process.exit(1);
  }
};

export const register = async (client: ClientExtension) => {
  const configFilePath = path.join(process.cwd(), "prod", "config.json");
  client.commands = [];

  const config = await import(configFilePath);

  const commandDir = path.join(process.cwd(), "prod", "commands");
  const files = fs.readdirSync(commandDir, { encoding: "utf-8" });
  for (const file of files) {
    const name = file.split(".")[0];
    const cmd = await import(path.join(process.cwd(), "prod", "commands", file));
    client.commands.push(cmd[name] as Command);
    console.log(`${name} command loaded`);
  }
  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN as string);
  const commandData = client.commands.map((cmd) => cmd.data.toJSON());
  // Guild command registration
  if (!config.DevMode) {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID || ""), { body: commandData });
    console.log("Registered Global command");
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID || "", config.DevGuildId), { body: [] });
    console.log("Cleared Guild command");
  }
  else {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID || ""), { body: [] });
    console.log("Cleared Global command");
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID || "", config.DevGuildId), { body: commandData });
    console.log("Registered Guild command");
  }
};
