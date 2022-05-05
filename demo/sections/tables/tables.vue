TableNativeColumn<template>
  <Section heading="Tables">
    <SubSection heading="Basic">
      <p-table :data="data" />
    </SubSection>

    <SubSection heading="Using Columns">
      <p-table :data="data" :columns="columns" />
    </SubSection>

    <SubSection heading="Custom">
      <p-table :data="data" :columns="columns">
        <p-table-head>
          <template #row>
            <p-table-header>Name</p-table-header>
            <p-table-header class="hidden lg:table-cell">
              IP Address
            </p-table-header>
            <p-table-header class="hidden sm:table-cell">
              Email
            </p-table-header>
          </template>
        </p-table-head>
        <p-table-body :data="data">
          <template #row="{ row }">
            <p-table-data>
              {{ row.first_name }} {{ row.last_name }}
              <dl class="lg:hidden">
                <dt>{{ row.ip_address }}</dt>
                <dt class="sm:hidden">
                  {{ row.email }}
                </dt>
              </dl>
            </p-table-data>
            <p-table-data class="hidden lg:table-cell">
              {{ row.ip_address }}
            </p-table-data>
            <p-table-data class="hidden sm:table-cell">
              {{ row.email }}
            </p-table-data>
          </template>
        </p-table-body>
      </p-table>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../../components/section.vue'
  import SubSection from '../../components/subSection.vue'
  import data from './data.json'
  import PTable from '@/components/Table/PTable.vue'
  import PTableBody from '@/components/Table/PTableBody.vue'
  import PTableData from '@/components/Table/PTableData.vue'
  import PTableHead from '@/components/Table/PTableHead.vue'
  import PTableHeader from '@/components/Table/PTableHeader.vue'
  import { TableColumn } from '@/types/tables'

  const columns: TableColumn<typeof data[number]>[] = [
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