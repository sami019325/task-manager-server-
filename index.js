const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


app.use(cors())
app.get('/', (request, response) => {
    response.send('Hello, world')
});

app.listen(port, () => {
    console.log('listening on port ' + port);
});
