const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();

let db = new sqlite3.Database("./database.db");

// Middleware function to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is working');
});

// Get all tasks
app.get('/count', (req, res) => {
    const query = `SELECT * FROM PushUp_Tracker`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch tasks' });
        }
        res.status(200).json(rows);
    });
})

// Create task
app.post('/count', (req, res) => {
    let timestamp = new Date().toISOString();
    const { count } = req.body;

    if (!count) {
        return res.status(400).json({ error: 'No count' });
    }

    const query = `INSERT INTO PushUp_Tracker (count, timestamp) VALUES (?, ?)`;

    db.run(query, [count, timestamp], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to insert query' });
        }

        res.status(201).json({ 
            id: this.lastID, 
            message: 'Query inserted successfully' 
        });
    });
})

// Run server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});