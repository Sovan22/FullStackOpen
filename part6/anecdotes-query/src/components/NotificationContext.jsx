import { createContext, useReducer, useContext } from 'react';
const NotificationContext = createContext()

const notifcationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload;
        case 'CLEAR_NOTIFICATION':
            return null;
        default:
            return state;
    }
}

export const NotificationProvider = (props) => {
    const [notification, setNotification] = useReducer(notifcationReducer, null)
    
    const notify = (message, timeout = 5000) => {
        setNotification({type: 'SET_NOTIFICATION', payload: message})
        setTimeout(() => {
        setNotification({type: 'CLEAR_NOTIFICATION'})
        }, timeout)
    }
    
    return (
        <NotificationContext.Provider value={{ notification, notify }}>
        {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context.notification
}

export const useNotify = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotify must be used within a NotificationProvider')
    }
    return context.notify
}

export default NotificationContext;