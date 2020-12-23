import * as Discord from 'discord.js';

/**
 * Interface CommandFile
 *
 * Represents an object resulting from the export of a file which defines a function to handle a specific command being
 * invoked with the same name as the file taking into account the path from the commands directory and replacing the
 * directory separator with a dot.
 *
 * @author Carlos Amores
 */
export default interface CommandFile
{
    run : (client : Discord.Client, msg : Discord.Message, ...args : Array<string>) => void;
    [key: string] : any;
}
