import React from 'react';
import '../App.css';
import { 
  Button,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  ButtonGroup,
 } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faVideo} from '@fortawesome/free-solid-svg-icons'
import { useState} from 'react'

function Movie(props) {

  const [likeMovie, setLikeMovie] = useState(false)
  const [watchMovie, setWatchMovie] = useState(false)
  const [countWatchMovie, setCountWatchMovie] = useState(0)
  const [myRatingMovie, setMyRatingMovie] = useState(0)
  const [isVoted, setIsVoted] = useState(false)

  var likeClick = () => {
    if(likeMovie === false){
      setLikeMovie(true)
      props.handleClickAddMovieParent(props.movieName, props.movieImg)
    } else {
      setLikeMovie(false)
      props.handleClickDeleteMovieParent(props.movieName)
      props.mesFilmsFavParent.filter((items)=>(items.name !== props.movieName))
    }
  }
  
  var colorLike;
  if (props.isReadParent){
    colorLike = {color: "#e74c3c"}
  }
  
  var watchClick = () => {
    setWatchMovie(true) 
    setCountWatchMovie(countWatchMovie + 1) 
  }

  var colorWatch
  if (watchMovie === true){
    colorWatch = {color: "#e74c3c"}
  }

  var ratingClick = (maNote) => {
    if(maNote>10){
      maNote = 10
    }
    if(maNote<0){
      maNote = 0
    }
    setMyRatingMovie(maNote)
    setIsVoted(true)
  }

  var tabRating = []
  for (var i = 0; i< 10; i++){
    var color = {}
    if(i < myRatingMovie){
      color = {color: '#f1c40f'}
    }
    let count = i+1
    tabRating.push(<FontAwesomeIcon onClick={ ()=> ratingClick(count)} style={color} icon={faStar} />)
    var ratingClick = (count) => {
      setMyRatingMovie(count)
      setIsVoted(true)
    }
  }

  var nbTotalNote = props.globalRating * props.globalCountRating
  var nbTotalVote = props.globalCountRating

  if(isVoted){
    nbTotalNote = nbTotalNote + myRatingMovie
    nbTotalVote = nbTotalVote + 1
  }

  // console.log("totalNote", nbTotalNote )

  // console.log("nbTotalVote", nbTotalVote)

  var moyenne =  nbTotalNote / nbTotalVote

  // console.log("ma moyenne", moyenne)


  var tabGlobalRating = []
  for(var i = 0; i < 10; i++){
      var color = {}
      if(i<moyenne){
          color = {color: '#f1c40f'}
      }
      tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />)
  }

  return (
    <Col xs="12" lg="6" xl="4">
    <Card style={{marginBottom:30}}>
    <CardImg top src={props.movieImg} alt={props.movieName} />
    <CardBody>
        <p>Like <FontAwesomeIcon style={colorLike} icon={faHeart} onClick={ () => likeClick()} /></p>
        <p>Nombre de vues  <FontAwesomeIcon style={colorWatch} icon={faVideo} onClick={ ()=> watchClick()} /> <Badge color="secondary">{countWatchMovie}</Badge></p>
        <p>Mon avis 

          {tabRating}
        
        <ButtonGroup size="sm">
            <Button color="secondary" onClick={ ()=> ratingClick(myRatingMovie-1)}>-</Button>
            <Button color="secondary" onClick={ ()=> ratingClick(myRatingMovie+1)}>+</Button>
        </ButtonGroup>
        </p>
        <p>Moyenne
        {tabGlobalRating}
        ({nbTotalVote})
        </p>
        <CardTitle>{props.movieName}</CardTitle>
        <CardText>{props.movieDesc}</CardText>
    </CardBody>
    </Card>
    </Col>


  );
}

export default Movie;