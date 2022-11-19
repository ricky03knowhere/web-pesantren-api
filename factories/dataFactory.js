const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const { getEducation, getRandomNumber } = require("../utils/getRandomDataVal");

faker.locale = "id_ID";

const pengajar = [
  {
    insertOne: {
      document: {
        email: faker.internet.email(),
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
        phone: faker.phone.number(),
        picture: "uag2.jpeg",
        name: "kyai. Asep Abdul Ghofur",
        position: "Pimpinan Umum",
        birthDate: faker.date.birthdate(),
        profession: "Guru",
        address: "Kp. Pasir Kulit Ds Cibiuk Kaler",
        education: getEducation(),
        socials: ["#", "#", "#"],
      },
    },
  },
  {
    insertOne: {
      document: {
        email: faker.internet.email(),
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
        phone: faker.phone.number(),
        picture: "abrem.jpg",
        name: "Ust. Zam zam Multajam, S.E",
        position: "Dewan Guru",
        birthDate: faker.date.birthdate(),
        profession: "Guru",
        address: "Kp. Koromoy",
        education: getEducation(),
        socials: ["#", "#", "#"],
      },
    },
  },
  {
    insertOne: {
      document: {
        email: faker.internet.email(),
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
        phone: faker.phone.number(),
        picture: "eep.jpg",
        name: "Ust. Eep Saepulloh",
        position: "Rois 'Am",
        birthDate: faker.date.birthdate(),
        profession: "Guru",
        address: "Kp. Cinanti",
        education: getEducation(),
        socials: ["#", "#", "#"],
      },
    },
  },
  {
    insertOne: {
      document: {
        email: faker.internet.email(),
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
        phone: faker.phone.number(),
        picture: "vina.jpeg",
        name: "Ust. Vina Alfia",
        position: "Bendahara",
        birthDate: faker.date.birthdate(),
        profession: "Guru",
        education: getEducation(),
        address: "Kp. Cikalong Rt 03 Rw 09 Ds Cibiuk Kaler",
        socials: ["#", "#", "#"],
      },
    },
  },
  {
    insertOne: {
      document: {
        email: faker.internet.email(),
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
        phone: faker.phone.number(),
        picture: "ustad.jpg",
        name: "Ust. M Rifki Almunawar",
        position: "Sekretaris",
        birthDate: faker.date.birthdate(),
        profession: "Mahashiswa",
        education: getEducation(),
        address: "Kp. Cikalong Rt 03 Rw 09 Ds Cibiuk Kaler",
        socials: ["#", "#", "#"],
      },
    },
  },
];
exports.userFactory = () => {
  const data = [...Array(115)].map((data) => ({
    insertOne: {
      document: {
        // posCodeId: getRandomNumber(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
        phone: faker.phone.number(),
        name: faker.name.fullName(),
        picture: faker.internet.avatar(),
        position: "santri",
        birthDate: faker.date.birthdate({
          min: 2002,
          max: 2007,
          mode: "year",
        }),
        profession: "siswa",
        address: faker.address.streetAddress(true),
        education: getEducation(),
        socials: ["#", "#", "#"],
      },
    },
  }));
  return [...pengajar, ...data];
};

exports.postCodeFactory = (size) =>
  [...Array(size)].map((data) => ({
    insertOne: {
      document: {
        pos_kode_id: faker.address.zipCode(),
        provinsi: faker.address.state(),
        kota: faker.address.cityName(),
        kecamatan: faker.address.cityName(),
        desa: faker.address.street(),
      },
    },
  }));
