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

    const tourCollection = client.db('tourdb').collection('tour');
    const destinationCollection = client.db('tourdb').collection('destination');
    const usersCollections = client.db('tourdb').collection('users');
    const packagesCollections = client.db('tourdb').collection('packages');
    const bookingsCollections = client.db('tourdb').collection('bookings');

    app.get('/packages', async(req,res) =>{
        const cursor = packagesCollections.find();
        const result = await cursor.toArray();
        res.send(result);
    });
    app.post('/packages', async(req,res) =>{
      const newTour = req.body;
      const result = await packagesCollections.insertOne(newTour);
      res.send(result);
  });

    app.get('/bookings', async(req,res) =>{
        const cursor = bookingsCollections.find();
        const result = await cursor.toArray();
        res.send(result);
    });
    app.post('/bookings', async(req,res) =>{
      const newTour = req.body;
      const result = await bookingsCollections.insertOne(newTour);
      res.send(result);
  });

    app.post('/users/:email', async (req, res) => {
      const newuser = req.body;
      const email = req.params.email
      const query = { email }
      const existingUser = await usersCollections.findOne(query)
      if (existingUser) {
        return res.send('existing User')
      }
      const result = await usersCollections.insertOne({
        ...newuser,
        timeStamp: Date.now(),
      })
      res.send(result)
    })
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email
      const query = { email }
      const result = await usersCollections.findOne(query)
      res.send(result)
    })

    app.get('/packages/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await packagesCollections.findOne(query);
      res.send(result);
    });
    app.delete('/packages/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await packagesCollections.deleteOne(query)
      res.send(result)
    })

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