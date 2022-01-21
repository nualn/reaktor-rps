import express from 'express';
import playerRouter from './routes/players';
import * as cache from './cache/cache';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/players', playerRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process
  .on('SIGTERM', () => {
    console.log('SIGTERM');
    cache.save();
    console.log('Cache saved');
    process.exit();
  });

