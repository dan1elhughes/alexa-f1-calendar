const request = require('request-promise');
const moment = require('moment');

const now = moment();

const map = fn => arr => arr.map(fn);
const pipe = fns => init => fns.reduce((p, f) => p.then(f), Promise.resolve(init));

const extractRaceTable = body => body.MRData.RaceTable.Races;

const addDateObject = race => {
	race.dateStr = race.date;
	race.date = moment(`${race.date} ${race.time}`);
	return race;
};

const filterPastRaces = races => races.filter(race => race.date.isAfter(now));

const head = arr => arr[0];

const format = _ => `${_.raceName} at ${_.Circuit.circuitName} ${_.date.fromNow()}`;

const transform = pipe([
	extractRaceTable,
	map(addDateObject),
	filterPastRaces,
	head,
	format,
]);

const uri = 'http://ergast.com/api/f1/current.json';
const json = true;

module.exports = () => request({ uri, json, transform });
