import React from 'react';
import './App.css';
import  MainAppBar  from "./components/MainAppBar";
import RestaurantCard from './components/RestaurantCard'

function App() {
  return (
    <div>
    <MainAppBar></MainAppBar>
    <RestaurantCard></RestaurantCard>
    </div>
  );
}

export default App;
