const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        app.post('/insert', async (req, res) => {
            const dataCollection = req.body
            console.log(dataCollection)
            const result = await lists.insertOne(dataCollection)
            res.send(result)

        })



        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await lists.deleteOne(query)
            res.send(result)
        })

        // update and set the value false
        app.get('/lists/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }

            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    "IsActive": false
                },
            };

            const result = await lists.updateOne(query, updateDoc, options)
            res.send(result)
            console.log(query, result)
        })
        // update and set the value true
        app.get('/listsneg/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }

            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    "IsActive": true
                },
            };

            const result = await lists.updateOne(query, updateDoc, options)
            res.send(result)
            console.log(query, result)
        })
        app.get('/lists/:email', async (req, res) => {

            const emailAdress = req.params.email
            const quary = { "email": emailAdress }
            const cursor = lists.find(quary)
            const user = await cursor.toArray()
            res.send(user)
        })
        // app.get('/lists/:id', async (req, res) => {
        //     const id = req.params.id
        //     const filter = { _id: ObjectId(id) };
        //     // const options = { upsert: true };
        //     // create a document that sets the plot of the movie
        //     // const updateDoc = {
        //     //     IsActive: false
        //     // };
        //     const result = await lists.findOne(filter);
        //     res.send(result);
        // })


    } finally {

    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log('listening on port ' + port);
});
