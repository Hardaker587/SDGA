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
}
