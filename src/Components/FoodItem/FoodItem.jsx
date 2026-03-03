import React, { useContext } from 'react'
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {
const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

    //here i create state variable for add food into cart
    //we was remove usestate
  
    /*Here we define counter 0 where we have 32 dishes its create 1 varibale for each product
    This is not good way : to solve this problem we create 1 crat item object in our context and we
    manage product card data using manage functionality
    */
  return (
    <div className='food-item'>
      <div className="food-item-image-containor">
        <img className='food-item-image' src={url+"/images/"+image} alt="" />
        {
            //if our food item count is 0 in that case we provide one add button
            // if our food item is >0 than we provide 1 counter
            !cartItems[id]
            ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
            : <div className="food-item-counter">
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem
