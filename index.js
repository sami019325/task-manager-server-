const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

app.use(cors())
app.get('/', (request, response) => {
    response.send('Hello, world')
});

//  


const uri = "mongodb+srv://taskbox:UoIl3AbkuvJYI9PN@cluster0.mmeqena.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const database = client.db("taskBox");
        const lists = database.collection("lists");
        // app.post('/', async (req, res) => {

        // })
        app.post('/insert', async (req, res) => {
            const dataCollection = req.body
            console.log(dataCollection)
            const result = await lists.insertOne(dataCollection)
            res.send(result)

        })
        app.get('/lists/:email', async (req, res) => {
            // const query = { email: 'raswakaraziam@gmail' };
            // console.log(query)
            // const tasks = await lists.find(query);
            // console.log(tasks)
            // res.send(tasks);
            const emailAdress = req.params.email
            const quary = { "email": emailAdress }
            const cursor = lists.find(quary)
            const user = await cursor.toArray()
            res.send(user)
        })
    } finally {

    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log('listening on port ' + port);
});
