const express = require('express')
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const app = express();
const PORT = 3333;

const dbName = 'transformers_db'

//add the json middleware/allow json to be attatched to req.body
app.use(express.json())

async function start() {
    await client.connect();
    console.log('Connected to MongoDB!')

    const db = client.db(dbName)
    const autoCollection = db.collection('autobots')

    
    app.get('/api/autobots', async (req, res) => {
        const autobots = await autoCollection.find({}).toArray();

        res.json(autobots);
    })
//POST route to create/add autobot
    app.post('/api/autobots', async (req, res) => {
        //CREATE THE AUTOBOT
        const info = await autoCollection.insertOne({
            name: req.body.name,
            color:req.body.color
        })
        console.log(info)
        res.json({
            message: 'Autobodt created succesfully'
        })
    })
    

    //start express server
    app.listen(PORT, () => {
        console.log('Express server started on port', PORT)
    })
    
}
start();