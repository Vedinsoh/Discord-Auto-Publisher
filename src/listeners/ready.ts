import { Events } from 'discord.js';
import client from '#client';
import Event from '#structures/Event';

export default new Event(Events.ClientReady, async () => {
  await client.blacklist.startupCheck();
});
