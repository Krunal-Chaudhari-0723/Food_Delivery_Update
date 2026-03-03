import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

//create context

const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])
    //we add functionality to add to cart and remove to cart

    const addToCart =async (itemId)=>{
        //new entry for our food product
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            //suppose any product item already available and qty is 1 we increase that
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})        }

    }


    //remove from cart

    const removeFromCart =async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:token})
        }
    }
    //for get amount into cart item
    const getTotalCartAmount = ()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0) {
                let itemInfo = food_list.find((product)=>product._id == item);
                totalAmount += itemInfo.price* cartItems[item]
            }    
        }
        return totalAmount;
    }

    const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }
    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        } 
        loadData();
    },[])
    
    const contextValue={
        //within in the context function we can add any value to each
        food_list,//pass context value
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    
    return(
        <StoreContext.Provider value={contextValue}>
        {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;