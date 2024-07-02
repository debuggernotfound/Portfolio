const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors);
app.use(express.json);

const port = 3001;

server.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`)
});