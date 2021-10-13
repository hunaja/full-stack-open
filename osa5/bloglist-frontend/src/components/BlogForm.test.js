import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const blog = {
  title: 'Full Stack Test',
  url: 'https://google.fi',
  author: 'Anonymous',
}

describe('<BlogFrom />', () => {
  test('handler is called with correct data on submit', () => {
    const addBlog = jest.fn()
    const component = render(<BlogForm addBlog={addBlog} />)

    const { container } = component

    const titleField = container.querySelector('#title-field')
    const urlField = container.querySelector('#url-field')
    const authorField = container.querySelector('#author-field')
    const submitButton = container.querySelector('#submit-new-blog-form')

    fireEvent.change(titleField, { target: { value: blog.title }})
    fireEvent.change(urlField, { target: { value: blog.url }})
    fireEvent.change(authorField, { target: { value: blog.author }})

    fireEvent.click(submitButton)

    expect(addBlog.mock.calls[0][0]).toStrictEqual(blog)
  })
})