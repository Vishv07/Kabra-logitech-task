require('dotenv').config();
const mongoose = require('mongoose')
const express= require('express');
const app = express();
const cookieparser = require('cookie-parser');
var bodyParser = require('body-parser')
const cors = require('cors');
const port =  3001;
const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/ProductRoutes.js");
//DB CONNECTIONS
mongoose
    .connect("mongodb://localhost:27017/test",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        }).then(()=>{
            console.log("DB CONNECTED");
        }).catch(() =>{
            console.log("ERROR");
})

app.use(bodyParser.json())

app.use(cookieparser());
app.use(cors());
       
// MY ROUTES
app.use("/api",authRoutes);
app.use("/api",productRoutes);

app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

