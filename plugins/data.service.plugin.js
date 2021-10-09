import Store from 'vuex'
import { DataService } from '~/services/data.service'

export default ({ _ }, inject) => {
  const dataService = new DataService(Store)
  inject('data_service', dataService)
}
