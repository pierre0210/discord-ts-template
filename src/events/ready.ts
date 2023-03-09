import { ClientExtension } from "../interfaces/clientExtension";

export default async (client: ClientExtension) => {
  console.log(`Logged in as ${client.user?.tag}`);
};
