
//Gerekli npm paketleri
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const apiRouter = require('./api-routes');

//.env kullanmak için konfigürasyon
dotenv.config();

//.env içindeki değerlerin çekilmesi
let port = process.env.port;
let dbcon = process.env.cloud_mongodb_con;

//express modülün dahil edilmesi
const app = express();

// gerekli olan middleware 
app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//veriatabnı bağlantısı
mongoose.connect(dbcon);
var con = mongoose.connection;
if (!con) {
    console.log('Maalese\n');
	console.log('Veritabanına bağlanılamadı');
} else {
    console.log('Veritabanına bağlantı başarılı');
}

//middleware ekleme -> routelama
app.use('/api',apiRouter);

app.get('/',(req,res)=>{
    console.log('A');
    res.send('Hello world');
});

// localhost da dinleme
app.listen(port,()=>{
    console.log('9090 portu dinleniyor.');
});
