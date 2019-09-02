const dayjs = require('dayjs'),
	{ sendMessage } = require('./src/slack'),
	{ fetchEvents } = require('./src/mailgun'),
	CONFIG = require('./config.json');

let endDate = dayjs().subtract(5, 'minute').unix();;

const fetch = () => {

	const startDate = dayjs().unix();
	
	fetchEvents(startDate, endDate)
	.then(results => {

		console.log(`Got ${results.length} results`);

		endDate = results.length > 0 ? results[0].timestamp : startDate;

		return results.reduce(
			(previous, current) => previous.then(sendMessage(current)),
			Promise.resolve()
		);

	})
	.then(() => setTimeout(fetch, CONFIG.polling_time * 1000))
	.catch(error => {
		console.error(error);
		setTimeout(fetch, CONFIG.polling_time * 1000)
	});	
};

fetch();

