import express from "express";
import bodyParser from "body-parser";
import { assignmentsRouter } from "./routes/assignments.js";
import { commentsRouter } from "./routes/comments.js";
import { accountsRouter } from "./routes/accounts.js";

const app = express();
const port = 4000;

app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
  return res.send("Hello Teacher!!");
});

// Use routers
app.use("/assignments", assignmentsRouter);
app.use("/assignments", commentsRouter);
app.use("/accounts", accountsRouter);

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
