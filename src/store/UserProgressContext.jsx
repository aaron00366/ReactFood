import { createContext, useState } from "react";
const UserProgressContext = createContext({
    userProgress: '',
    showCart:() => {},
    hideCart:() => {},
    showCheckout:() => {},
    hideCheckout:() => {},
});
export function UserProgressContextProvider({children}){
    const [userProgress, setUserProgress] = useState('')
    const showCart = () => {
        setUserProgress('cart')
    }
    const hideCart = () => {
        setUserProgress('')
    }
    const showCheckout = () => {
        setUserProgress('checkout')
    }
    const hideCheckout = () => {
        setUserProgress('')
    }
    const context = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    }
    return <UserProgressContext.Provider value={context}>
        {children}
    </UserProgressContext.Provider>
}
export default UserProgressContext;