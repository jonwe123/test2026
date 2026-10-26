const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(cors())

let personlist = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/info', (request, response) => {
    response.send(`phonebook has info for ${personlist.length} people <br> ${new Date()}`)
  })
 
app.get('/api/persons', (request, response) => {
    response.json(personlist)
})
 
app.get('/api/persons/:id', (request, response) => {
  const personid = request.params.id 
  const searchid = personlist.filter(person => person.id === personid)
  if (searchid.length !== 0) {
    console.log('searchid true', searchid)
    response.send(searchid)
  }
  else {
    console.log('searchid', searchid)
    // response.send('No person with such an id').status(400)
    response.status(400).send('no such id').end()
  }
  })

app.delete('/api/persons/:id', (request, response) => {
  const personid = request.params.id
  const idexist = personlist.filter(item => item.id == personid)
  if (idexist !== null) {
    personlist = personlist.filter(item => item.id != personid)
    response.status(204).end()
  }
  else 
    response.status(404).send(`no such person`).end()

  
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const newid = Math.floor(10000 * Math.random()).toString()
  
  if (!body.number || !body.name) {
    response.status(400).json({error: "name or number missing"}).end()
  }
  else if (personlist.find(item => item.name === body.name)) {
    response.status(400).json({error: "The name already exist"}).end()
  }
  else {

  const newperson = {
    id: newid,
    name: body.name,
    number: body.number,
  }

  personlist = personlist.concat(newperson)
  // response.status(200).json({message: `the new person info is added ${personlist}`}).end()
  response.status(200).send(newperson).end()
} 
})

const PORT= process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server hej runnin on port ${PORT}`)
    
})


