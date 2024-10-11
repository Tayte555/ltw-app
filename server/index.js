import express from 'express';
import db from './db.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        res.status(500).send('Database query error');
      } else {
        res.json(results);
      }
    });
  });

app.listen(5555, ()=>{
    console.log("[LTW] Server connected");
})