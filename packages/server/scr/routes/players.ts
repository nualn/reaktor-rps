import express from 'express';
import playerService from '../services/playerService';

const router = express.Router();

router.get('/', (_req, res) => {
  void playerService.getAllPlayers().then(players => {
    res.json(players);
  });
});

router.get('/:name', (req, res) => {
  void playerService
    .getAllPlayerGames(req.params.name)
    .then(playerGames => {
      res.json(playerGames);
    });
});

export default router;