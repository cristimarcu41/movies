import './App.css';
import React, {useState, useEffect} from 'react'
import Movie from "./components/Movie";

const FEATURED_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&query='

function App() {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const getMovies =(API) => {
        fetch(API)
            .then(res => res.json())
            .then(data => {
                console.log(data.results)
                setMovies(data.results)
            })
    }

    useEffect(() => {
        getMovies(FEATURED_API)

    }, [])

    const getInputText = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
       if(searchTerm) {
           getMovies(SEARCH_API+searchTerm)
           setSearchTerm('')
       }
    }
    return (
        <div className="App">
            <header>
                <form onSubmit={handleOnSubmit}>
                    <input type="text" onChange={getInputText} className="search-input" placeholder="Search..."
                           value={searchTerm}/>
                </form>
            </header>
            <div className="movies-container">
                {movies.length > 0 && movies.map(movie => (
                    <Movie key={movie.id} {...movie}/>
                ))}
            </div>
        </div>
    );
}

export default App;
