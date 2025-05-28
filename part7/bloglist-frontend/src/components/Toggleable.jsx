import { forwardRef, useState,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
const Toggleable = forwardRef((props,ref) => {
  const [visible, setVisible] = useState(false)

  const showToggle = !visible
  const showContent = visible

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
      <div className={`${showToggle ? '' : 'hidden'}`}>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div className={`${showContent ? '' : 'hidden'} mt-4 bg-white p-4 rounded-md shadow-md`}>  
        {props.children}
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </>
  )
})
Toggleable.displayName = 'Togglable'
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
export default Toggleable