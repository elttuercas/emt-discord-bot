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
import {GuildMember} from '../../models/GuildMember';
import * as _        from 'lodash';

/**
 * Refreshes the
 * @param client
 * @param msg
 *
 * @author Carlos Amores
 */
export async function run(client : Discord.Client, msg : Discord.Message) : Promise<void>
{
    GuildMember
        .destroy(
            {
                where: {
                    guild_id: msg.guild.id,
                },
            },
        )
        .then(function ()
        {
            let guildMemberDefArr : Array<{ guild_id : Discord.Snowflake, discord_id : Discord.Snowflake, discord_name : string }> = [];
            // @ts-ignore This is legitimately the same as cache.forEach with the same callback fn params and that
            // doesn't cause an error.
            _.each(msg.guild.members.cache, function (v : Discord.GuildMember)
            {
                if (v.user.bot)
                {
                    return;
                }

                guildMemberDefArr.push(
                    {
                        guild_id    : msg.guild.id,
                        discord_id  : v.id,
                        discord_name: v.user.tag,
                    },
                );
            });
            GuildMember.bulkCreate(guildMemberDefArr).catch(console.error);
        });
}
