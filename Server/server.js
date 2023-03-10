const express = require('express')
const cors = require('cors')
const app = express()
const { v4: uuidv4} = require('uuid')

app.use(cors())
app.use(express.json())

let movies = [
    { id: uuidv4(), title: 'The Godfather', year: 1972, director: 'Francis Ford Coppola', genre: 'Crime, Drama' },
    { id: uuidv4(), title: 'The Shawshank Redemption', year: 1994, director: 'Frank Darabont', genre: 'Drama' },
    { id: uuidv4(), title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan', genre: 'Action, Crime, Drama' },
]

// Get all movies
app.get('/movies', (req, res) =>{
    res.json(movies)
})

// Get movie by ID
app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
});

// Create a new movie
app.post('/movies', (req, res) => {
    const movie = req.body
    if(!movie.title || !movie.director || !movie.genre || !movie.year){
        return res.status(400).json({error: 'Missing required fields'})
    }
    movie.id = uuidv4()
    movies.push(movie)
    res.json(movie)
})

// Update a movie by ID
app.put('/movies/:id', (req, res) => {
    const id = req.params.id
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1){
        return res.status(404).json({ error: 'Movie not found'})
    }
    const updatedMovie = req.body
    if(!updatedMovie.title || !updatedMovie.director || !updatedMovie.genre || !updatedMovie.year){
        return res.status(400).json({ error: 'Missing required fields' })
    }
    movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie }
    res.json(movies[movieIndex])
})

// Delete a movie by ID
app.delete('/movies/:id', (req, res) => {
    const id = req.params.id
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1){
        return res.status(404).json({ error: 'Movie not found'})
    }
    movies.splice(movieIndex, 1)
    res.status(204).send()
})

const PORT  = 3001
app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`)
})