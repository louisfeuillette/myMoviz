import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Container,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink, 
  Popover, 
  PopoverHeader, 
  PopoverBody, 
} from 'reactstrap';
import Movie from './components/Movie'



function App() {

  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const [moviesCount, setMoviesCount] = useState(0)
  const [moviesWishList, setMoviesWishList] = useState([])

  const [moviesList, setMoviesList] = useState([])

  var handleClickAddMovie = (name2, img2) => {
    setMoviesCount( moviesCount + 1 )
    setMoviesWishList([ ...moviesWishList, {name:name2, img:img2} ])
  }

  var handleClickDeleteMovie = (name) => {
    setMoviesCount( moviesCount - 1 )
    setMoviesWishList(moviesWishList.filter((items)=>(items.name !== name)))
  }

    useEffect( () => {
      async function loadData(){
        var apiCall = await fetch('/new-movies');
        var response = await apiCall.json();
        console.log(response)
        setMoviesList(response.moviesData.results)
      }
      loadData();
    }, []);


  var movieList = moviesList.map((movie,i) => {
    var maWishList = moviesWishList.find(movieWish => movieWish.name === movie.title)
    var isRead = false;
    if(maWishList){
      isRead = true
      console.log("ici")
    }
    console.log(movie)
    return(<Movie 
      key={i} 
      isReadParent={isRead} 
      mesFilmsFavParent={moviesWishList} 
      handleClickAddMovieParent={handleClickAddMovie} 
      handleClickDeleteMovieParent={handleClickDeleteMovie} 
      movieName={movie.title} 
      movieDesc={movie.overview} 
      movieImg={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
      globalRating={movie.popularity} 
      globalCountRating={movie.vote_count} 
      />)
  })

  
  var styles = {
    img: {
      width:'25%'
    }
  }

  return (
    <div style={{backgroundColor:"#232528"}}>
      <Container>
        <Nav>
          <span className="navbar-brand">
            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </span>
          <NavItem>
            <NavLink style={{color:'white'}}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button id="Popover1" type="button"> {moviesCount} films</Button>
            </NavLink>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
              <PopoverHeader>WishList</PopoverHeader>
                {moviesWishList.length == 0 ? 
                  <PopoverBody>
                    La liste est vide 
                  </PopoverBody>
                :
                moviesWishList.map((movie, i) => {
                  return(
                      <PopoverBody key={i} onClick={ ()=>handleClickDeleteMovie(movie.name) }>
                      <img src={movie.img} style={styles.img}></img>
                      {movie.name}
                      </PopoverBody>
                  )
                  })
                }
              
            </Popover>
          </NavItem>
        </Nav>
        <Row>
          {movieList}
        </Row>
      </Container>
    </div>
  );
}

export default App;