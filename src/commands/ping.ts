import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ClientExtension } from "../interfaces/clientExtension";
import { Command } from "../interfaces/command";

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping."),
  
  run: async (client: ClientExtension, interaction: ChatInputCommandInteraction) => {
    await interaction.reply({ content: "Latency: `"+ client.ws.ping + " ms`" });
  },
};
