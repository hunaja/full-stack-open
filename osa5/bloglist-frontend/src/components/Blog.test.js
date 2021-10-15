import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

const blog = {
  id: '1',
  title: 'Full Stack Test',
  url: 'https://google.fi',
  likes: 0,
  author: 'Anonymous',
  user: {
    id: '1',
    name: 'Me',
    username: 'awwry'
  }
}

describe('<Blog />', () => {
  let component
  const handleLike = jest.fn()

  beforeEach(() => {
    const userId = '-1'
    const handleRemove = jest.fn()
    const setVisible = jest.fn()

    component = render(
      <Blog handleLike={handleLike} handleRemove={handleRemove}
        blog={blog}
        visible={false} setVisible={setVisible}
        userId={userId} />
    )
  })

  test('by default, only renders the title and the author of the blog', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    const details = component.container.querySelector('.blog-details')
    expect(details).toHaveStyle('display: none')
  })

  test('when the like button is clicked twice, its handler is called twice', () => {
    const button = component.container.querySelector('.toggle-button')

    const clicksAtStart = handleLike.mock.calls.length
    fireEvent.click(button)
    fireEvent.click(button)
    const clicksAtEnd = handleLike.mock.calls.length
    
    expect(clicksAtEnd - clicksAtStart).toBe(2)
  })
})

