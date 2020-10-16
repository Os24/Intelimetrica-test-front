import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Pagination } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import '../App';

const PAGE_SIZE = 4;
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function RestaurantCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [hasError, setErrors] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  async function fetchData() {
    const res = await fetch("https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json");
    res
      .json()
      .then(res => setRestaurants(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  },
  []
  );


  //console.log(restaurants)
  
  function getPage(page,rate,name){
    const index = page-1
    const pageStart = index*PAGE_SIZE
    const pageEnd = index*PAGE_SIZE + PAGE_SIZE 
    return filterByRate(rate).slice(pageStart,pageEnd)
    //return filterByName(name)
    
  }
  function filterByRate(rate){
    if (rate === null ) {
      return restaurants
    }
    return restaurants.filter(restaurant => restaurant.rating === rate);
  }

  function filterByName(name){
    return restaurants.filter(restaurant => restaurant.name === name)
  }


  const [name,setName] = useState({
    name:'Barajas',
  });
  const [rate, setRate] = useState(null);

  const handleChangeRate = (event) => {
    setPage(1)
    setRate(event.target.value);

  };

  const handleChangeName = event => {
    let value = event.target.value
    let property = event.target.name
    console.log(value)
    console.log(property)
    setPage(1)
    setName(event.target.value);

  };

  return (
    <div>
      <div className={'search-box-container'}>
        <TextField 
              type="text"
              onChange={handleChangeName}
              id="standard-basic" label="Restaurante" 
              name = "name"
            />
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Rate</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rate}
          onChange={handleChangeRate}
        >
          <MenuItem value={1}>⭐</MenuItem>
          <MenuItem value={2}>⭐⭐</MenuItem>
          <MenuItem value={3}>⭐⭐⭐</MenuItem>
          <MenuItem value={4}>⭐⭐⭐⭐</MenuItem>
          <MenuItem value={5}>⭐⭐⭐⭐⭐</MenuItem>
          <MenuItem value ={null}>All</MenuItem>
        </Select>
      </FormControl>
      </div>
      <div className={'cards-container'}>
        {
         getPage(page,rate,name).map((restaurant, i) => (
          <Card className={classes.root} key ={i}>
          <span></span>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={restaurant.name}
              subheader={restaurant.contact.site}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Dirección:<br></br>
                {
                  restaurant.address.street
                }<br></br>
                {
                  restaurant.address.city
                }<br></br>
                {
                  restaurant.address.state
                }<br></br>
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                
              </IconButton>
            </CardActions>
          </Card>
          ))
        }
      </div>
      <div className={'pagination-container'}>
      <Pagination count={Math.floor(filterByRate(rate).length/PAGE_SIZE)} color="primary"  onChange = {handleChange}/>
    
      </div>
    </div>
    
  );
}
export default RestaurantCard