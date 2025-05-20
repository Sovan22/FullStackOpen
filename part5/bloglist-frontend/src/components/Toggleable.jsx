import { forwardRef, useState,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
const Toggleable = forwardRef((props,ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
})
Toggleable.displayName = 'Togglable'
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
export default Toggleable