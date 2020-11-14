import initialState from './state'

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, { user }) => {
    state.authUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phone: user.phoneNumber,
    }
  },
  LOG_OUT: (state) => {
    state.authUser = {
      uid: '',
      displayName: '',
      email: '',
      phoneNumber: '',
    }
  },
}
