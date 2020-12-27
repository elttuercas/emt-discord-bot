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

import * as Discord  from 'discord.js';
import AppConfig     from '../types/AppConfig';
import {GuildMember} from '../models/GuildMember';

/**
 * Discord guildMemberRemove event handler.
 * @param client
 * @param config
 * @param member
 *
 * @author Carlos Amores
 * {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove}
 */
export async function handleEvent(client : Discord.Client, config : AppConfig, member : Discord.GuildMember)
{
    GuildMember
        .destroy(
            {
                where: {
                    discord_id: member.id
                }
            }
        )
        .catch(console.error);
}
