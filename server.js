const config = require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const basicAuth = require('basic-auth-connect');

const app = express();
const port = process.env.PORT || 3000;
const apiRouter = express.Router();

const Senriu = require('./models/senriu');

mongoose.connect('mongodb://0.0.0.0:27017/tateyoko');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to 'mydb' database");
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

apiRouter.route('/senriu')
	.post((req, res)=>{
		var senriu = new Senriu();

		senriu.author = req.body.author;
		senriu.col1 = req.body.col1;
		senriu.col2 = req.body.col2;
		senriu.col3 = req.body.col3;
		senriu.update = new Date();

		senriu.save((err)=>{
			if (err) {
				res.send(err);
			}

			res.json({
				message: 'created senriu'
			});
		});
	})
	.get((req, res)=>{
		Senriu.find((err, senriu)=>{
			if (err) res.send(err);

			res.json(senriu)
		});
	});

apiRouter.route('/senriu/:urlId')
	.get((req, res)=>{
		Senriu.findOne({urlId: req.params.urlId}, (err, senriu)=>{
			res.json(senriu);
		});
	});

app.use('/api', apiRouter);

app.use('/admin', basicAuth((id, pass)=>{
	return config.basic.id === id && config.basic.pass === pass;
}));

app.use('/admin', (req, res)=>{
});


app.use('/', express.static('public'));

app.listen(port);
