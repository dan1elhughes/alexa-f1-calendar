const getNextRace = require('./getNextRace');

getNextRace()
	.then(console.log.bind(console))
	.catch(console.error.bind(console));
