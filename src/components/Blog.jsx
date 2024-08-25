import { useState, useEffect } from "react"

const Blog = ({user, blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)

  useEffect(() =>{
    
    if(user && (user.username === blog.user.username)){
      setDeleteButton(true)
    }
  },[])

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showDeleteButton = {display: deleteButton ? '' : 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const changeBlog = () => {

    const changedBlog = { ...blog, likes: (blog.likes + 1) }
    updateBlog(changedBlog.id, changedBlog)

  }

  const removeBlog = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    deleteBlog(blog.id)
  }

  return (

    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blog' data-testid='blog'>
        {blog.title} {blog.author} <button id="view-button" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blog-details'>
        <ul>
          <li>{blog.title} {blog.author} <button id="hide-button" onClick={toggleVisibility}>hide</button></li>
          <li>"{blog.url}"</li>
          <li>likes <span data-testid="likes">{blog.likes}</span> <button id="like-button" onClick={changeBlog}>like</button></li>
          <li>{blog.user.name}</li>
        </ul>
        <button id="remove-button" style={showDeleteButton} onClick={removeBlog}>remove</button>
      </div>
  </div>
)}

export default Blog