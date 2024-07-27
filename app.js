import express, { json } from 'express';
import drivers from './data.js';

const app = express();
const basePath = '/api/v1';

app.get('/', (req, res) => {
	res.send('Bem vindo a minha API');
});

app.get(basePath + '/drivers', (req, res) => {
  res.status(200).send(drivers);
});

const PORT = 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
