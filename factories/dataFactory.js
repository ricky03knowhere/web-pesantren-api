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
        name: "Kyai. Asep Abdul Ghofur",
        position: "Pimpinan Umum",
        birthDate: faker.date.birthdate(),
        profession: "Guru",
        address: "Kp. Pasir Kulit Ds. Cibiuk Kaler",
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
        name: "Ustzh. Vina Alfia",
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

const kegiatan = [
  [["03:30 ~ 04:00", "Bangun malam"], "harian"],
  [["04:00 ~ 04:30", "Persiapan Sholat Subuh"], "harian"],
  [["04:30 ~ 05:00", "Solat subuh"], "harian"],
  [["05:00 ~ 06:00", "KBM Pesantren Perkelas"], "harian"],
  [["06:00 ~ 06:30", "Persiapan Sekolah"], "harian"],
  [["07:15 ~ 13:15", "Belajar Sekolah"], "harian"],
  [["13:30 ~ 15:00", " Istirahat "], "harian"],
  [["15:00 ~ 15:30", "Solat Ashar"], "harian"],
  [["16:00 ~ 17:00", "KM Pesantren Perkelas"], "harian"],
  [["17:00 ~ 17:30", "Istirahat"], "harian"],
  [["17:30 ~ 18:00", "Tadarus Al Qur'an"], "harian"],
  [["18:00 ~ 18:15", "Shalat Magrib"], "harian"],
  [["18:15 ~ 19:00", "KBM Pesantren Perkelas"], "harian"],
  [["19:00 ~ 19:30", "Solat Isya "], "harian"],
  [["19:30 ~ 19:45", "Istirahat"], "harian"],
  [["19.45 ~ 21:30", "Belajar Pesantren"], "harian"],
  [["21:30 ~ 22:00", "KBM Pesantren Perkelas"], "harian"],
  [[["22:00 ~ 03:30", "Istirahat"], "harian"]],
  [["", "Munadhoroh"], "mingguan"],
  [["", "Olah Raga"], "mingguan"],
  [["", "Maulid Nabi (Hadroh)"], "mingguan"],
  [["", "Kebersihan bersama"], "mingguan"],
  [["", "Riadoh & Manaqib"], "mingguan"],
  [["", "Imtihan Akhirusana"], "tahunan"],
  [["", "PSB (Penerimaan Santri Baru)"], "tahunan"],
  [["", "PHBI (Peringatan Hari Besar Islam) "], "tahunan"],
  [["", "Pengajian Triwulan"], "tahunan"],
  [["", "Muada'ah (Pembagian Raport) "], "tahunan"],
  [["", "Rihlah (Makam Para Wali)"], "tahunan"],
];

exports.kegiatanFactory = kegiatan.map((data) => ({
  insertOne: {
    document: {
      desc: data[0],
      periode: data[1],
    },
  },
}));

const ekstrakulikuler = [
  [
    "SAPALA (Santri Pecinta Alam)",
    "sapala.jpg",
    "Lebih dekat dengan alam, dengan menjelajahi alam bebas dan alam terbuka supaya lebih dekat dengan Allah SWT dengan mentafakuri keindahan dan keselarasan alam ciptaannya nnya",
  ],
  [
    "Hadroh Marawis",
    "hadroh.jpg",
    "Menyelaraskan hati dan emosi dengan lirik dan irama tabuhan rebana, sehingga emosi lebih tenang dan rileks setelah melakuakan aktfitas seharian.",
  ],
  [
    "Futsal",
    "futsal.jpg",
    "Berolahraga supaya badan lebih sehat & bugar sehingga terhindar dari berbagai penyakit, tertutama bermain futsal yang melatih kerjasama dan kekompakan team",
  ],
];

exports.ekstrakulikulerFactory = ekstrakulikuler.map((data) => ({
  insertOne: {
    document: {
      name: data[0],
      picture: data[1],
      desc: data[2],
    },
  },
}));

