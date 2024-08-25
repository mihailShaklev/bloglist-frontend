import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import Blog from './Blog'


describe('<Blog/>', () =>{
    let container

    const blog = {
        title: 'testing with react-testing-library',
        author: 'Mixxo Mixxov',
        url:'www.blog.com',
        likes: 3,
        user:{name:'mixxo', username:'mixxo'}
      }

    beforeEach(() =>{
        container = render(
            <Blog blog={blog}/>
          ).container
    })

    test('at start blog title and author are displayed', () => {
        const blog = container.querySelector('.blog')

        expect(blog).not.toHaveStyle('display: none')
        expect(blog).toHaveTextContent('testing with react-testing-library Mixxo Mixxov')
    })

    test('at start the blog details are not displayed', () => {
        const blogDetails = container.querySelector('.blog-details')
        expect(blogDetails).toHaveStyle('display: none')
    })

    test('after clicking the button, details are displayed', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('view')
        await user.click(showButton)
    
        const blogDetails = container.querySelector('.blog-details')
        expect(blogDetails).not.toHaveStyle('display: none')
    })

    test('if like button is clicked twice the event handler is called twice', async () => {

        const mockHandler = vi.fn()
        const {container} = render(<Blog blog={blog} updateBlog={mockHandler} />)

        const user = userEvent.setup()
        const button = container.querySelector('#like-button')
        await user.click(button)
        await user.click(button)
  
        expect(mockHandler.mock.calls).toHaveLength(2)
    })


})