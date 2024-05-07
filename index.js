// 3.1: Phonebook backend step 1 - fetch data http://localhost:3001/api/persons
// 3.2: Phonebook backend step 2 - implement http://localhost:3001/info
// 3.3: Phonebook backend step 3 - fetch data http://localhost:3001/api/persons/:id
// 3.4: Phonebook backend step 4 - implement DELETE request
// 3.5: Phonebook backend step 5 - implement POST request
// 3.6: Phonebook backend step 6 - error handling
// 3.7: Phonebook backend step 7 - Morgan middleware
// 3.8: Phonebook backend step 8 - configure Morgan to show POST request data
// 3.9 Phonebook backend step 9 - Cors middleware
// 3.10: Phonebook backend step 10 - Deploying the database backend to the internet
// 3.11: Phonebook full stack 


require('dotenv').config() 
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors') 

// const morgan = require('morgan')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

// Create a new token for morgan
// morgan.token('body', function (req, res) { return JSON.stringify(req.body) }) 

// const morganFormat = ':method :url :status :res[content-length] - :response-time ms :body'

app.use(cors()) // Use cors to allow requests from other origins
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))
// app.use(morgan(morganFormat)) // Use morgan to log the requests



const unknownEndpoint = (request, response) => {
    response.status(404).send({ 
        error: 'unknown endpoint' 
    })
}

let persons = []

// GET request - root
app.get('/', (request, response) => { 
    response.send('<h1>Phonebook Backend</h1>')
})

// GET request - persons
app.get('/api/persons', (request, response) => { 
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// GET request - info
app.get('/info', (request, response) => { 
    const date = new Date() // Get the current date
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    )
})

// GET request - persons/:id
app.get('/api/persons/:id', (request, response) => { 
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

// generateId - used to generate a unique id for a new person
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    return maxId + 1
}

// POST request - persons
app.post('/api/persons', (request, response) => { // Define a route handler for the path /api/persons
    const body = request.body

    if(!body.name || !body.number) { // If the name is missing, return an error
        return response.status(400).json({
            error:'name or number is missing'
        })
    }
    

    Person.find({name: body.name}).then(persons => {
        if(persons.length > 0) {
            return response.status(400).json({
                error: 'The name already exists in the phonebook'
            })
        } else {
            const person = new Person({ // Create a new person object
                id: generateId(),
                name: body.name,
                number: body.number
            })
        
            person.save().then(savedPerson => {
                response.json(savedPerson)
            })
        }
    })
    
    
    

    
})

// DELETE request - persons/:id
app.delete('/api/persons/:id', (request, response) => { // Define a route handler for the path /api/persons/:id
    const id = Number(request.params.id) // Get the id from the request
    persons = persons.filter(person => person.id !== id) // Filter out the person with the id
    response.status(204).end() // Return a status code 204
})


app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
