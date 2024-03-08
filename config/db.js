const mongoose = require('mongoose')

async function  DB(){
    try {
        const url = process.env.DB;
         await mongoose.connect(url)
         console.log("connect to db sucessfully...")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = DB;