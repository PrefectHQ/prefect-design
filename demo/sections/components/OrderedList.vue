<template>
  <ComponentPage title="OrderedList" :demos="demos">
    <template #no-slots>
      <POrderedList :items="items" />
    </template>

    <template #left-and-right>
      <POrderedList :items="items">
        <template #li-left="{ item }">
          <div>
            {{ item.date }}
          </div>
        </template>

        <template #li-right="{ item }">
          <div>
            {{ item.body }}
          </div>
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
      id: 1,
      icon: 'AcademicCapIcon',
      title: 'Graduated from the University of Michigan',
      date: '2019-05-01',
      body: 'I graduated from the University of Michigan with a degree in Computer Science and a minor in Mathematics.',
    },
    {
      id: 2,
      icon: 'BriefcaseIcon',
      title: 'Joined Prefect',
      date: '2019-05-01',
      body: 'I joined Prefect as a Software Engineer. I worked on the Prefect Core team, building out the Prefect Cloud and Prefect Server products.',
    },
    {
      id: 3,
      icon: 'BriefcaseIcon',
      title: 'Joined Shopify',
      date: '2020-05-01',
      body: 'I joined Shopify as a Software Engineer. I work on the Shopify Core team, building out the Shopify Core product.',
    },
  ]
</script>