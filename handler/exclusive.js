const { readdirSync } = require("fs");
const ascii = require("ascii-table");

module.exports = client => {
  console.log("Exclusive Commands:");
  readdirSync("./exclusives/").forEach(dir => {
    const table = new ascii().setHeading(dir, "Status");
    const commands = readdirSync(`./exclusives/${dir}/`).filter(f =>
      f.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../exclusives/${dir}/${file}`);

      if (pull.name) {
        client.commands.set(pull.name, pull);
        table.addRow(file, "✔");
      } else {
        table.addRow(file, "❌");
        continue;
      }

      if (pull.aliases && Array.isArray(pull.aliases)) {
        pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
      }
    }
    console.log(table.toString());
  });
};
