<template>
  <ComponentPage
    title="List Items"
    :demos="demos"
  >
    <template #plain>
      <div class="grid gap-2">
        <template v-for="i in 3" :key="i">
          <p-list-item>
            List Item {{ i }}
          </p-list-item>
        </template>
      </div>
    </template>

    <template #checkable>
      <div class="grid gap-2">
        <template v-for="i in 3" :key="i">
          <p-list-item-input v-model:selected="selected" :value="i">
            List Item {{ i }}
          </p-list-item-input>
        </template>
      </div>

      <div class="mt-2">
        {{ selected }}
      </div>
    </template>

    <template #draggable>
      Order: {{ draggableItems }}
      <p-draggable-list v-model="draggableItems">
        <template #default="{ item }">
          {{ item }}
        </template>
      </p-draggable-list>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PDraggableList from '@/components/DraggableList/PDraggableList.vue'
  import PListItem from '@/components/ListItem/PListItem.vue'
  import PListItemInput from '@/components/ListItemInput/PListItemInput.vue'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = ref([
    { title: 'Plain' },
    { title: 'Checkable' },
    { title: 'Draggable' },
  ])

  const selected = ref([1])

  const draggableItems = ref([
    'Apple',
    'Banana',
    'Dragonfruit',
    'Guava',
    'Orange',
    'Passionfruit',
    'Pomegranate',
    'Starfruit',
  ])
</script>