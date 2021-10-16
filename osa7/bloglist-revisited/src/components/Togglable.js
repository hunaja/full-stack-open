import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef(({ children, label }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhen = (condition) => ({ display: condition ? 'none' : ''})
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div>
      <div style={hideWhen(visible)}>
        <Button variant="secondary" onClick={toggleVisibility}>{label}</Button>
      </div>
      <div style={hideWhen(!visible)}>
        {children}
        <Button variant="danger" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired
}

export default Togglable