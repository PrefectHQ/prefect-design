<template>
  <ComponentPage title="OrderedList">
    <template #description>
      <POrderedList :items="items">
        <template #left="{ item }">
          <div>
            {{ item.date }}
          </div>
        </template>

        <template #right="{ item }">
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
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const items = [
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