const db = require('./db/connection');
const express = require('express');

const PORT = process.send.PORT || 3001;
const app = express();

db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`Now listening on port ${PORT}`);
    });
});


