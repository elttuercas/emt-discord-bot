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
 * Discord userUpdate event handler.
 * @param client
 * @param config
 * @param oldUser
 * @param newUser
 *
 * @author Carlos Amores
 * {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-userUpdate}
 */
export async function handleEvent(client : Discord.Client, config : AppConfig, oldUser : Discord.User, newUser : Discord.User) : Promise<void>
{
    GuildMember
        .findOne(
            {
                where: {
                    discord_id: newUser.id,
                },
            },
        )
        .then(function (r : GuildMember | null)
        {
            if (r && r.discord_name !== newUser.tag)
            {
                r.discord_name = newUser.tag;
                r.save().catch(console.error);
            }
        });
}
