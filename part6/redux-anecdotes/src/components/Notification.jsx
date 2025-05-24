import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  // const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // const show = () => {
  //   setTimeout(() => {
  //     dispatch(setNotification(''))
  //   }, 5000)
  // }

  if (notification === '') {
    return null
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification