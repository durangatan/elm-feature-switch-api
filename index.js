import fetch from 'isomorphic-fetch';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

const CACHED_FEATURES = [];

app.listen(8888);

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(bodyParser.json());

app.get('/features', (req, res) =>
	fetch('https://www.kinja.com/ajax/features').then(features =>
		features.json().then(parsedFeatures => {
			const formattedFeatures = parsedFeatures.data.map(feature => {
				const { name, description, isOn } = feature;
				return { name, description, isOn };
			});
			res.send([...formattedFeatures, ...CACHED_FEATURES]);
		})
	)
);

app.post('/features', (req, res) => {
	CACHED_FEATURES.push(req.body);
	console.log("thanks for the new feature switch!",req.body);
	res.send(req.body);
});