let kitab = [
  [
    "Kitab Fathul Izar",
    "KH Abdullah Fauzi Pasuruan",
    "Pendidikan Agama & Fiqih",
    "Merupakan kitab pendidikan seks tingkat lanjut atau ditujukan bagi santri tingkat atas. Kitab itu berisikan kajian mengenai pendidikan seks, tata aturan, adab berhubungan, posisi kenikmatan dan larangan.?",
    "izar",
  ],
  [
    "Kitab Fathul Bari",
    "Ibn Hajar Al-Asqalani",
    "Syarah",
    "Kitab yang sangat penting kedudukannya pada kalangan ahlussunnah yang dikarang oleh Al-Hafiz Ibnu Hajar Al-Asqalani.Kitab ini sangat masyhur dan telah dijadikan rujukan oleh kaum Muslimin baik dikalangan santri maupun muslim awam, karena merupakan Kitab Penjelasan (Syarh) dari kitab Shahih Bukhari.",
    "bari.jpg",
  ],
  [
    "Kitab Kuning",
    "Ulama Indonesia",
    "Pendidikan Agama & Fiqih",
    "kitab-kitab tradisional yang berisi pelajaran-pelajaran agama Islam (diraasah al-islamiyyah) yang diajarkan pada pondok-pondok Pesantren, mulai dari fiqh, aqidah, akhlaq, tata bahasa arab (`ilmu nahwu dan `ilmu sharf), hadits, tafsir, ilmu Al-Qur'an, hingga pada ilmu sosial dan kemasyarakatan (mu`amalah). Dikenal juga dengan kitab gundul karena memang tidak memiliki harakat",
    "kuning.jpg",
  ],
  [
    "Kitab Fathul Wahhab",
    "Syaikh Zakaria al-Anshari",
    "Fiqih",
    "Sama dengan kitab-kitab fikih yang lain. Hanya saja, metodologi penulisan yang digunakan Syekh Zakaria al-Anshari dalam kitab Fathul Wahhab cenderung lebih komprehensif. Misalkan pada setiap bab pembahasan, Syekh Zakaria al-Anshari berusaha mengurai maknanya, baik dari aspek bahasa maupun istilah, mencantumkan dalil secara umum, mengurai alur pembahasan secara sistematis, dan memaparkan pendapat ulama Madzhab Syafi’i terkait isu yang beliau bahas.",
    "wahhab.jpg",
  ],
  [
    "Kitab Fathul Muin",
    "Syekh Zainuddin Al Malibari",
    "Syarah",
    "Kitab Kitab Fathul Mu'in merupakan salah satu kitab yang dikarang oleh Ahmad Zainuddin Alfannani, kitab ini membahas tentang fiqih dalam kitab ini cukup lengkap karena mencangkup bab thaharah hingga jinayat atau pidana.",
    "muin.jpg",
  ],
  [
    "Kitab Fathul Qarib",
    "Muhammad bin Qasim",
    "Syarah",
    "Isi dari kitab Fathul Qorib ini terdiri dari muqaddimah dan pembahasan ilmu fiqih yang secara garis besar terdiri atas empat bagian, yaitu tentang cara pelaksanaan ibadah, muamalat, masalah nikah, dan kajian hukum Islam yang berbicara tentang kriminalitas atau jinayat.",
    "qarib.jpg",
  ],
  [
    "Kitab Safinah",
    "Syekh Salim bin Abdullah bin Saad bin Sumair Al hadhrami",
    "Fiqih",
    "Kitab Safinah Al-Najah ialah salah satu kitab yang diajarkan di pesantren yang berisikan tentang ajaran fiqih dalam Islam. Di dalamnya membahas tentang Aqidah (rukun iman dan rukun Islam), Thaharah, Shalat, Jenazah, Zakat dan Puasa.",
    "safinah.jpg",
  ],
  [
    "Kitab Alfiyyah",
    "Ibnu Malik",
    "Bahasa Arab",
    "Membahas dengan detail aturan gramatika Bahasa Arab, membahas tentang kaidah-kaidah Ilmu Nahwu-Sharaf. Mulai dari karakteristik kata benda (isim), kata kerja (fi’il), objek (maf’ul) yang punya banyak variasi, harful jarr (huruf yang mengkasrahkan) beserta faidah-faidahnya, aturan membuat plural (jama'), panggilan (nida'), dan sebagainya.",
    "muin.jpg",
  ],
];

exports.kitabFactory = kitab.map((data) => ({
  insertOne: {
    document: {
      title: data[0],
      author: data[1],
      genre: data[2],
      desc: data[3],
      picture: data[4],
    },
  },
}));

// Biaya
let biaya = [
  ["Administrasi", 200000, "putra"],
  ["Syahriyah", 50000, "putra"],
  ["Kitab", 200000, "putra"],
  ["Jas Almamater", 250000, "putra"],
  ["Uang Kesehatan", 50000, "putra"],
  ["Uang Makan", 400000, "putra"],
  ["Administrasi", 200000, "putri"],
  ["Syahriyah", 50000, "putri"],
  ["Kitab", 200000, "putri"],
  ["Uang Kesehatan", 50000, "putri"],
  ["Uang Makan", 400000, "putri"],
];

exports.biayaFactory = biaya.map((data) => ({
  insertOne: {
    document: {
      desc: data[0],
      price: data[1],
      type: data[2],
    },
  },
}));
