import * as Discord from 'discord.js';

export function run(client : Discord.Client, msg : Discord.Message)
{
    msg.channel.send('Hello, world!').then(console.dir);
}
