import { useNotification } from "./NotificationContext.jsx"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotification()
  
  if (notification === null) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
