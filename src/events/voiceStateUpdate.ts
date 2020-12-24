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
import AppConfig       from '../types/AppConfig';
import {VoiceActivity} from '../models/VoiceActivity';

/**
 * Handles inserting a record into the database when an user joins a channel.
 * @param user
 * @param channel
 *
 * @author Carlos Amores
 */
function userJoinedChannel(user : Discord.GuildMember, channel : Discord.GuildChannel) : void
{
    VoiceActivity.create(
        {
            discord_id  : user.id,
            discord_name: user.user.tag,
            channel_id  : channel.id,
            channel_name: channel.name,
            start_va_ts : new Date(),
        },
    ).catch(console.error);
}

/**
 * Handles updating the relevant record for when an user leaves a channel.
 * @param user
 * @param channel
 *
 * @author Carlos Amores
 */
function userLeftChannel(user : Discord.GuildMember, channel : Discord.GuildChannel) : void
{
    VoiceActivity
        .findOne(
            {
                where: {
                    channel_id: channel.id,
                    discord_id: user.id,
                    end_va_ts : new Date(0),
                },
            },
        )
        .then(function (voiceLog : VoiceActivity | null)
        {
            if (voiceLog)
            {
                voiceLog.end_va_ts = new Date();
                voiceLog.save().catch(console.error);
            }
        });
}

/**
 * Discord voiceStateUpdate event handler.
 * @param client
 * @param config
 * @param oldVState
 * @param newVState
 *
 * @author Carlos Amores
 * {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate}
 */
export async function handleEvent(client : Discord.Client, config : AppConfig, oldVState : Discord.VoiceState, newVState : Discord.VoiceState) : Promise<void>
{
    if (oldVState.member === null || newVState.member === null)
    {
        return;
    }

    if (oldVState.channel === null && newVState.channel !== null && !config.untracked_voice_channels.includes(newVState.channel.id))
    {
        userJoinedChannel(newVState.member, newVState.channel);
    }
    else if (oldVState.channel !== null && newVState.channel === null && !config.untracked_voice_channels.includes(oldVState.channel.id))
    {
        userLeftChannel(oldVState.member, oldVState.channel);
    }
    else if (oldVState.channel !== null && newVState.channel !== null && oldVState.channel.id !== newVState.channel.id)
    {
        if (!config.untracked_voice_channels.includes(oldVState.channel.id))
        {
            userLeftChannel(oldVState.member, oldVState.channel);
        }
        if (!config.untracked_voice_channels.includes(newVState.channel.id))
        {
            userJoinedChannel(newVState.member, newVState.channel);
        }
    }
}
