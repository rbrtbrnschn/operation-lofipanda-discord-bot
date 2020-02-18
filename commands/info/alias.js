const { getMember, formatDate } = require("../../functions");
const { readdirSync } = require("fs");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
  name: "alias",
  aliases: ["alais"],
  category: "general",
  description: "Find out all aliases of a command.",
  run: async (client, msg, args) => {
    let collection = client.commands.array();

    if (args.length === 0) return msg.reply("You have to be more specific.");
    const query =
      args[0][0] === "_" ? args[0].slice(1, args[0].length) : args[0];
    let alia = [];
    collection.forEach(c => {
      if (c.name === query) {
        alia.push(c.aliases);
      }
    });
    if (alia.length === 0) return msg.reply("That's not a command.");
    msg.reply("Aliases: " + alia);
  }
};
