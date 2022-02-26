const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contact.json", "utf-8");
  const contact = JSON.parse(file);
  return contact;
};

const simpanData = (name, email, noHP) => {
  const data_obj = { name, email, noHP };
  const contact = loadContact();
  const duplikat = contact.find((data_obj) => data_obj.name == name);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Contact sudah tersimpan gunakan nama lain!")
    );
    return false;
  }
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor HP tidak valid!"));
    return false;
  }
  contact.push(data_obj);
  const data_string = JSON.stringify(contact);
  fs.writeFileSync("data/contact.json", data_string);
  console.log(chalk.green.inverse.bold("Data berhasil disimpan"));
};

const listContact = () => {
  const contact = loadContact();
  console.log(chalk.blue.inverse.bold("Daftar kontak:"));
  contact.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.noHP}`);
  });
};

const detailContact = (name) => {
  const contact = loadContact();
  const detailContact = contact.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  if (!detailContact) {
    console.log(chalk.red.inverse.bold(`Data ${name} tidak ditemukan`));
    return false;
  }
  console.log(chalk.green.inverse.bold("Detail data : "));
  console.log(detailContact.name);
  console.log(detailContact.noHP);
  detailContact.email !== undefined && console.log(detailContact.email);
};

const deleteContact = (name) => {
  const contact = loadContact();
  const newContact = contact.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );
  if (contact.length === newContact.length) {
    console.log(chalk.red.inverse.bold("Data ${name} tidak ditemukan"));
    return false;
  }
  const data_string = JSON.stringify(newContact);
  fs.writeFileSync("data/contact.json", data_string);
  console.log(chalk.green.inverse.bold("Data berhasil disimpan"));
};

module.exports = { simpanData, listContact, detailContact, deleteContact };

// contoh menyimpan data dengan promise
// const pertanyaan = (data) => {
//   return new Promise((resolve, rejects) => {
//     rl.question(data, (string) => {
//       resolve(string);
//     });
//   });
// };
