const TwitchBot = require('twitch-bot');
const creds = require('./creds');

const Twitch = new TwitchBot({
  username: creds.username,
  oauth: creds.oauth,
  channels: ['WhiffCityUSA']
});

const commands = [
    {
        pattern: /banned/,
        response: '———————————————————————— imGlitch {sender} has been banned. ————————————————————————',
        cooldown: 60
    }
];

Twitch.on('message', msg => {
    if (msg.username.toLowerCase() === 'whiffbot') {
        return;
    }

    for (let i = 0; i < commands.length; i++) {
        const matches = commands[i].pattern.test(msg.message);
        const ready = (commands[i].ready === undefined) || commands[i].ready;

        if (matches && ready) {
            let response = commands[i].response
                .replace('{sender}', msg.display_name);

            Twitch.say(response);

            commands[i].ready = false;
            setTimeout(() => {
                commands[i].ready = true;
            }, commands[i].cooldown * 1000);

            break;
        }
    }
});
