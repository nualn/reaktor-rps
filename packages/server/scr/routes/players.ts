import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('fetching all players');
});

router.get('/:name', (req, res) => {
  res.send(`Fetcing info for player with name ${req.params.name}`);
});

export default router;