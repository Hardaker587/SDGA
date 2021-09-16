import { DataService } from '~/services/data.service'

export default ({ _ }, inject) => {
  const dataService = new DataService()
  inject('data_service', dataService)
}
