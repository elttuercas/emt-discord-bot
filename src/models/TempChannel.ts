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
import {VoiceActivity} from './VoiceActivity';
import {GuildMember}   from './GuildMember';

@Table(
    {
        tableName : 'temp_channels',
        charset   : 'utf8mb4',
        collate   : 'utf8mb4_0900_ai_ci',
        timestamps: false,
    },
)
/**
 * Class TempChannel
 *
 * Represents a currently active temporary channel in the server.
 *
 * @author Carlos Amores
 */
export class TempChannel extends Model<TempChannel>
{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    /**
     * Row UID.
     */
    public id : bigint;
    @AllowNull(true)
    @Column
    /**
     * The parent of the temporary channel if this channel is an event sub channel.
     */
    public parent_id : Discord.Snowflake | null;
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
    @AllowNull(false)
    @Column
    /**
     * Whether this temporary channel is an event channel.
     */
    public event_channel : boolean;
    @AllowNull(false)
    @Column
    /**
     * Whether this temporary channel is an event sub channel.
     */
    public event_sub_channel : boolean;
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

    /**
     * Retrieve the sub channels of this temporary event channel.
     * @throws Error When the method is called on a non-event channel record.
     */
    public async getSubChannels() : Promise<Array<TempChannel>>
    {
        if (!this.event_channel)
        {
            throw new Error('TempChannel::getSubChannels cannot be called on a non-event channel record.');
        }

        return TempChannel.findAll(
            {
                where: {
                    parent_id: this.channel_id,
                },
            },
        );
    }

    /**
     * Delete all the sub channels associated with this temporary event channel.
     * @throws Error When the method is called on a non-event channel record.
     */
    public async deleteSubChannels() : Promise<number>
    {
        if (!this.event_channel)
        {
            throw new Error('TempChannel::deleteSubChannels cannot be called on a non-event channel record.');
        }

        return TempChannel.destroy(
            {
                where: {
                    parent_id: this.channel_id,
                },
            },
        );
    }
}
