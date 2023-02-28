import { createContext, useState } from "react";

const UserContext = createContext();

export const ContextProvider = ({children}) => {
    const [items, setItems] = useState([]);

    const addToCart = (index, name, price, source) => {
        setItems((prevState) => [...prevState, {index, name, price, source}])
        console.log(items.length)
    }

    return (
        <UserContext.Provider value={{items, addToCart, setItems}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;


