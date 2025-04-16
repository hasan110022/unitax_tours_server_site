const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// zMvoJ6zV5JDy3053 pass
// UnitaxTour name


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lfgd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bl9xwid.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const tourCollection = client.db('tourDB').collection('tour');
    const destinationCollection = client.db('destinationDB').collection('destination');

    app.get('/tour', async(req,res) =>{
        const cursor = tourCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    });

    app.get('/tour/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await tourCollection.findOne(query);
      res.send(result);
    });

    // destination

    app.get('/destination', async(req,res) =>{
      const cursor = destinationCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    
    app.get('/destination/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await destinationCollection.findOne(query);
      res.send(result);
    });


    app.post('/tour', async(req,res) =>{
        const newTour = req.body;
        console.log(newTour);
        const result = await tourCollection.insertOne(newTour);
        res.send(result);
    });

    app.post('/destination', async(req,res) =>{
      const newDestination = req.body;
      console.log(newDestination);
      const result = await destinationCollection.insertOne(newDestination);
      res.send(result);
    })












    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req,res) =>{
    res.send("unitax tour server is running..")
});

app.listen(port, ()=>{
    console.log(`unitax tour is running on port : ${port}`)
})