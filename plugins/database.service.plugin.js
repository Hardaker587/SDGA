import firebase from 'firebase'
import { DatabaseService } from '~/services/database.service'

export default ({ _ }, inject) => {
  const databaseService = new DatabaseService(firebase)
  inject('database_service', databaseService)
}
