import { PlayStationConsoleType, PlayStationConsole } from './PlayStationConsole';

export default class PlayStationVita extends PlayStationConsole
{
	public constructor()
	{
		super(PlayStationConsoleType.PSVITA, '863654167569891338');
	}

	public get assetName() : string
	{
		return 'vita_main';
	}

	public get consoleName() : string
	{
		return 'PlayStation Vita';
	}
}