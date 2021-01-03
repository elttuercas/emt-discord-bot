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
import {TempChannel} from '../models/TempChannel';
import _             from 'lodash';

/**
 * Discord channelDelete event handler.
 * @param client
 * @param config
 * @param channel
 *
 * @author Carlos Amores
 * {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelDelete}
 */
export async function handleEvent(client : Discord.Client, config : AppConfig, channel : Discord.Channel) : Promise<void>
{
    if (!(channel instanceof Discord.VoiceChannel))
    {
        return;
    }

    TempChannel
        .findOne(
            {
                where: {
                    channel_id: channel.id,
                },
            },
        )
        .then(function (ch : TempChannel | null)
        {
            if (ch === null)
            {
                return;
            }

            if (ch.event_channel)
            {
                /*
                 * When a channel is an event channel all the sub channels associated with it must be deleted as well.
                 * Therefore, the sub channels are loaded from the database then they are deleted from Discord based on
                 * their IDs and then they are deleted from the database as well.
                 */
                ch
                    .getSubChannels()
                    .then(function (subCh : Array<TempChannel>)
                    {
                        // @ts-ignore Type Array<Discord.GuildChannel> is not assignable to type
                        // Array<Discord.VoiceChannel>. However, the array is being filtered to only return instances
                        // of Discord.VoiceChannel thus making the warning incorrect.
                        let channelsToDelete : Array<Discord.VoiceChannel> = _.filter(channel.guild.channels.cache.array(), (c : Discord.GuildChannel) => c instanceof Discord.VoiceChannel && _.find(subCh, (tc : TempChannel) => tc.channel_id === c.id) !== undefined);
                        _.each(channelsToDelete, function (c : Discord.VoiceChannel)
                        {
                            c.delete().catch(console.error);
                        });
                    })
                    .catch(console.error);
                TempChannel
                    .destroy(
                        {
                            where: {
                                parent_id: ch.channel_id,
                            },
                        },
                    )
                    .catch(console.error);
            }

            ch.destroy().catch(console.error);
        })
        .catch(console.error);
}
