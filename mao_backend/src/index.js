import express from "express";
import v1GameRouter from "./v1/routes/gameRoutes.js";

const app = express();
const port = process.env.port || 3001;

// app.get("/", (req, res) => {
//     res.send("<h2>It's Working!</h2>");
// });

app.use("/api/v1/game", v1GameRouter);

app.listen(port, () => {
    console.log(`API is listening on port ${port}`);
});