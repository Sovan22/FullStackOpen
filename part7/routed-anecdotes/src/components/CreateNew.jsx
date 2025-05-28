import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = (props) => {
  const navigate = useNavigate()
  const [content, resetContent] = useField('')
  const [author, resetAuthor] = useField('')
  const [info, resetInfo] = useField('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author : author.value,
      info : info.value,
      votes: 0
    })
    navigate('/')
    // Resetting the fields after submission
    resetContent()
    resetAuthor()
    resetInfo()
    // props.setNotification(`a new anecdote ${content} created!`) 
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew