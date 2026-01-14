import express from "express";
import dotenv from "dotenv";
import myLogs from "./utils/myLogs.js";

dotenv.config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "NIGGA" });
});

if (process.env.ENVIRONTMENT !== "production") {
    app.listen(port, () => {
      myLogs("📶", `Server running on http://localhost:${port}`);
    });
}
