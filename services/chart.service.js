import Chart from 'chart.js/auto'
import chartType from '~/enums/chartType.enum'
export class ChartService {
  constructor() {
    this.chart = Chart
    this.chart_type = chartType
  }

  // Generic methods
  /**
   * Generates a random number
   * @param number
   * @returns {number}
   */
  random(number) {
    return Math.floor(Math.random() * number)
  }

  /**
   * @param {float} [opacity] opacity to return the color
   * @returns {{a: (*|number), r: number, b: number, g: number}}
   */
  randomColor(opacity) {
    return {
      r: this.random(255),
      g: this.random(255),
      b: this.random(255),
      a: opacity || 1,
    }
  }

  /**
   * Generate the chart based on specific parameters
   * @param {array} datasets - datasets used for chart, will have conditions
   * @param {chart_type} chart_type - Type of chart needed for the generator
   * @param {string} element - valid element selector
   * @param {object} options - any valid options for your chart type
   */
  generateChart(datasets, chart_type, chart_options, element) {
    let config = {}
    let data = {}
    let options = {}
    switch (chart_type) {
      case this.chart_type.LINE:
        config = this.line(datasets, chart_options).config
        data = this.line(datasets, chart_options).data
        options = this.line(datasets, chart_options).options
        break
      case this.chart_type.BAR:
        config = this.bar(datasets, chart_options).config
        data = this.bar(datasets, chart_options).data
        options = this.bar(datasets, chart_options).options
        break
      case this.chart_type.RADAR:
        config = this.radar(datasets, chart_options).config
        data = this.radar(datasets, chart_options).data
        options = this.radar(datasets, chart_options).options
        break
      case this.chart_type.DOUGHNUT:
        config = this.doughnut(datasets, chart_options).config
        data = this.doughnut(datasets, chart_options).data
        options = this.doughnut(datasets, chart_options).options
        break
      case this.chart_type.PIE:
        config = this.pie(datasets, chart_options).config
        data = this.pie(datasets, chart_options).data
        options = this.pie(datasets, chart_options).options
        break
      case this.chart_type.POLAR:
        config = this.polar(datasets, chart_options).config
        data = this.polar(datasets, chart_options).data
        options = this.polar(datasets, chart_options).options
        break
    }
    return new Chart(document.querySelector(element), {
      ...config,
      data,
      options,
    })
  }

  /**
   * Generates config for line chart
   * @param {array} datasets - datasets used for chart, will have conditions
   * @param {object} options - any valid options for your chart type
   */
  line(datasets, options) {
    const config = {
      type: 'line',
    }
    const data = {
      datasets: [
        {
          label: 'My First Dataset',
          data: datasets,
          fill: true,
          borderColor: this.randomColor(),
          tension: 0.1,
        },
      ],
    }
    console.log({ config, data, options })
    return { config, data, options }
  }
  /**
   * Generates config for bar chart
   * @param {array} datasets - datasets used for chart, will have conditions
   * @param {object} options - any valid options for your chart type
   */

  bar(datasets, options) {
    const config = {
      type: 'bar',
    }
    const data = {
      datasets: [
        {
          label: 'My First Dataset',
          data: datasets,
          fill: true,
          borderColor: this.randomColor(),
          tension: 0.1,
        },
      ],
    }
    console.log({ config, data, options })
    return { config, data, options }
  }

  /**
   * Generates config radar line chart
   * @param {array} datasets - datasets used for chart, will have conditions
   * @param {object} options - any valid options for your chart type
   */
  radar(datasets, options) {}

  /**
   * Generates config for doughnut chart
   * @param {array} datasets - datasets used for chart, will have conditions
   * @param {object} options - any valid options for your chart type
   */
  doughnut(datasets, options) {}

  /**
   * Generates config for pie chart
   * @param {array} datasets - datasets used for chart, will have conditions
   * @param {object} options - any valid options for your chart type
   */
  pie(datasets, options) {}

  /**
   * Generates config for polar area chart
   * @param {array} datasets - datasets used for chart, will have conditions
   * @param {object} options - any valid options for your chart type
   */
  polar(datasets, options) {}
}
