const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect all routes
app.use('/', require('./routes/index'));
app.use('/api/post', require('./routes/post'));
app.use('/api/user', require('./routes/user'));
app.use('/api/comment', require('./routes/comment'));

app.listen(5000, () => {
    console.log(`Server running at http://localhost:5000`);
});