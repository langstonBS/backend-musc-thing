const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/Users', require('./routes/userRouts'));
app.use('/api/v1/songs', require('./routes/songsRouts'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
