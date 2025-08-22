const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Get all data
app.get('/getData', (req, res) => {
    const sql = 'SELECT * FROM mydata';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send('Server error');
        res.json(results);
    });
});

// ✅ Create
app.post('/add', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO mydata (name) VALUES (?)';
    db.query(sql, [name], (err) => {
        if (err) return res.status(500).send('Insert error');
        res.redirect('/');
    });
});

// ✅ Update
app.post('/update/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE mydata SET name=? WHERE id=?';
    db.query(sql, [name, id], (err) => {
        if (err) return res.status(500).send('Update error');
        res.redirect('/');
    });
});

// ✅ Delete
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM mydata WHERE id=? && id--';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send('Delete error');
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
