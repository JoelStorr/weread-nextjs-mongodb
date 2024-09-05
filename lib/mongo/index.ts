import { MongoClient } from "mongodb";

const URI = process.env.DBURI;
const options = {};

if(!URI){
    throw new Error('Pleas add your MongoDB URI to your .env file')
}

let client = new MongoClient(URI, options);
let clientPromis:any;

if(process.env.NODE_ENV !== 'production'){
    if(!global._mongoClientPromis){
        global._mongoClientPromis = client.connect()
    }

    clientPromis = global._mongoClientPromis;
}else {
    clientPromis = client.connect()
}


export default clientPromis;