import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(({ children, label }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhen = (condition) => ({ display: condition ? 'none' : ''})
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div id="toggleable-container">
      <div style={hideWhen(visible)}>
        <button className="expand" onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={hideWhen(!visible)}>
        {children}
        <button className="hide" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired
}

export default Togglable