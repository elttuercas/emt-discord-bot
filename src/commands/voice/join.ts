/*
 * __/\\\\\\\\\\\\\\\__/\\\\____________/\\\\__/\\\\\\\\\\\\\\\_
 *  _\/\\\///////////__\/\\\\\\________/\\\\\\_\///////\\\/////__
 *   _\/\\\_____________\/\\\//\\\____/\\\//\\\_______\/\\\_______
 *    _\/\\\\\\\\\\\_____\/\\\\///\\\/\\\/_\/\\\_______\/\\\_______
 *     _\/\\\///////______\/\\\__\///\\\/___\/\\\_______\/\\\_______
 *      _\/\\\_____________\/\\\____\///_____\/\\\_______\/\\\_______
 *       _\/\\\_____________\/\\\_____________\/\\\_______\/\\\_______
 *        _\/\\\\\\\\\\\\\\\_\/\\\_____________\/\\\_______\/\\\_______
 *         _\///////////////__\///______________\///________\///________
 */

import * as Discord from 'discord.js';

/**
 * Command to connect the person executing the command to the voice channel of the person who got tagged in the message.
 *
 * @param client
 * @param msg
 *
 * @author Carlos Amores
 */
export async function run(client : Discord.Client, msg : Discord.Message) : Promise<void>
{
    let targetChannel : Discord.VoiceChannel | null = msg.guild.member(msg.mentions.users.first()).voice.channel;
    if (targetChannel === null)
    {
        msg.member.send('The tagged member is not in a voice channel.').catch(console.error);
        return;
    }

    let userPerms : Readonly<Discord.Permissions> = targetChannel.permissionsFor(msg.member);
    if (userPerms.has(Discord.Permissions.FLAGS.CONNECT) && (!targetChannel.userLimit || targetChannel.members.size < targetChannel.userLimit))
    {
        msg.member.voice.setChannel(targetChannel).catch(console.error);
    }
}
