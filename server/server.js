const path = require('path');
const express = require('express');
const parser = require('body-parser');
const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;

app.use(parser.json());
app.use("/", express.static(publicPath));
app.listen(3001, () => {
    console.log(`App started on port 3000`);
});