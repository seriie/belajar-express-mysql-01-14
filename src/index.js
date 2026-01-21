import express from "express";
import dotenv from "dotenv";
import myLogs from "./utils/myLogs.js";

dotenv.config();

import userRoute from './routes/user.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "sup" });
});

if (process.env.ENVIRONTMENT !== "production") {
    app.listen(port, () => {
      myLogs("📶", `Server running on http://localhost:${port}`);
    });
}
