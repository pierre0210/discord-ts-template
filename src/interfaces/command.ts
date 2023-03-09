import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, ChatInputCommandInteraction } from "discord.js";
import { ClientExtension } from "./clientExtension";

export interface Command {
  data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">| SlashCommandSubcommandsOnlyBuilder;
  run: (client: ClientExtension, interaction: ChatInputCommandInteraction) => Promise<void>;
}
