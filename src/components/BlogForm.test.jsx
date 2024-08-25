import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import BlogForm from './BlogForm'


test('<BlogForm /> the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()
  
    const {container} = render(<BlogForm createBlog={createBlog} />)
  
    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const sendButton = container.querySelector('#create')
  
    await user.type(title, 'testing in react')
    await user.type(author, 'ross geler')
    await user.type(url, 'reaact.com')
    await user.click(sendButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing in react')
    expect(createBlog.mock.calls[0][0].author).toBe('ross geler')
    expect(createBlog.mock.calls[0][0].url).toBe('reaact.com')
  })