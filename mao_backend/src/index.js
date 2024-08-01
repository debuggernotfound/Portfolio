import express from 'express';
import v1GameRouter from "./v1/routes/gameRoutes.js";
import cors from 'cors';
import bodyParser from "body-parser";
const corsOptions={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200
}
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
const port = process.env.port || 3001;

// app.get("/", (req, res) => {
//     res.send("<h2>It's Working!</h2>");
// }); 
app.use("/api/v1/game", v1GameRouter);
app.listen(port, () => {
    console.log(`API is listening on port ${port}`);
});