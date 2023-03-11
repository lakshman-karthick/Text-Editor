require('dotenv').config()
const Pusher = require("pusher");
const express = require('express')
const app = express()
const mongoose = require('mongoose')

var cors = require('cors')

app.use(cors())

const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1566778",
    key: "434e9cbfcbea42395b7d",
    secret: "9bb8ec7b6fdc1d7c0cd4",
    cluster: "ap2",
    useTLS: true
  });

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to Database'))
db.once("open",()=>{
    console.log("DB Connected");
    const msgCollection = db.collection("texts");
    const changeStream = msgCollection.watch();
    changeStream.on('change',(change)=>{
      console.log(change);
  
      if(change.operationType === 'insert'){
          const messageDetails = change.fullDocument;
          console.log(change.fullDocument);
          pusher.trigger('messages','inserted',{
              Message:messageDetails.Message,
          }
          )
        
      }else{
          console.log("Error trigger pushing")
      }
    })
  })


const TextRouter = require('./routes/texts')
app.use('/texts', TextRouter)

app.listen(port, () => console.log(`Server started at ${port}`))