import {AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table(
    {
        tableName: 'voice_activity',
        charset  : 'utf8mb4',
    },
)
export class VoiceActivity extends Model<VoiceActivity>
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
     * ID of the user to whom the voice log belongs.
     */
    public discord_id : string;
    @AllowNull(false)
    @Column
    /**
     * Discord tag of the user to whom the voice log belongs.
     */
    public discord_name : string;
    @AllowNull(false)
    @Column
    /**
     * The ID of the channel where the user stayed for the duration of the voice log.
     */
    public channel_id : string;
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
}
