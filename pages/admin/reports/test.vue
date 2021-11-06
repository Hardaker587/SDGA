<template>
  <GoalsTreeView
    class="text-body-2"
    :goals="getGoals"
    :goal-categories="getGoalCategories"
    :questions="getQuestions"
    display-goal-categories
    display-questions
  />
</template>

<script>
import GoalsTreeView from '../../../components/admin/Reports/GoalsTreeView'
import { dataMixin } from '../../../mixins/data.mixin'
export default {
  name: 'test',
  components: { GoalsTreeView },
  mixins: [dataMixin],
}
</script>

<style lang="scss" scoped>
::v-deep .v-treeview-node__label {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre-wrap;
}

::v-deep .v-treeview-node[aria-expanded='true'] {
  font-weight: 900;
  .v-treeview-node__children {
    font-weight: normal;
  }
}
</style>
