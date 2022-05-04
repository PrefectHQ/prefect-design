TableNativeColumn<template>
  <Section heading="Tables">
    <SubSection heading="Native">
      <p-native-table :data="data" />
    </SubSection>
    <SubSection heading="Native - columns">
      <p-native-table :data="data" :columns="columns" />
    </SubSection>
    <SubSection heading="Custom">
      <p-table :data="data" :columns="['Id', 'Personal Information']" base-class="custom-table">
        <template #id="{ row }">
          <p>{{ row.id }}</p>
        </template>
        <template #personal-information="{ row }">
          <p>{{ row.first_name }}</p>
          <p>{{ row.last_name }}</p>
          <p>{{ row.email }}</p>
        </template>
      </p-table>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../../components/section.vue'
  import SubSection from '../../components/subSection.vue'
  import data from './data.json'
  import PNativeTable from '@/components/Table/PNativeTable.vue'
  import PTable from '@/components/Table/PTable.vue'
  import { TableNativeColumn } from '@/types/tables'

  const columns: TableNativeColumn<typeof data[number]>[] = [
    {
      property: 'first_name',
      label: 'First Name',
      width: '120px',
    },
    {
      property: 'last_name',
      label: 'Last Name',
      width: '120px',
    },
    {
      property: 'email',
      label: 'Email',
    },
  ]
</script>

<style>
.custom-table__header,
.custom-table__row {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
}

.custom-table__heading--personal-information,
.custom-table__column--personal-information {
  text-align: right;
}
</style>