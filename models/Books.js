const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        default:""
    },
    bookISBN:{
        type:String,
        default:""
    },
    publisher:{
        type:String,
        default:""
    },
    availableCopies:{
        type:Number,
        require:true
    },
    categories:[{ 
        type: mongoose.Types.ObjectId, 
        ref: "BookCategory" 
    }],
},
{
    timestamps:true
})

module.exports = mongoose.model("Book", BookSchema)