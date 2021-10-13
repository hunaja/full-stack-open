const initialState = ''

const reducer = (state = initialState, action) => {
  if (!action) return state

  switch (action.type) {
    case 'SET_FILTER':
      return action.data.value
    default:
      return state
  }
}

export const setFilter = (value) => ({
  type: 'SET_FILTER',
  data: { value }
})

export default reducer