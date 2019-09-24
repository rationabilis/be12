const express = require('express');
const path = require('path');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.listen(PORT);
app.use(express.static(path.join(__dirname, 'public')));
