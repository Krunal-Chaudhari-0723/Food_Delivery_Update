import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header.jsx'
import Exploremenu from '../../Components/Exploremenu/Exploremenu.jsx'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay.jsx'
import MobileApp from '../../Components/MobileApp/MobileApp.jsx'
const Home = () => {

  const [category,setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <Exploremenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <MobileApp/>
    </div>
  )
}

export default Home;
