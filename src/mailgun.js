const { MAILGUN_DOMAIN, MAILGUN_API_KEY } = process.env;
const CONFIG = require('../config.json');

const mailgun = require('mailgun-js')({ 
	apiKey: MAILGUN_API_KEY,
	domain: MAILGUN_DOMAIN
});

const fetchEventsPage = (url, query) => {

	if(!url) return Promise.reject(new Error(`Invalid url value: ${url}`));
	
	console.log(`Fetching events for url ${url}`);
	return new Promise((resolve, reject) => {

		mailgun.get(`/${MAILGUN_DOMAIN}/${url}`, query, (error, body) => {
			if(error) {
				return reject(error);
			} else {
				return resolve(body);
			}
		})
	});

};

const fetchEvents = (startDate, endDate) => {
	
	let results = [];
	
	const { begin, end, ...filter } = CONFIG.filter;

	const query = {
		limit: 300,
		begin: startDate,
		end: endDate,
		...filter
	};

	const processResponse = body => {
		results = [...results, ...body.items];

		if(body.items.length > 0) {

			const next = /events\/(.*)/.exec(body.paging.next);
			return fetchEventsPage(next, {
				limit: 300
			}).then(processResponse)

		} else {
			return Promise.resolve(results);
		}
	}

	return fetchEventsPage('events', query).then(processResponse);

};

module.exports = {
	fetchEvents
};
