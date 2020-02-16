const { getMember, formatDate } = require("../../functions");
const { readdirSync } = require("fs");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
  name: "exclusive",
  aliases: ["exclusives"],
  category: "general",
  description: "Exclusive commands for exclusive people.",
  run: async (client, msg, args) => {
    let commands = [],
      _collection = [],
      dirs = [];
    let collection = client.commands.array();

    readdirSync("./exclusives/").forEach(dir => {
      const _commands = readdirSync(`./exclusives/${dir}/`).filter(f =>
        f.endsWith(".js")
      );
      dirs.push(dir);
      _commands.forEach(c => {
        commands.push(c.split(".").shift());
      });
    });

    collection.forEach((item, i) => {
      if (item.name === "exclusive") {
        commands.splice(i, 1);
        return;
      }
      if (commands.includes(item.name)) {
        _collection.push(item);
      }
    });

    const member = getMember(msg, args.join(" "));
    let embed = new RichEmbed()
      .setTimestamp()
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )
      .setFooter(member.displayName, member.user.displayAvatarURL)
      .addField("Prefix", stripIndents`**> Prefix: "_"**`);
    let desc = ``;
    dirs.forEach((dir, dirIndex) => {
      desc += `
      ${dir[0].toUpperCase() + dir.slice(1, dir.length)}\n
      `;
      let Arr = [];
      _collection.forEach((item, itemIndex) => {
        if (item.category === dir) {
          desc += `**> _${item.name}:** ${item.description}
                `;
        } else {
        }
      });
      embed.addField("**Commands**", stripIndents(desc), true);
    });
    msg.reply(embed);
  }
};
