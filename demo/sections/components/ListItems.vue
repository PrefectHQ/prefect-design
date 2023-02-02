<template>
  <ComponentPage
    title="List Items"
    :demos="[
      { title: 'Plain' },
      { title: 'Checkable' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code inline>
        p-list-items
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

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
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PListItem from '@/components/ListItem/PListItem.vue'
  import PListItemInput from '@/components/ListItemInput/PListItemInput.vue'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const selected = ref([1])
</script>