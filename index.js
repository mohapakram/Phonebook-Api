const express = require('express')
const app = express()
const bodyParser = require('body-parser');


app.use(bodyParser.json())

let phoneBook = [
	{
		name: 'mohap',
		number: "01069392983",
		id: 1
	}
]

const randomId = () =>  Math.floor(Math.random() * Math.floor(1000000));


app.get('/api/persons', (req, res) => {
	res.json(phoneBook)
})


app.post('/api/persons', (req, res) => {
	const newData = req.body;
	const { name, number } = newData;
	if(!name || !number){
		return res.status(400).json({
			error:"Wrong format"
		});
	}

	const exist = phoneBook.find(person=> person.name === name)
     
	console.log(exist)

    if(exist){
		return res.status(400).json({
			error: "Name must be unique"
		});	
    }

	const newPerson = {
	 name,
	 number,
	 id:randomId()
	}

	phoneBook.push(newPerson);

	res.status(200).json(newPerson)
})


app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = phoneBook.find(person => person.id === id)
	if(person){
		res.json(person)	
	} else{
		res.status(404).end('Not Found')
	}
	
})

app.delete('/api/persons/:id', (req,res)=>{
	const id = Number(req.params.id);
	phoneBook = phoneBook.filter(person => person.id !== id)
	res.status(201).end('deleted')
})


app.get('/info', (req, res) => {
	res.send(`<h1> This Phonebook has info for ${phoneBook.length + 1} people.</h1>
 			  <h2>${new Date()}</h2>`)
})

const port = 3001
app.listen(port, () => {
	console.log('server is running on port', port)
})