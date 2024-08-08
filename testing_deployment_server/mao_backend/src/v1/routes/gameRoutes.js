import express from "express";
import * as gameControllerFunctions from "../../controllers/gameController.js";
const router = express.Router();

router.get("/", gameControllerFunctions.createNewGame);

router.get("/initial-player-hand", gameControllerFunctions.getInitialPlayerHand);

router.get("/initial-machine-hand-number", gameControllerFunctions.getInitialMachineHandNumber);

router.post("/update-player-hand", (req, res) => {
    gameControllerFunctions.updatePlayerHand(req, res);
});

router.get("/get-machine-move", gameControllerFunctions.getMachineMove);

router.get("/draw-card-from-deck", gameControllerFunctions.drawCardFromDeck);

router.get("/get-top-card", gameControllerFunctions.getTopCard);

export default router;