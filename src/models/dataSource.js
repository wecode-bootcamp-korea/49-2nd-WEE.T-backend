const { DataSource } = require("typeorm");
const { createClient } = require("redis");

const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  bigNumberStrings: false,
  supportBigNumbers: true,
  logging: true,
});

const client = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DATABASE}`,
});

client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = {
  AppDataSource,
  client,
};
