import { Interaction } from "discord.js";
import { ClientExtension } from "../interfaces/clientExtension";

export default async (interaction: Interaction, client: ClientExtension) => {
  if (interaction.isCommand()) {
    const command = client.commands.find((cmd) => cmd.data.name === interaction.commandName);
    if (!command) {
      await interaction.reply({ content: "Command not found.", ephemeral: true });
    }
    else {
      if (interaction.isChatInputCommand()) {
        await command.run(client, interaction);
      }
    }
  }
};
