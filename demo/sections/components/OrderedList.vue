<template>
  <ComponentPage title="OrderedList" :demos="demos">
    <template #no-slots>
      <POrderedList :items="itemsReversed" />
    </template>

    <template #left-and-right>
      <POrderedList :items="itemsReversed">
        <template #li-left="{ item }">
          <div v-if="item.date">
            {{ item.date }}
          </div>
        </template>

        <template #li-right="{ item }">
          <p-heading heading="6">
            {{ item.title }}
          </p-heading>
        </template>
      </POrderedList>
    </template>

    <template #one-side-description>
      <p-toggle v-model="sideToggleValue" class="p-theme-toggle">
        <template #prepend>
          Left
        </template>

        <template #append>
          Right
        </template>
      </p-toggle>
    </template>

    <template #one-side>
      <POrderedList :items="itemsReversed">
        <template #[side]="{ item }">
          <template v-if="sideToggleValue">
            <p-heading heading="6">
              {{ item.title }}
            </p-heading>
          </template>

          <template v-else>
            {{ item.date }}
          </template>
        </template>
      </POrderedList>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import POrderedList from '@/components/OrderedList/POrderedList.vue'
  import { OrderedListItem } from '@/types/orderedList'
  import { ref, computed } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    {
      title: 'No Slots',
      description: 'This is the default state of the component.',
    },
    {
      title: 'Left and Right',
      description: 'Add some data to both sides of the list item.',
    },
    {
      title: 'One side',
      description: 'Add some data to just one side of the list item.',
    },
  ]

  const side = ref<'li-left' | 'li-right'>('li-left')
  const sideToggleValue = computed({
    get() {
      return side.value === 'li-right'
    },
    set(value) {
      side.value = value ? 'li-right' : 'li-left'
    },
  })

  const items: OrderedListItem[] = [
    {
      id: crypto.randomUUID(),
      title: 'Borned',
      body: 'I was borned a long time ago.',
    },
    {
      id: crypto.randomUUID(),
      icon: 'AcademicCapIcon',
      title: 'Graduated from the University of Michigan',
      date: '2018-05-01',
      body: 'I graduated from the University of Michigan with a degree in Computer Science and a minor in Mathematics.',
    },
    {
      id: crypto.randomUUID(),
      icon: 'PrefectGradient',
      title: 'Joined Prefect',
      date: '2019-08-01',
      body: 'I joined Prefect as a Software Engineer. I worked on the Prefect Core team, building out the Prefect Cloud and Prefect Server products.',
    },
    {
      id: crypto.randomUUID(),
      title: 'Got a cat',
      date: '2020-03-12',
      body: 'Her name is Luna.',
    },
    {
      id: crypto.randomUUID(),
      icon: 'Slack',
      title: 'Joined Slack',
      date: '2022-12-15',
      body: 'I joined Slack as a Software Engineer. I work on the Slack Core team, building out the Slack product.',
    },
  ]

  const itemsReversed = [...items].reverse()
</script>

<style>
.ordered-list .p-toggle__control { @apply
  bg-sky-500
  border-sky-500
}
</style>