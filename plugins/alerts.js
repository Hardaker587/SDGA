export default ({ app, store }, inject) => {
  inject('alerts', {
    showMessage({ content = '', color = '' }) {
      store.commit('alerts/showMessage', { content, color })
    },
  })
}
