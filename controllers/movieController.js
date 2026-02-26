
// Importo file di connessione al DB
const connection = require('../data/db');

// GET (index)
function index(req, res) {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

// GET (show)
function show(req, res) {
    const { id } = req.params; // Recupero id dai parametri

    const moviesSql = 'SELECT * FROM movies WHERE id = ?';
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // 1. Prima query: cerco il film
    connection.query(moviesSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        const movie = movieResults[0];

        // 2. Seconda query: cerco le recensioni per quel film
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // --- AGGIUNGI I LOG QUI ---
            console.log("ID Film richiesto:", id);
            console.log("Dati ricevuti dal DB per le recensioni:", reviewsResults);
            // ---------------------------

            // Aggiungo l'array delle recensioni all'oggetto film
            movie.reviews = reviewsResults;

            // Invio la risposta finale
            res.json(movie);
        });
    });
}


// POST - aggiungere recensione

function storeReview(req, res) {

    // Recupero id film
    const { id } = req.params;

    // Recupero dati dal body
    const { name, vote, text } = req.body;

    // Query SQL
    const sql = `
        INSERT INTO reviews (movie_id, name, vote, text)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(sql, [id, name, vote, text], (err, result) => {

        if (err) return res.status(500).json({
            error: "Database query failed"
        });

        res.status(201).json({
            message: "Recensione aggiunta con successo"
        });

    });

}

module.exports = {
    index,
    show,
    storeReview
};