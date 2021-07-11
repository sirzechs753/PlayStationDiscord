import { PlayStationConsoleType, PlayStationConsole } from './PlayStationConsole';

export default class PlayStation3 extends PlayStationConsole
{
	public constructor()
	{
		super(PlayStationConsoleType.PS3, '863653978763165707');
	}

	public get assetName() : string
	{
		return 'ps3_main';
	}

	public get consoleName() : string
	{
		return 'PlayStation 3';
	}
}