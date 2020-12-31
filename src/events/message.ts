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
import AppConfig    from '../types/AppConfig';
import CommandFile  from '../types/CommandFile';

/**
 * Discord message event handler.
 * @param client
 * @param config
 * @param message
 * @param cmdObj
 *
 * @author Carlos Amores
 * {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message}
 */
export async function handleEvent(client : Discord.Client, config : AppConfig, cmdObj : { [key : string] : CommandFile }, message : Discord.Message) : Promise<void>
{
    if (message.author.bot || message.channel instanceof Discord.DMChannel || message.member === null)
    {
        return;
    }

    let isCommand : boolean = false;
    let commandName : string;
    _.each(_.keys(cmdObj), function (k : string)
    {
        if (message.content.startsWith(config.prefix + k))
        {
            isCommand   = true;
            commandName = k;
            return false;
        }
    });

    if (isCommand)
    {
        let cmdArgs : Array<string> = message.content
            .substr(config.prefix.length + commandName.length)
            .trim()
            /** {@link https://regex101.com/r/gTpMk5/3} */
            .split(/\s+(?=(?:(?:\\[\\"]|[^\\"])*"(?:\\[\\"]|[^\\"])*")*(?:\\[\\"]|[^\\"])*$)/gm);
        cmdArgs                     = _.map(cmdArgs, function (arg : string) : string
        {
            /** {@link https://regex101.com/r/wFPxtv/2} */
            let argWithoutDelimiters : string = _.replace(arg, /((?<!\\)(?:\\{2})*)["]/gm, '$1');
            return _.replace(argWithoutDelimiters, /\\"/gm, '"');
        });
        cmdObj[commandName].run(client, message, ...cmdArgs).catch(console.error);
    }
    else
    {
        // Handle non-command-related events here. Maybe link censorship, notification alert, etc.
    }
}
