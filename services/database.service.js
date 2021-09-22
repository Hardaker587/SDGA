import firebase from 'firebase'

export class DatabaseService {
  constructor(firebase) {
    this.firebase = firebase.database.Database
  }

  async fetchData(reference) {
    console.log(firebase)
    const config = this.firebase.ref(reference)
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
