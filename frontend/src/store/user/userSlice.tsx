import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  user: {},
  errors: {},
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userFetched(state, action) {
      state.user = action.payload
    },
    setErrors(state, action) {
      state.errors = action.payload
    }
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const {userFetched, setErrors} = usersSlice.actions

// Export the slice reducer as the default export
export default usersSlice.reducer