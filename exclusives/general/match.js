const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
  name: "match",
  aliases: ["matches"],
  category: "general",
  description: "Exclusive commands for exclusive people.",
  run: async (client, msg, args) => {
    msg.reply("tf");
    // TODO: WIP / api endpoint, where you can search db for player,matches,user
  }
};
