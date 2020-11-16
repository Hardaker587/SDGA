export default {
  isLoggedIn: (state) => {
    try {
      return state.authUser.uid !== ''
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
      return false
    }
  },
  isAdmin: (state) => {
    try {
      return state.admin
    } catch (e) {
      // eslint-disable-next-line
      console.warn(e)
    }
  },
}
