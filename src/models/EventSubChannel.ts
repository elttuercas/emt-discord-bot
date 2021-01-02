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
}                      from 'sequelize-typescript';
import * as Discord    from 'discord.js';
import {EventChannel}  from './EventChannel';
import {GuildMember}   from './GuildMember';
import {VoiceActivity} from './VoiceActivity';

@Table(
    {
        tableName : 'event_sub_channels',
        charset   : 'utf8mb4',
        collate   : 'utf8mb4_0900_ai_ci',
        timestamps: false,
    },
)
/**
 * Class EventSubChannel
 *
 * Represents a channel created from within an event channel through a text command which binds the primary event channel
 * and the sub channel together even though they do not differ in the slightest from Discord's point of view.
 *
 * @author Carlos Amores
 */
export class EventSubChannel extends Model<EventSubChannel>
{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    /**
     * Row UID.
     */
    public id : bigint;
    @AllowNull(false)
    @ForeignKey(() => EventChannel)
    @Column
    /**
     * The channel ID of the primary event channel from where the sub channel was created.
     */
    public parent_id : Discord.Snowflake;
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
    @BelongsTo(() => EventChannel, 'parent_id')
    /**
     * The EventChannel object which acts as parent of the sub channel.
     */
    public parent : EventChannel;
}
