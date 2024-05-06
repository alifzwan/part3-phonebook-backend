const mongoose = require('mongoose')

// Exercise 3.12.


if(process.argv.length < 3) { // if the password is not provided as an argument, the program will exit.
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2] // the password is taken from the command line argument.
const name = process.argv[3] // the password is taken from the command line argument.
const number = process.argv[4] // the password is taken from the command line argument.


const url = 
`mongodb+srv://phonebook:${password}@cluster0.ae9aooo.mongodb.net/?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false) // This is to avoid the deprecation warning.

mongoose.connect(url)

//? Schema - The schema is defined for the Note model.
const personSchema = new mongoose.Schema({ // The schema is defined for the Note model.
    name: String,
    number: String,
})

//? Model - The Person model is created based on the schema.
const Person = mongoose.model('Person', personSchema) // The Note model is created based on the schema.

//? Object - A new note object is created based on the model.
const person = new Person({ // A new note object is created based on the model.
    name: name,
    number: number,
})

//! Fetching objects(note) from the database
Person.find({}).then(result => { // The notes in the database are fetched.
    if (result.length > 0) { // Check if there are notes found
        console.log('phonebook:') // The notes are logged to the console.
        result.forEach(person => { // The notes are logged to the console.
            console.log(`${person.name} ${person.number}`)
        })
    } else {
        console.log('No person found!')
    }
    mongoose.connection.close() // The database connection is closed.
})


//! The note object is saved to the database.
// person.save().then(result => { // The note object is saved to the database.
//     console.log(`added ${person.name} number ${person.number} to the phonebook\n`)
//     mongoose.connection.close()
// })