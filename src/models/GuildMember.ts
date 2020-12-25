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

import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
}                   from 'sequelize-typescript';
import * as Discord from 'discord.js';
import {VoiceActivity}                                                                 from './VoiceActivity';

@Table(
    {
        tableName : 'guild_members',
        charset   : 'utf8mb4',
        collate   : 'utf8mb4_0900_ai_ci',
        timestamps: false,
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
    @Unique
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
    public discord_name : string;
    @HasMany(() => VoiceActivity, {sourceKey: 'discord_id'})
    /**
     * The voice logs associated with the user.
     */
    public voiceLogs : Array<VoiceActivity>;
}
