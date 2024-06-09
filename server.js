// Import Modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// App Configurations
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000

// MongoDB connection
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }.then,
  console.log("MongoDB Successfully Connected")
);

// Middlewares
app.use(express.json());
app.use(bodyParser.json() );      
    app.use(bodyParser.urlencoded({    
         extended: true
}));

const books = [{
  bookName: "Rudest Book Ever",
  bookAuthor: "Shwetabh Gangwar",
  bookPages: 200,
  bookPrice: 240,
  bookState: "Available"
},
{
  bookName: "Do Epic Shit",
  bookAuthor: "Ankur Wariko",
  bookPages: 200,
  bookPrice: 240,
  bookState: "Available"
}
]


app.get('/', (req, res) => {
  res.status(200).json({data: books})
})

// Handling form data
app.post('/addBook', (req, res) => {
  const inputBookName = req.body.bookName
  const inputBookAuthor = req.body.bookAuthor
  const inputBookPages = req.body.bookPages
  const inputBookPrice = req.body.bookPrice
  
  books.push({
      bookName: inputBookName,
      bookAuthor: inputBookAuthor,
      bookPages: inputBookPages,
      bookPrice: inputBookPrice,
      bookState: "Available"
  })
  
  res.status(200).json({data: books})
})

// Issuing a Book
app.post('/issue', (req, res) => {
  var requestedBookName = req.body.bookName;
  books.forEach(book => {
      if (book.bookName == requestedBookName) {
          book.bookState = "Issued";
      }
  })
  res.status(200).json({
      data: books
  })
})

// Returning a Book
app.post('/return', (req, res) => {
  var requestedBookName = req.body.bookName;
  books.forEach(book => {
      if (book.bookName == requestedBookName) {
          book.bookState = "Available";
      }
  })
  res.json({data: books})
})

// Deleting a Book
app.post('/delete', (req, res) => {
  var requestedBookName = req.body.bookName;
  var j = 0;
  books.forEach(book => {
      j = j + 1;
      if (book.bookName == requestedBookName) {
          books.splice((j - 1), 1)
      }
  })
  res.json({data: books})
})


// 
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

