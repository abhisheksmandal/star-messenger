const express = require("express");
const helmet = require("helmet");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const session = require("express-session");
// const Redis = require("ioredis");
// const RedisStore = require("connect-redis")(session);
const server = require("http").createServer(app);
require("dotenv").config();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});
// const redisClient = new Redis();
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    // store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);
app.use("/auth", authRouter);

// app.get("/", (req, res) => {
//   res.json("hi");
// });

io.on("connect", () => {});

server.listen(4000, () => {
  console.log("Server is running");
});
