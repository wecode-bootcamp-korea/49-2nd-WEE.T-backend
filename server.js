require("dotenv").config();

const { createApp } = require("./app");
const { AppDataSource, client } = require("./src/models/dataSource");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.SERVER_PORT;

  await AppDataSource.initialize();

  await client.connect();

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
