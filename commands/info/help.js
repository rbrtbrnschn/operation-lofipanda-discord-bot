const { getMember, formatDate } = require("../../functions");
const { readdirSync } = require("fs");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  name: "help",
  aliases: ["welp"],
  category: "info",
  description: "Returns helpful commands, etc.",
  run: async (client, msg, args) => {
    const member = getMember(msg, args.join(" "));
    let desc = ``;
    let commands = [];
    let embed = new RichEmbed();
    let collection = client.commands.array();
    readdirSync("./commands/").forEach(dir => {
      const _commands = readdirSync(`./commands/${dir}/`).filter(f =>
        f.endsWith(".js")
      );
      _commands.forEach(c => {
        commands.push(c.split(".").shift());
      });
    });
    const descriptions = [];
    collection.forEach(item => {
      if (item !== undefined) {
        descriptions.push(item.description);
      }
    });
    commands.forEach((c, i) => {
      desc += `**> _${c}:** ${descriptions[i]}
      `;
    });

    embed
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )
      .setFooter(member.displayName, member.user.displayAvatarURL)
      .setTimestamp()
      .addField(
        "Prefix",
        stripIndents`**> Prefix: "_"** 
      `
      )
      .addField("Commands", stripIndents(desc), true);
    msg.channel.send(embed);
  }
};
