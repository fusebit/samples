module.exports = async (slack, ctx) => {
    // Send "Hello world" to the #{ctx.slack_channel_name} channel on Slack

    // If user access token was requested in addition to bot access token, you can
    // replace `slack.bot` with `slack.user` below to act on behalf of the user. If no
    // user access token is present, `slack.user` will be undefined.

    const conversations = await slack.bot.conversations.list();
    const channel = conversations.channels.filter(c => c.name === ctx.slack_channel_name);
    if (channel && channel.length > 0) {
        const result = await slack.bot.chat.postMessage({
            text: `Hello world at ${new Date()}`,
            channel: channel[0].id,
        });
        
        const message = `Successfully sent message ${result.ts} in conversation ${channel[0].name}`;
        console.log(message);
        return {body: message};

    }  
}