import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Test Title',
  url: 'http://test.com',
  likes: 20,
  author: 'Test User',
  user: {
    name: 'Test User',
    id: '12345'
  }
}

const user = {
  name: 'Test User',
}

test('renders title and author, but not url or likes by default', async () => {


  const updateLike = vi.fn()
  const handleDelete = vi.fn()

  const { container } = render(<Blog blog={blog} updateLike={updateLike} handleDelete={handleDelete} user={user} />)
  const titleAndAuthor = container.querySelector('.blog')
  const otherDetails = container.querySelector('.togglableContent')
  expect(otherDetails).toHaveStyle('display: none')
  expect(titleAndAuthor).toBeDefined()
})

test('renders url and likes when the button is clicked', async () => {
  const updateLike = vi.fn()
  const handleDelete = vi.fn()

  const container = render(<Blog blog={blog} updateLike={updateLike} handleDelete={handleDelete} user={user} />)
  const button = screen.getByText('view')
  await userEvent.click(button)

  const otherDetails = container.container.querySelector('.togglableContent')
  const urlAndLikes = screen.getByText('http://test.com')
  expect(urlAndLikes).toBeDefined()
})

test('clicking the like button calls updateLike function', async () => {
  const updateLike = vi.fn()
  const handleDelete = vi.fn()

  render(<Blog blog={blog} updateLike={updateLike} handleDelete={handleDelete} user={user} />)
  const button = screen.getByText('view')
  await userEvent.click(button)

  const likeButton = screen.getByText('like')
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)

  expect(updateLike).toHaveBeenCalledTimes(3)
})
