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

import * as Discord    from 'discord.js';
import * as _          from 'lodash';
import {GuildMember}   from '../../models/GuildMember';
import {VoiceActivity} from '../../models/VoiceActivity';

/**
 * Refreshes the list of guild members.
 * @param client
 * @param msg
 *
 * @author Carlos Amores
 */
export async function run(client : Discord.Client, msg : Discord.Message) : Promise<void>
{
    // Load all voice logs as they are going to be deleted upon deletion of all guild member records.
    VoiceActivity
        .findAll()
        .then(function (voiceLogs : Array<VoiceActivity>)
        {
            // Create an array of objects which can be used to recreate the voice logs after their deletion.
            let voiceLogCp : Array<{
                id : bigint,
                discord_id : Discord.Snowflake,
                discord_name : string,
                channel_id : Discord.Snowflake,
                channel_name : string,
                start_va_ts : Date,
                end_va_ts : Date
            }> = [];
            /*
             * This may seem illogical given that there already is an array of VoiceActivity objects which can be used
             * to recreate the records which are going to be lost. However, the internal structure of the object does
             * not match the structure required by bulkCreate as it is more of a wrapper around the real data therefore
             * it needs to be accessed and retrieved manually.
             */
            _.each(voiceLogs, function (v : VoiceActivity)
            {
                voiceLogCp.push(
                    {
                        id          : v.id,
                        discord_id  : v.discord_id,
                        discord_name: v.discord_name,
                        channel_id  : v.channel_id,
                        channel_name: v.channel_name,
                        start_va_ts : v.start_va_ts,
                        end_va_ts   : v.end_va_ts,
                    },
                );
            });
            GuildMember
                // See: https://github.com/sequelize/sequelize/issues/3131
                .destroy({where: {}})
                .then(function ()
                {
                    let guildMemberDefArr : Array<{ discord_id : Discord.Snowflake, discord_name : string }> = [];
                    _.each(msg.guild.members.cache.array(), function (v : Discord.GuildMember)
                    {
                        if (v.user.bot)
                        {
                            return;
                        }

                        guildMemberDefArr.push(
                            {
                                discord_id  : v.id,
                                discord_name: v.user.tag,
                            },
                        );
                    });
                    GuildMember
                        .bulkCreate(guildMemberDefArr)
                        .then(function ()
                        {
                            // Wait for guild member insertion to complete due foreign key constraints.
                            VoiceActivity.bulkCreate(voiceLogCp).catch(console.error);
                        });
                });
        });
}
