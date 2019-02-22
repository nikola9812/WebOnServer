var express = require('express');
var app = express();
var fs = require('fs');


// MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WebProject');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error : '));
db.once('open',function(){
})
var imgSchema = new mongoose.Schema({
	id : String,
	src : String,
	cnt : Number
});

const Img = mongoose.model('Img',imgSchema);


app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

app.use(express.static('../'));

app.get('/changeJson', function (req, res) {
	var winnerId = req.query.winnerID;
	var subject = req.query.subject;
	const fs = require('fs');
	const rtPath = '../data/';
	var json = fs.readFileSync(rtPath + subject + '.json', 'utf-8');
	Json = JSON.parse(json);
	//console.log(Json);
	res.send('recieve data');
	for (var i = 0; i < 8; i++) {
		if (Json[i].src == winnerId) {
			Json[i].cnt++;
		}
	}
	var newJson = JSON.stringify(Json);
	fs.unlinkSync(rtPath + subject + '.json');
	fs.writeFileSync(rtPath + subject + '.json', newJson);
/*	
	var add = Img.findOne({'src' : winnerId},function(err,fix){
		if(err){
			console.log(err);
		}
		fix.cnt = fix.cnt + 1;
		fix.save(function(err){
			if(err){
				console.log(err);
			}
		});
	});
*/	
});

/*


dog1 = new Img({
	'id':'1','src':'assets/img/dog1.jpg','cnt':0
});
dog2 = new Img({
	'id':'2','src':'assets/img/dog2.jpg','cnt':0
});
dog3 = new Img({
	'id':'3','src':'assets/img/dog3.jpg','cnt':0
});
dog4 = new Img({
	'id':'4','src':'assets/img/dog4.jpg','cnt':0
});
dog5 = new Img({
	'id':'5','src':'assets/img/dog5.jpg','cnt':0
});
dog6 = new Img({
	'id':'6','src':'assets/img/dog6.jpg','cnt':0
});
dog7 = new Img({
	'id':'7','src':'assets/img/dog7.jpg','cnt':0
});
dog8 = new Img({
	'id':'8','src':'assets/img/dog8.jpg','cnt':0
});

dog1.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
dog2.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
dog3.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
dog4.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
dog5.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
dog6.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
dog7.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});
dog8.save(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});

*/
/*
Img.remove(function (err) {
	if (err) return console.error(err);
	console.log('save success');
});

*/
