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
      <p-content>
        <div class="text-subdued text-sm">
          <ul class="list-disc list-inside">
            <li>↑↓: Select previous/next item</li>
            <li>⇧ + ↑↓: Select first/last item</li>
            <li>⌥ + ↑: Move item up</li>
            <li>⌥ + ↓: Move item down</li>
            <li>⌥ + ⇧ + ↑: Move item to top</li>
            <li>⌥ + ⇧ + ↓: Move item to bottom</li>
            <li>⌫: Delete item</li>
          </ul>
        </div>

        {{ draggableItems }}
        <br>
        <p-draggable-list v-model="draggableItems" allow-create allow-delete :generator="addNewFruit">
          <template #default="{ index }">
            <p-text-input v-model="draggableItems[index]" placeholder="Fruit" />
          </template>
        </p-draggable-list>
      </p-content>
    </template>

    <template #custom-draggable>
      <p-draggable-list v-model="customDraggableItems">
        <template #item="{ item, index, handleDown, handleUp, moveUp, moveDown, moveToTop, moveToBottom }">
          <p-list-item class="flex items-stretch w-full gap-2">
            <div class="cursor-grab" @mousedown="handleDown" @mouseup="handleUp">
              <p-icon icon="Bars2Icon" />
            </div>

            <div class="w-full flex-col gap-1">
              <p-text-input v-model="customDraggableItems[index]" placeholder="Color" />
              <img :src="`https://placehold.co/100x50/${item}/white`" alt="Placeholder">
            </div>


            <div class="flex flex-col">
              <p-button icon="ChevronDoubleUpIcon" flat small @click="moveToTop" />
              <p-button icon="ChevronUpIcon" flat small @click="moveUp" />
              <p-button icon="ChevronDownIcon" flat small @click="moveDown" />
              <p-button icon="ChevronDoubleDownIcon" flat small @click="moveToBottom" />
            </div>
          </p-list-item>
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
    { title: 'Custom Draggable' },
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

  const customDraggableItems = ref([
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
  ])

  const addNewFruit = (): string => {
    return ''
  }
</script>