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
 * Command to get a list of users who have all of the specified roles.
 *
 * @param client
 * @param msg
 * @param roles
 *
 * @author Carlos Amores
 */
export async function run(client : Discord.Client, msg : Discord.Message, ...roles : Array<string>) : Promise<void>
{
    let lowerRoles : Array<string>                 = _.map(roles, _.toLower);
    let membersInRole : Array<Discord.GuildMember> = _.filter(msg.guild.members.cache.array(), (m : Discord.GuildMember) => _.every(m.roles.cache.array(), (r : Discord.Role) => _.includes(lowerRoles, _.toLower(r.name))));

    let memberList : Discord.MessageEmbed = new Discord.MessageEmbed(
        {
            title      : 'Users with all of the following roles: ' + _.join(roles, ', '),
            description: _.map(membersInRole, (m : Discord.GuildMember) => m.displayName).join('\n'),
            hexColor   : '#00ffff',
        },
    );
    msg.member.send(memberList).catch(console.error);
}
