# mailgun-events-slack
Simple nodejs app that polls for Events (Logs) from [Mailgun API](https://documentation.mailgun.com/en/latest/api-events.html#events) and sends them as messages to Slack channel using the [Incoming Webhooks API](https://api.slack.com/incoming-webhooks)

## Running
Define following `NODE_ENV` parameters and run app by calling `yarn run`.
* **MAILGUN_DOMAIN** Mailgun domain name to use for polling for events
* **MAILGUN_API_KEY** Mailgun private API key
* **SLACK_WEBHOOK_URL** Webhook url created for your slack domain and channel, see [Documentation](https://api.slack.com/incoming-webhooks)

## Config
Allows you to configure Mailgun query options and customize slack message colors. Change the values from `config.json`: 

* **`filter`** Query to pass to Mailgun events request. `begin` and `end` values will be ignored and created at rutime. See [Mailgun API reference](https://documentation.mailgun.com/en/latest/api-events.html#filter-field)
* **`colors`** Color to use for slack attachments based on [Mailgun Event Type](https://documentation.mailgun.com/en/latest/api-events.html#event-types)
* **`polling_time`** Value in **seconds** to wait between polling calls. Each call will ask for events between timestamp of last fetched result or `polling_time` ago, and the next one will happen after `polling_time` has passed once the results are processed (sent to Slack).

## Dependencies
* [DayJS](https://github.com/iamkun/dayjs)
* [mailgun-js](https://github.com/bojand/mailgun-js)
* [@slack/webhook](https://github.com/slackapi/node-slack-sdk)