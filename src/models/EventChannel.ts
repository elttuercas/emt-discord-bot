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
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
}                        from 'sequelize-typescript';
import * as Discord      from 'discord.js';
import {GuildMember}     from './GuildMember';
import {VoiceActivity}   from './VoiceActivity';
import {EventSubChannel} from './EventSubChannel';

@Table(
    {
        tableName : 'event_channels',
        charset   : 'utf8mb4',
        collate   : 'utf8mb4_0900_ai_ci',
        timestamps: false,
    },
)
/**
 * Class EventChannel
 *
 * Represents a currently active temporary channel which can be used to host events using the Event Management Tool.
 * These channels are located in separate categories from other temporary channels.
 *
 * @author Carlos Amores
 */
export class EventChannel extends Model<EventChannel>
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
     * The ID of the temporary channel.
     */
    public channel_id : Discord.Snowflake;
    @AllowNull(false)
    @Column
    /**
     * The name of the temporary channel.
     */
    public channel_name : string;
    @AllowNull(false)
    @ForeignKey(() => GuildMember)
    @Column
    /**
     * The user ID of the person who currently owns the temporary channel.
     */
    public owner_id : Discord.Snowflake;
    @AllowNull(false)
    @Column
    /**
     * The ID of the category under which the channel is located.
     */
    public cat_id : Discord.Snowflake;
    @HasMany(() => VoiceActivity, {sourceKey: 'channel_id'})
    /**
     * The voice logs associated with this channel.
     */
    public voiceLogs : Array<VoiceActivity>;
    @BelongsTo(() => GuildMember, 'owner_id')
    /**
     * The GuildMember object which represents the owner of the temporary channel.
     */
    public owner : GuildMember;
    @HasMany(() => EventSubChannel, 'parent_id')
    /**
     * All of the sub channels associated with the event channel.
     */
    public subChannels : Array<EventSubChannel>;
}
