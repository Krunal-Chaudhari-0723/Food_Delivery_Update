import React from 'react'
import './Exploremenu.css';
import { menu_list } from '../../assets/assets'
const Exploremenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1> 🌟 See what's available!...  🌟</h1>
      <p className='explore-menu-text'>Streamline your food delivery operations with Order Hub – the all-in-one solution for restaurants and food businesses. From seamless order management to real-time tracking, Order Hub ensures efficiency, speed, and customer satisfaction. Simplify your workflow, boost productivity, and deliver delicious meals with ease. Let Order Hub take your food delivery game to the next level! 🚀🍴

        .</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default Exploremenu
