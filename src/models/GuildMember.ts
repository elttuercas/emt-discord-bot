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

import {AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import * as Discord                                                                    from 'discord.js';
import {VoiceActivity}                                                                 from './VoiceActivity';

@Table(
    {
        tableName: '',
        charset  : 'utf8mb4',
    },
)
/**
 * Class GuildMember
 *
 * Represents an user's presence in a Discord server.
 *
 * @author Carlos Amores
 */
export class GuildMember extends Model<GuildMember>
{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    /**
     * Row UID.
     */
    public id : bigint;
    @AllowNull(false)
    @Column
    /**
     * The guild the user is a part of, in case they are in several tracked guilds.
     */
    public guild_id : Discord.Snowflake;
    @AllowNull(false)
    @Column
    /**
     * The ID of the user.
     */
    public discord_id : Discord.Snowflake;
    @AllowNull(false)
    @Column
    /**
     * Discord tag of the user.
     */
    public discord_name : string
    @HasMany(() => VoiceActivity)
    /**
     * The voice logs associated with the user.
     */
    public voiceLogs : Array<VoiceActivity>
}
