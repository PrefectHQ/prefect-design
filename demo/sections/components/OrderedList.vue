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
  </ComponentPage>
</template>

<script lang="ts" setup>
  import POrderedList from '@/components/OrderedList/POrderedList.vue'
  import { OrderedListItem } from '@/types/orderedList'
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
  ]

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
      icon: 'BriefcaseIcon',
      title: 'Joined Prefect',
      date: '2019-08-01',
      body: 'I joined Prefect as a Software Engineer. I worked on the Prefect Core team, building out the Prefect Cloud and Prefect Server products.',
    },
    {
      id: crypto.randomUUID(),
      icon: 'BriefcaseIcon',
      title: 'Joined Shopify',
      date: '2022-12-15',
      body: 'I joined Shopify as a Software Engineer. I work on the Shopify Core team, building out the Shopify Core product.',
    },
  ]

  const itemsReversed = [...items].reverse()
</script>