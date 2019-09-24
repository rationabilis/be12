const express = require('express');

const { PORT = 3000, BASE_PATH } = process.env;


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
