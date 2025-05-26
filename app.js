//Import package
const express = require('express');
const fs = require('fs');

//ROUTE HANDLER FUNCTIONS
const getAllMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        count: movies.length,
        data : {
            movies: movies
        }
    })
};

const getMovie = (req, res) => {
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
};

const createMovie = (req, res) => {
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
};

const updateMovie = (req, res) => {
    let id = req.params.id * 1;
    let movieToUpdate = movies.find(movie => movie.id === id);
    let index = movies.indexOf(movieToUpdate); //3

    if (!movieToUpdate) {
        return res.status(404).json({
            status: 'fail',
            message: 'No movie object with ID ' + id + ' is found'
        });
    }

    Object.assign(movieToUpdate, req.body);

    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "sucess",
            data: {
                movie: movieToUpdate
            }
        });
    });
};

const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const movieToDelete = movies.find(movie => movie.id === id);
    if (!movieToDelete) {
        return res.status(404).json({
            status: 'fail',
            message: 'No movie object with ID ' + id + ' is found to delete'
        });
    }

    const index = movies.indexOf(movieToDelete);

    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        });
    })
};

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.use(express.json())

// app.get('/api/v1/movies', getAllMovies);
// app.get('/api/v1/movies/:id', getMovie);
// app.post('/api/v1/movies', createMovie);
// app.patch('/api/v1/movies/:id', updateMovie);
// app.delete('/api/v1/movies/:id', deleteMovie);

app.route('/api/v1/movies')
    .get(getAllMovies)
    .post(createMovie);

app.route('/api/v1/movies/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie);

//Create a server
const port = 3000;
app.listen(port, () => {
    console.log('server has started...');
})

