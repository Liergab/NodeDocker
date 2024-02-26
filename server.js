import express from 'express';
import fs from 'fs';

const app = express();

// Endpoint to fetch mock data
app.get('/mockdata', (req, res) => {
    fs.readFile('MOCK_DATA.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving mock data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.listen(4000, () => {
    console.log(`Server is running at http://localhost:4000`);
});