
import { useDispatch } from 'react-redux'
import { setFilter, clearFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filterValue = event.target.value
    if (filterValue === '') {
      dispatch(clearFilter())
      return
    }
    dispatch(setFilter(filterValue))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter