const express=require('express');
const bodyParser=require('body-parser');
require('dotenv').config();
const multiRoute=require("./Route/multiRoute");
const mongoose=require('mongoose');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
const port=process.env.PORT;
const dbDriver=process.env.URL;
app.use('/upload',express.static('upload'));
app.use(multiRoute);
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(port,()=>{
        console.log('db is connected');
        console.log(`server is running at http://localhost:${port}/users`);
    })
})
.catch((error)=>{
    console.log('error');
})