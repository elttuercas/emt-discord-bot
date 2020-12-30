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

/**
 * Command to get a list of users who have at least one of the specified roles.
 *
 * @param client
 * @param msg
 * @param groupNames
 *
 * @author Carlos Amores
 */
export async function run(client : Discord.Client, msg : Discord.Message, ...groupNames : Array<string>)
{
    let lowerGroupNames : Array<string> = _.map(groupNames, _.toLower);
    let membersInGroup : Array<Discord.GuildMember> = _.filter(msg.guild.members.cache.array(), (m : Discord.GuildMember) => _.some(m.roles.cache.array(), (r : Discord.Role) => _.includes(lowerGroupNames, _.toLower(r.name))));

    let memberList : Discord.MessageEmbed = new Discord.MessageEmbed(
        {
            title: 'Users with role(s): ' + _.join(groupNames, ', '),
            description : _.map(membersInGroup, (m : Discord.GuildMember) => m.displayName).join('\n'),
            hexColor : '#0ff'
        }
    );
    msg.member.send(memberList).catch(console.error);
}
