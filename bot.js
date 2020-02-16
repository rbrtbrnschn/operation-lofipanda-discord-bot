const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const client = new Client();

config({ path: __dirname + "/.env" });

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});
["exclusive"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    game: {
      name: "Operation Lofi-Panda Develop.",
      type: "WATCHING"
    }
  });
});

client.on("message", async msg => {
  const prefix = "_";

  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  if (!msg.member) msg.member = await msg.guild.fetchMember(msg);

  // Paramaters
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  let command = client.commands.get(cmd);

  // Alias Recognition
  if (client.commands.has(cmd)) {
    command = client.commands.get(cmd);
  } else {
    command = client.commands.get(client.aliases.get(cmd));
  }

  command.run(client, msg, args);
});

client.login(process.env.TOKEN);
