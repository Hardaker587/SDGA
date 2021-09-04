import Vue from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

Vue.use(Chart)
