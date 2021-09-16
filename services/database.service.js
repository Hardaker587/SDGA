export class DatabaseService {
  constructor(firebase) {
    this.firebase = firebase
  }

  async fetchData(reference, callback) {
    const config = this.firebase.database.ref(reference)
    try {
      await config.once('value', (r) => {
        return r.val()
      })
    } catch (e) {
      console.error(e)
      return false
    }
  }
}
