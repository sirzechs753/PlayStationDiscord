import _store = require('electron-store');
import log = require('electron-log');
import axios from 'axios';
import { IBasicPresence } from './Model/PresenceModel';
const unorm = require('unorm');

interface IGame
{
	name : string;
	titleId : string;
}

interface ISupportedGames
{
	ps5 : IGame[];
	ps4 : IGame[];
	ps3 : IGame[];
	vita : IGame[];
	etag : string;
}

class SupportedGames
{
	public static get instance() : SupportedGames
	{
		return this._instance || (this._instance = new this());
	}

	private static _instance : SupportedGames;

	private store : any;

	private constructor()
	{
		this.store = new _store({
			name: 'games',
		});

		const checksum = this.store.get('etag');

		const headers : any = {
			'User-Agent': 'PlayStationDiscord (https://github.com/sirzechs753/PlayStationDiscord)'
		};

		if (checksum)
		{
			headers['If-None-Match'] = checksum;
		}

		axios.get(`https://raw.githubusercontent.com/sirzechs753/PlayStationDiscord-Games/master/games.json?_=${Date.now()}`, {
			headers
		})
		.then((response) => {
			this.store.set('consoles', response.data);
			this.store.set('etag', response.headers.etag);

			log.info('Saved new version of games.json');
		})
		.catch((err) => {
			if (err.response.status === 304)
			{
				log.info('PlayStationDiscord-Games has not been updated, using cached version');

				return undefined;
			}

			log.error('Failed requesting games.json from the PlayStationDiscord-Games repo', err);
		});
	}

	public get(presence: IBasicPresence) : IGame
	{
		const console = presence.primaryPlatformInfo.platform.toLowerCase();
		const consoleStore = `consoles.${console}`;
		if (!this.store.has(consoleStore))
		{
			log.debug('no console found in supported games list.');

			return undefined;
		}

		return this.store.get(consoleStore).find((game: IGame) => {
			const titleInfo = presence.gameTitleInfoList[0];
			if (game.titleId.toLowerCase() === titleInfo.npTitleId.toLowerCase()) {
				return true;
			}

			return unorm.nfc(game.name.toLowerCase()).indexOf(unorm.nfc(titleInfo.titleName.toLowerCase())) !== -1;
		});
	}
}

module.exports = SupportedGames.instance;