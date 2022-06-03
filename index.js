const express = require('express')
const app = express()
const port =process.env.PORT || 5000;
const cors = require('cors')
// requre dotenv
require('dotenv').config();
// mongo require
const { MongoClient, ServerApiVersion } = require('mongodb');

// meddale ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.afikl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const servicesCollection = client.db("medica_plus").collection("services");

    app.get('/services', async(req,res)=>{
      const query = {};
      const cursor = servicesCollection.find(query);
      const services = await cursor.toArray();
      res.send(services)
    })
  }finally{

  }
  
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Medica+ is running')
})











app.listen(port, () => {
  console.log(`Medica+ server listening on port ${port}`)
})