import { Client, GatewayIntentBits, Interaction } from "discord.js";
import dotenv from "dotenv";
import interactionCreate from "./events/interactionCreate";
import ready from "./events/ready";
import { ClientExtension } from "./interfaces/clientExtension";
import * as init from "./init";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as ClientExtension;

client.on("ready", async () => await ready(client));

client.on("interactionCreate", async (interaction: Interaction) => interactionCreate(interaction, client));

init.config();
init.register(client).then(() => {
  client.login(process.env.TOKEN);
});