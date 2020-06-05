const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const router = require('./router/router');
const { join } = require('path');

const port = process.env.PORT || 3000;

app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'view'));

app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

app.listen(port, () => console.log(`APP funcionado en http://localhost:${port}`));

require('./model/firestoreChart');
