const { faker } = require("@faker-js/faker");
faker.locale = "id_ID";

exports.getEducation = () => {
  const school1 = faker.company.name();
  const school2 = faker.company.name();
  const date = Math.floor(Math.random() * (2022 - 2014 + 1)) + 2014;
  return [
    `${school1} : ${date} ~ ${date + 3}`,
    `${school2} : ${date + 3} ~ ${date + 6}`,
  ];
};

exports.getRandomNumber = (digit) => Math.random().toFixed(digit).split(".")[1];

exports.getRandRangeNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
