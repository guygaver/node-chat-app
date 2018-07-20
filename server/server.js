const path = require('path');
const express = require('express');
const parser = require('body-parser');
const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(parser.json());
app.use(express.static(publicPath));
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});