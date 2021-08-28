// CRUD OPERATIONS;
 const {MongoClient,ObjectId} = require('mongodb');


const conectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const id = new ObjectId();
console.log(id)

MongoClient.connect(conectionURL,{useNewUrlParser: true},(error,client)=>{
    if(error){
        return console.log('unable to connect')
    }
    const db = client.db(databaseName)
    db.collection('users').deleteMany({}).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
    
   

    })


   
    
   


