import { PlayStationConsoleType, PlayStationConsole } from './PlayStationConsole';

export default class PlayStation5 extends PlayStationConsole
{
	public constructor()
	{
		super(PlayStationConsoleType.PS5, '863367330724446229');
	}

	public get assetName() : string
	{
		return 'ps5_main';
	}

	public get consoleName() : string
	{
		return 'PlayStation 5';
	}
}