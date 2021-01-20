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
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
}                    from 'sequelize-typescript';
import * as Discord  from 'discord.js';
import {GuildMember} from './GuildMember';
import {TempChannel} from './TempChannel';

@Table(
    {
        tableName : 'voice_activity',
        charset   : 'utf8mb4',
        collate   : 'utf8mb4_0900_ai_ci',
        timestamps: false,
    },
)
/**
 * Class VoiceActivity
 *
 * Represents a log of the time spent by a guild member in a voice channel.
 *
 * @author Carlos Amores
 */
export class VoiceActivity extends Model
{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    /**
     * Row UID.
     */
    public id : bigint;
    @AllowNull(false)
    @ForeignKey(() => GuildMember)
    @Column
    /**
     * ID of the user to whom the voice log belongs.
     */
    public discord_id : Discord.Snowflake;
    @AllowNull(false)
    @Column
    /**
     * Discord tag of the user to whom the voice log belongs.
     */
    public discord_name : string;
    @AllowNull(false)
    @ForeignKey(() => TempChannel)
    @Column
    /**
     * The ID of the channel where the user stayed for the duration of the voice log.
     */
    public channel_id : Discord.Snowflake;
    @AllowNull(false)
    @Column
    /**
     * The name of the channel where the user stayed for the duration of the voice log.
     */
    public channel_name : string;
    @AllowNull(false)
    @Column
    /**
     * Start time of voice log.
     */
    public start_va_ts : Date;
    @AllowNull(false)
    @Default(new Date(0))
    @Column
    /**
     * End time of voice log.
     */
    public end_va_ts : Date;
    @BelongsTo(() => GuildMember, 'discord_id')
    /**
     * GuildMember object which owns this log.
     */
    public member : GuildMember;
    @BelongsTo(() => TempChannel, {onDelete: 'NO ACTION', foreignKey: 'channel_id'})
    /**
     * TempChannel object in which the voice log took place.
     */
    public channel : TempChannel;
}
