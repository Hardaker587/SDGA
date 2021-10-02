import { ChartService } from '~/services/chart.service'

export default ({ _ }, inject) => {
  const chartService = new ChartService()
  inject('chart_service', chartService)
}
