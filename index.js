import fetch from 'isomorphic-fetch';
import express from 'express';

const app = express();

app.listen(8888);

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.get('/features', (req, res) =>
	fetch('https://www.kinja.com/ajax/features').then(features =>
		features.json().then(parsedFeatures => {
			const formattedFeatures = parsedFeatures.data.map(feature => {
				const { name, description, isOn } = feature;
				return { name, description, isOn };
			});
			res.send(formattedFeatures);
		})
	)
);
