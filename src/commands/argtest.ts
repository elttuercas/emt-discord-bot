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
import * as _       from 'lodash';

/**
 * Command to test the command argument parser.
 *
 * @param client
 * @param msg
 * @param args
 *
 * @author Carlos Amores
 */
export async function run(client : Discord.Client, msg : Discord.Message, ...args : Array<string>) : Promise<void>
{
    let argStore : Array<string> = [];
    _.each(args, function (v : string, k : number)
    {
        argStore.push(`Arg #${k}: ${v}`);
    });

    const reply : Discord.MessageEmbed = new Discord.MessageEmbed(
        {
            description: _.join(argStore, '\n'),
        },
    );
    msg.channel.send(reply).catch(console.error);
}
