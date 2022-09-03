import React, {  useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading :false,
  cart:[],
  total:0,
  amount:0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState);

  const clearCart = () => {
    dispatch({type:'CLEAR_CART'});
  }

  const removeItem = (id) => {
    dispatch({type:'REMOVE' , payload : id})
  }
  const increaseItem = (id) => {
    dispatch({type:'INCREASE' , payload : id})
  }
  const decreaseItem = (id) => {
    dispatch({type:'DECREASE' , payload : id})
  }

  const fetchData = async () => {
    dispatch({type:'LOADING'});
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type:'DISPLAY_ITEMS' , payload : cart})
  }


  useEffect(() =>{
    fetchData();
  },[])

  useEffect(() => {
    dispatch({type : 'GET_TOTALS'});

  } , [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider };
