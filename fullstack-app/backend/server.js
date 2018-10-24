const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
const router = express.Router();

const dbRoute = "mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest";

mongoose.connect(
	dbRoute,
	{ useNewUrlParser: true }
);

let db = mongoose.connection;

db.once('open', () => console.log('Connected to DB'));
db.on('error', console.eorror.bind(console, 'MongoDB connection error:'));

router.get('/getData', (req, res) => {
	Data.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

router.post("/putData", (req, res) => {
	let data = new Data();
	const { id, message } = req.body;
	if ((!id && id !== 0) || !message) {
		return res.json({
			success: false,
			error: "INVALID INPUTS"
	  });
	}
	data.message = message;
	data.id = id;
	data.save(err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.post('/updateData', (req, res) => {
	const { id, update } = req.body;
	Data.findOneAndUpdate(id, update, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.delete("/deleteData", (req, res) => {
	const { id } = req.body;
	Data.findOneAndDelete(id, err => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));