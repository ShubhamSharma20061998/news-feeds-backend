const express = require("express");
const cors = require("cors");

// routes
const configureDB = require("./config/configureDB");

const app = express();
const port = process.env.PORT || 3030;

const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const feedRouter = require("./routes/feedRoutes");

//DB connection
configureDB();

app.use(express.json());
app.use(cors());

// app.use("/", userRouter);
app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/feeds", feedRouter);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
