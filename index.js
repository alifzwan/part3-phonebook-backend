const express = require('express')
const app = express()
// const morgan = require('morgan')
const cors = require('cors') // Import cors


// Create a new token for morgan
// morgan.token('body', function (req, res) { return JSON.stringify(req.body) }) 

// const morganFormat = ':method :url :status :res[content-length] - :response-time ms :body'


// app.use(express.json())
// app.use(morgan(morganFormat)) // Use morgan to log the requests
app.use(cors()) // Use cors to allow requests from other origins

// 3.1: Phonebook backend step 1
// 3.2: Phonebook backend step 2
// 3.3: Phonebook backend step 3
// 3.4: Phonebook backend step 4
// 3.5: Phonebook backend step 5
// 3.6: Phonebook backend step 6
// 3.7: Phonebook backend step 7
// 3.8: Phonebook backend step 8



let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

// GET request - root
app.get('/', (request, response) => { 
    response.send('<h1>Phonebook Backend</h1>')
})

// GET request - persons
app.get('/api/persons', (request, response) => { 
    response.json(persons) 
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
    const id = Number(request.params.id) // Get the id from the request
    const person = persons.find(person => person.id === id) // Find the person with the id

    if (person) {
        response.json(person)
    }else {
        response.status(404).end()
    }
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
    } else if(persons.find(person => person.name === body.name)) { // If the name already exists, return an error
        return response.status(400).json({
            error:'The name already exists in the phonebook'
        })
    }

    const person = { // Create a new person object
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person) // Add the new person object to the persons array
    console.log(persons)
    response.json(person) // Return the new person object
})

// DELETE request - persons/:id
app.delete('/api/persons/:id', (request, response) => { // Define a route handler for the path /api/persons/:id
    const id = Number(request.params.id) // Get the id from the request
    persons = persons.filter(person => person.id !== id) // Filter out the person with the id
    response.status(204).end() // Return a status code 204
})




const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
