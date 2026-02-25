

require('dotenv').config(); // se usi .env
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const movieRouter = require('./routers/movieRouter');
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

app.use(express.static('public'));
app.use(express.json());

app.get('/api', (req, res) => {
    res.send("<h1>Rotta home App dei film</h1>");
});

app.use('/api/movies', movieRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});