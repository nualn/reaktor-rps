import express from 'express';
import playerRouter from './routes/players';

const app = express();

app.use(express.static(`${__dirname}/../../../packages/client/build`));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/players', playerRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});