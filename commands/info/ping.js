module.exports = {
  name: "ping",
  aliases: ["pong"],
  category: "info",
  description: "Returns Latency",
  run: async (client, msg, args) => {
    const response = await msg.channel.send("Pinging...");
    response.edit(
      `🏓 Pong!\nLatency is:${Math.floor(
        response.createdAt - msg.createdAt
      )}ms\nApi Latency: ${Math.round(client.ping)}ms`
    );
  }
};
