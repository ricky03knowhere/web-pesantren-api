const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    database: {
      url: "mongodb://localhost:27017/pesantren",
      dbName: process.env.DATABASE_NAME,
      protocol: process.env.PROTOCOL,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: process.env.POST,
      options: {
        useNewUrlParser: true,
      },
    },
  },
  test: {
    database: {
      url: "mongodb+srv://admin:LDehGKj53YkE1uLa@cluster0.bedfo.mongodb.net/pesantren?retryWrites=true&w=majority",
      options: {
        useNewUrlParser: true,
      },
    },
  },
  production: {
    database: {
      protocol: "mongodb",
      username: "root",
      password: "password",
      name: "database_production",
      host: "localhost",
      port: "",
      options: {
        useNewUrlParser: true,
      },
    },
  },
};
