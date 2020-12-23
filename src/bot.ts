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

import * as Discord from 'discord.js';
import * as fs      from 'fs';
import * as _       from 'lodash';
import mysql        from 'mysql';
import AppConfig    from './types/AppConfig';
import EventFile    from './types/EventFile';
import CommandFile  from './types/CommandFile';

const fsReadRecursive = require('fs-readdir-recursive');

const client           = new Discord.Client();
let config : AppConfig = new AppConfig();
_.extend(config, require('../config.json'), require('../private_config.json'));

let commandsObj : { [key : string] : CommandFile } = {};
_.each(fsReadRecursive('./commands/'), function (file : string)
{
    if (!file.endsWith('.js'))
    {
        return;
    }

    let commandName : string = file.substr(0, file.length - 3).replace('/', '.');
    commandsObj[commandName] = require('./commands/' + file);
});

_.each(fs.readdirSync('./events/'), function (file : string)
{
    if (!file.endsWith('.js'))
    {
        return;
    }
    let evtName : string    = file.split('.')[0];
    let evtFile : EventFile = require('./events/' + file);
    if (evtName === 'message')
    {
        // Special case to pass the command object to the message event as it handles command usage as well.
        client.on(evtName, evtFile.handleEvent.bind(null, client, config, commandsObj));
    }
    else
    {
        client.on(evtName, evtFile.handleEvent.bind(null, client, config));
    }
    delete require.cache[require.resolve('./events/' + file)];
});

client.login(config.token)
    .then(function (v : string)
          {
              console.dir('Logged in!');
          });
