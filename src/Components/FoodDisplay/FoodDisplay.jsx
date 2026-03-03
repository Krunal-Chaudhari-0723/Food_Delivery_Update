import React, { isValidElement, useContext, useState } from 'react'
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';


const FoodDisplay = (category)=>{
  //get the data on output using fod_list array
  const {food_list} = useContext(StoreContext)
  return(
    <div className='food-display' id='food-display'>
      <h2>Food Dishesh Near You</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
          if(category="All" || category===item.category){
          return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
        })}
      </div>
    </div>
  )
}
export default FoodDisplay;