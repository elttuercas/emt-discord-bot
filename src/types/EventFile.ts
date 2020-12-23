import * as Discord from 'discord.js';
import AppConfig    from './AppConfig';

/**
 * Interface EventFile
 *
 * Represents an object resulting from the export of a file which defines a function to handle a specific Discord.js
 * client event with the same name as the file itself.
 *
 * @author Carlos Amores
 */
export default interface EventFile
{
    handleEvent : (client : Discord.Client, config : AppConfig, ...args : any) => void,

    [key : string] : any
}
