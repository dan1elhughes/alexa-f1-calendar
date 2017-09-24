'use strict';

const Alexa = require('alexa-sdk');
const getNextRace = require('./getNextRace');

const APP_ID = 'amzn1.ask.skill.8fb9d7e0-c786-4c7c-8f35-03ccb4a37fb9';
const SKILL_NAME = 'F1 Calendar';

const { GET_FACT_PREFIX_MESSAGE, HELP_MESSAGE, STOP_MESSAGE } = require('./messages');

const handlers = {
	'LaunchRequest': function() {
		this.emit('GetNextRace');
	},

	'GetNextRaceIntent': function() {
		this.emit('GetNextRace');
	},

	'AMAZON.CancelIntent': function() {
		this.emit(':tell', STOP_MESSAGE);
	},

	'AMAZON.StopIntent': function() {
		this.emit(':tell', STOP_MESSAGE);
	},

	'AMAZON.HelpIntent': function() {
		this.emit(':ask', HELP_MESSAGE, HELP_MESSAGE);
	},

	'GetNextRace': function() {
		getNextRace().then(nextRace => {
			const speechOutput = GET_FACT_PREFIX_MESSAGE + nextRace;
			this.emit(':tellWithCard', speechOutput, SKILL_NAME, nextRace);
		});
	},
};

exports.handler = function (event, context) {
	const alexa = Alexa.handler(event, context);
	alexa.APP_ID = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute();
};
