import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef(({ children, label }, ref) => {
  const [visible, setVisible] = useState('false')

  const hideWhen = (condition) => ({ display: condition ? 'none' : ''})
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div>
      <div style={hideWhen(visible)}>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={hideWhen(!visible)}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable