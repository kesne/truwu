import React from 'react';
import { ActionType } from '../../../models/Actions';
import TTS from './TTS';
import { BaseActionProps } from './BaseAction';
import Delay from './Delay';
import UnknownAction from './UnknownAction';
import DMX from './DMX';

const ActionComponents = {
	[ActionType.TTS]: TTS,
	[ActionType.DELAY]: Delay,
	[ActionType.DMX]: DMX,
}

export default function Action(props: BaseActionProps) {
	const { action } = props;

	if (action.type in ActionComponents) {
		// @ts-expect-error: Whatever...
		const Component = ActionComponents[action.type];
		return <Component {...props} />
	}

	return <UnknownAction {...props} />;
}
