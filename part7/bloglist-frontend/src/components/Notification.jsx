import { useSelector } from 'react-redux'

const Notification = () => {
  const { message , success } = useSelector(state => state.notification)
  // console.log('Notification:', message, success)
  if (message === '') {
    return null
  }

  return (
    <div className= {success ? 'success' : 'error'}>{message}</div>
  )
}

export default Notification