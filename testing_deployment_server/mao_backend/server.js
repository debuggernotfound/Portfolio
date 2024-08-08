import express from 'express';
import cors from 'cors';
import Game from "./game.js";

const app = express();
app.use(express.json);

const port = 8080;
const whitelist = ['http://localhost:3000'];
const corsOptions ={
    origin:whitelist, 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.get("/", (req, res) => {
    res.send('Hello world!');   
});

// let mainGame; 
// app.get("/initialize-game", (req, res) => {
//     mainGame = new Game();
//     res.json("initialized");
// });
// app.get("/initial-machine-hand", (req, res) =>  {
//     res.json(mainGame.getMachineNumberOfCards());
// });

// app.get("/test", (req, res) => {
//     const {message} = req.body;
//     let response; 
//     //start it up
//     if(message==="play"){
//         mainGame = new Game();
//         response = new Array();
//         response.push(mainGame.getTopCard());
//         response.push(mainGame.getPlayerCards());
//         response.push(mainGame.getMachineNumberOfCards());
//         response.push(mainGame.getWhosPlaying());
//     }
//     else if(message.length >= 4 && message.substring(0, 4)==="card"){
//         let cardPlayed = message.substring(5, message.length);
//     }
//     res.json({response});
// });

app.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`)
});