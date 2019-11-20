const express = require("express");
const redis = require("redis");

const process = require("process");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379
});
client.set("visits", 0);

app.get("/", (req, res, next) => {
  // For practice:
  process.exit(0);
  try {
    client.get("visits", (err, visits) => {
      res.send(`Number of visits: ${visits}`);
      client.set("visits", parseInt(visits) + 1);
    });
  } catch (error) {
    next(error);
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Living it up on port ${PORT}`);
});
