// import React from 'react'
// import './Footer.css'
// import { assets } from '../../assets/assets'
// const Footer = () => {
//   return (
//     <div className='footer' id='footer'>
//       <div className="footer-content">
//         <div className="footer-content-left">
//             <img src={assets.logo} alt="" />
//             <p>Reading is easier, too, in the new Reading view. You can collapse parts of the document and focus on the text you want. If you need to stop reading before you reach the end, Word remembers where you left off - even on another device.s</p>
//             <div className="footer-social-icon">
//                 <img src={assets.facebook_icon} alt="" />
//                 <img src={assets.twitter_icon} alt="" />
//                 <img src={assets.linkedin_icon} alt="" />
//             </div>
//         </div>
//         <div className="footer-content-center">
//         <h2>COMPANY</h2>
//         <ul>
//             <li>Home</li>
//             <li>AboutUS</li>
//             <li>Delivery</li>
//             <li>Privacy Policy</li>
//         </ul>
//         </div>

//         <div className="footer-content-right">
//             <h2>GET IN TOUCH</h2>
//             <ul>
//                 <li>6351924667</li>
//                 <li>7878451245</li>
//                 <li>contact:project604@gmail.com</li>
//             </ul>
//         </div>
//       </div>
//       <hr />
//       <p className='footer-copy-right'>Copyright 2025 08 Fooddelivery.com . All Right Reserved</p>
//     </div>
//   )
// }

// export default Footer
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <img src="./src/assets/NEWLOGO.png" alt="" className='logo' />
            <p>Craving something delicious? We're here to help! Whether you have questions about our menu, need assistance with an order, or want to provide feedback, our team is just a call or click away. Reach out to us for quick, reliable, and friendly service. Your next meal is closer than you think! 📞📧</p>
            <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>AboutUS</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
        </div>

        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>6351924667</li>
                <li>9773139708</li>
                <li>9662400061</li>
                <li>contact:project604@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copy-right'>Copyright 2025 08 Fooddelivery.com . All Right Reserved</p>
    </div>
  )
}

export default Footer

