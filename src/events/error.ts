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
import AppConfig    from '../types/AppConfig';

/**
 * Discord error event handler.
 * @param client
 * @param config
 * @param error
 *
 * @author Carlos Amores
 * {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-error}
 */
export async function handleEvent(client : Discord.Client, config : AppConfig, error : Error) : Promise<void>
{
    console.error(error);
}
