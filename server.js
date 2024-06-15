const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const bookRoutes = require("./routes/books");
const categoryRoutes = require("./routes/categories");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000

app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);


mongoose.connect(
  process.env.MONGODB_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }.then,
  console.log("MongoDB Successfully Connected")
);

app.use(express.json());
app.use(bodyParser.json() );      
    app.use(bodyParser.urlencoded({    
         extended: true
}));


app.get("/", (req, res) => {
  res.status(200).send("Welcome to YouThrive Library Management App");
});


/* ---------------------------- */
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})