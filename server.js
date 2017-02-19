const config = require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const basicAuth = require('basic-auth-connect');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const apiRouter = express.Router();

// models
const Senriu = require('./models/senriu');
const Theme = require('./models/theme');

mongoose.connect('mongodb://0.0.0.0:27017/tateyoko');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	mongoose.Promise = global.Promise;
  console.log("Connected to 'tateyoko' database");
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(methodOverride('_method'));

apiRouter.route('/senriu')
	.post((req, res)=>{
		let senriu = new Senriu();


		senriu.author = req.body.author;
		senriu.col1 = req.body.col1;
		senriu.col2 = req.body.col2;
		senriu.col3 = req.body.col3;
		senriu.update = new Date();
		senriu.themeId = req.body.themeId;

		senriu.save((err)=>{
			if (err) {
				res.send(err);
			}

			res.json({
				urlId: senriu.urlId
			});
		});
	})
	.get((req, res)=>{
		Senriu
			.find()
			.sort('update')
			.exec((err, senriu)=>{
				Theme
					.find()
					.sort('-order')
					.exec((err, themes)=>{
						let themeIds = [];
						themes.forEach((theme)=>{
							themeIds.push(theme._id.toString());
						});

						let result = senriu.sort((a, b)=>{
							if (themeIds.indexOf(a.themeId) < themeIds.indexOf(b.themeId)) return -1;
							if (themeIds.indexOf(a.themeId) > themeIds.indexOf(b.themeId)) return 1;
							return 0;
						});

						res.json(result);
					});
			});
	})
	.delete((req, res)=>{
		let urlIds = (typeof req.body.urlIds === 'string') ? [req.body.urlIds] : req.body.urlIds;

		urlIds.forEach((urlId)=>{
			Senriu.findOneAndRemove({urlId: urlId}, (err)=>{
				if (err) res.send(err);
			});
		});
		res.send('deleted...');
	});

apiRouter.route('/senriu/:urlId')
	.get((req, res)=>{
		Senriu.findOne({urlId: req.params.urlId}, (err, senriu)=>{
			res.json(senriu);
		});
	});

apiRouter.route('/theme')
	.get((req, res)=>{
		Theme
			.find()
			.sort('-order')
			.exec((err, themes)=>{
				if (err) res.send(err);
				res.json(themes);
			});
	})
	.post((req, res)=>{
		let theme = new Theme();

		Theme
			.find()
			.sort('order')
			.exec((err, themes)=>{
				if (err) res.send(err);

				let order = (themes.length !== 0) ? themes[0].order + 1 : 0;

				theme.title = req.body.title;
				theme.order = order;

				theme.save((err)=>{
					res.json({
						message: 'create theme'
					});
				});
			});
	})
	.delete((req, res)=>{
		let ids = (typeof req.body.ids === 'string') ? [req.body.ids] : req.body.ids;

		ids.forEach((_id)=>{
			Theme.findOneAndRemove({_id: _id}, (err)=>{
				if (err) res.send(err);
			});
		});

		res.send('deleted...');
	});

apiRouter.route('/theme/:themeId')
	.get((req, res)=>{
		Theme.findOne({_id: req.params.themeId}, (err, theme)=>{
			res.json(theme);
		});
	});

apiRouter.route('/theme/order')
	.post((req, res)=>{
		req.body.ids.forEach((_id, index)=>{
			Theme.findOne({_id: _id}, (err, theme)=>{
				theme.order = req.body.order[index];
				theme.save((err)=>{
					if (err) res.send(err);
				})
			});
		});

		res.send('edit theme order');
	});

app.use('/api', apiRouter);

app.use('/admin', basicAuth((id, pass)=>{
	return config.basic.id === id && config.basic.pass === pass;
}));

app.use('/admin', (req, res)=>{
	Senriu.find((err, senriu)=>{
		if (err) res.send(err);

		return senriu;
	}).then((senriu)=>{
		Theme.find((err, theme)=>{
			if (err) res.send(err);

			res.render('admin', {
				senriu,
				theme
			});
		});
	});
});

app.use('/', express.static('public'));
app.get('/*', (req, res)=>{
	res.render('index');
});

app.listen(port);
