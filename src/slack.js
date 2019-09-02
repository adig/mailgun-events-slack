const { SLACK_WEBHOOK_URL } = process.env;

const CONFIG = require('../config.json');

const { IncomingWebhook } = require('@slack/webhook');
const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

const COLORS = CONFIG.colors;

const sendMessage = body => {

	const date = `<!date^${Math.round(body.timestamp)}^{date} {time_secs}|ts:${body.timestamp}>`;
	const subject = body.message && body.message.headers && body.message.headers.subject || '';
	const attachment = {
		color: COLORS[body.event] || COLORS.default,
		pretext: `*${date}* ${body.recipient} -> *${body.event.toUpperCase()}* ${subject}`,
		text: `\`\`\`${JSON.stringify(body, null, 4)}\`\`\``,
		mrkdwn_in: ['text', 'pretext']
	};

	return () => {
		webhook.send({
			attachments: [attachment]
		});
	};
};

module.exports = {
	sendMessage
};