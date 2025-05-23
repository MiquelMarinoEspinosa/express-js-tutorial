//Import package
const express = require('express');
const fs = require('fs');

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.use(express.json())

//GET - api/v1/movies
app.get('/api/v1/movies', (req, res) => {
    res.status(200).json({
        status: "success",
        count: movies.length,
        data : {
            movies: movies
        }
    })
})

//GET - api/v1/movies/id
app.get('/api/v1/movies/:id', (req, res) => {
    //console.log(req.params);
    //convert id to number type
    const id = req.params.id * 1;

    //find movie based on id parameter
    let movie = movies.find(el => el.id === id);

    if (!movie) {
        return res.status(404).json({
            status: "fail",
            message: "Movie with ID " + id + " is not found"
        });
    }

    //send movie in the response
    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    });
})

//POAR - api/v1/movies
app.post('/api/v1/movies', (req, res) => {
    //console.log(req.body);
    const newId = movies[movies.length - 1].id + 1;

    const newMovie = Object.assign({id: newId}, req.body)

    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie
            }
        })
    })
    //res.send('Created');
})

//Create a server
const port = 3000;
app.listen(port, () => {
    console.log('server has started...');
})

