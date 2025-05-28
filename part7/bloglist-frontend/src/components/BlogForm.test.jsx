import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogFrom from './BlogForm'
import { test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { input } from '@testing-library/user-event/dist/cjs/event/input.js'

test('renders the blog form', () => {
  const createBlog = vi.fn()
  const { container } = render(<BlogFrom createBlog={createBlog} />)
  const form = container.querySelector('.blogForm')
  expect(form).toBeDefined()
})

test('calls createBlog with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  render(<BlogFrom createBlog={createBlog} />)
  const inputFields = screen.getAllByRole('textbox')
  const titleInput = inputFields[0]
  const authorInput = inputFields[1]
  const urlInput = inputFields[2]
  const sendButton = screen.getByText('create')

  await userEvent.type(titleInput, 'Test Title')
  await userEvent.type(authorInput, 'Test Author')
  await userEvent.type(urlInput, 'http://test.com')
  await userEvent.click(sendButton)

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://test.com')
})