import express from 'express';
import { drivers } from './data.js';
import { randomUUID } from 'node:crypto';

const app = express();
app.use(express.json());

const basePath = '/api/v1';

app.get('/', (req, res) => {
	res.send('Bem vindo a minha API');
});

app.get(basePath + '/drivers', (req, res) => {
	res.status(200).send(drivers);
});

app.get(basePath + '/drivers/standings/:position', (req, res) => {
	const { position } = req.params;
	const selectedDriver = drivers[position - 1];
	res.status(200).send(selectedDriver);
});

app.get(basePath + '/drivers/:id', (req, res) => {
	const { id } = req.params;

	const selectedDriver = drivers.find((driver) => {
		return driver.id === id;
	});

	res.status(200).send(selectedDriver);
});

app.post(basePath + '/drivers', (req, res) => {
	const newDriver = { ...req.body, id: randomUUID() };
	drivers.push(newDriver);
	drivers.sort((a, b) => {
		if (a.points > b.points) {
			return -1;
		}
	
		if (b.points > a.points) {
			return 1;
		}
	
		return 0;
	});
	res.status(200).send(newDriver);
});
const PORT = 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
