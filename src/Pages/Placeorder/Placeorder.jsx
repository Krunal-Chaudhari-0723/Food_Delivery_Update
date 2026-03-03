import React, { useContext, useState } from 'react';
import './Placeorder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const BACKEND_URL = 'http://localhost:5000'; // Change this to your backend URL
  const STRIPE_PK = 'pk_test_your_stripe_publishable_key'; // Replace with your key

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const placeOrder = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Validate inputs
      if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        throw new Error('Please fill all required fields');
      }

      // 2. Prepare cart items
      const orderItems = food_list
        .filter(item => cartItems[item._id] > 0)
        .map(item => ({
          name: item.name,
          price: item.price * 100, // in paise
          quantity: cartItems[item._id],
          image: item.image
        }));

      if (orderItems.length === 0) throw new Error('Your cart is empty');

      // 3. Create Stripe session
      const response = await axios.post(
        `${BACKEND_URL}/create-stripe-session`,
        {
          items: orderItems,
          customer: data,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/cart`
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // 4. Redirect to Stripe
      const stripe = await loadStripe(STRIPE_PK);
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });
      
      if (error) throw error;

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };


  return (
    <form onSubmit={placeOrder} action="" className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-field">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="emial" placeholder='Email Address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
      <div className="multi-field">
        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
      </div>
      <div className="multi-field">
        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Pin Code'/>
        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
      </div>
      <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>
      <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Charge</p>
                <p>₹{getTotalCartAmount()===0?0:120}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+120}</b>
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
      </div>
    </form>
  )
}

export default Placeorder
