const express = require('express');
const path = require('path');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const wrongRouter = require('./routes/wrong');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.listen(PORT);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', wrongRouter);


