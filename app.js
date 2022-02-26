const yargs = require("yargs");
const contact = require("./contact");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      name: {
        describe: "Name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "No Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contact.simpanData(argv.name, argv.email, argv.noHP);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no hp contact",
  handler() {
    contact.listContact();
  },
});

yargs.command({
  command: "detail",
  describe: "Melihat detail kontak",
  builder: {
    name: {
      describe: "Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contact.detailContact(argv.name);
  },
});

yargs.command({
  command: "delete",
  describe: "Menghapus kontak",
  builder: {
    name: {
      describe: "Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contact.deleteContact(argv.name);
  },
});

yargs.parse();

// const { pertanyaan, simpanData } = require("./contact");

// const main = async () => {
//   const name = await pertanyaan("Masukkan nama : ");
//   const email = await pertanyaan("Masukkan email : ");
//   const noHP = await pertanyaan("Masukkan noHP : ");

//   simpanData(name, email, noHP);
// };

// main();
