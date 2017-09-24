// Local development script which just logs out the result.

const getNextRace = require('./getNextRace');

getNextRace()
	.then(console.log.bind(console))
	.catch(console.error.bind(console));
