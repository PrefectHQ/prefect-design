<template>
  <Page heading="Tables">
    <SubSection heading="Basic">
      <p-table :data="data" />
    </SubSection>

    <SubSection heading="Using Columns">
      <p-table :data="data" :columns="columns">
        <template #action-heading>
          My Actions
        </template>
        <template #action>
          No Actions
        </template>
      </p-table>
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

    <SubSection heading="Empty State">
      <p-table :data="[]" :columns="columns">
        <template #empty-state>
          <p-empty-results>
            <template #actions>
              <p-button secondary size="sm">
                Show all
              </p-button>
            </template>
          </p-empty-results>
        </template>
      </p-table>
    </SubSection>
  </Page>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import Page from '../components/Page.vue'
  import SubSection from '../components/SubSection.vue'
  import PTable from '@/components/Table/PTable.vue'
  import PTableBody from '@/components/Table/PTableBody.vue'
  import PTableData from '@/components/Table/PTableData.vue'
  import PTableHead from '@/components/Table/PTableHead.vue'
  import PTableHeader from '@/components/Table/PTableHeader.vue'
  import { TableColumn } from '@/types/tables'
  import { media } from '@/utilities'

  const data = [
    {
      'id': 1,
      'first_name': 'Constantin',
      'last_name': 'Marskell',
      'email': 'cmarskell0@sitemeter.com',
      'ip_address': '138.221.182.143',
    }, {
      'id': 2,
      'first_name': 'Paten',
      'last_name': 'Tuting',
      'email': 'ptuting1@smugmug.com',
      'ip_address': '147.159.143.252',
    }, {
      'id': 3,
      'first_name': 'Tailor',
      'last_name': 'Rosendall',
      'email': 'trosendall2@vimeo.com',
      'ip_address': '122.26.204.87',
    }, {
      'id': 4,
      'first_name': 'Michelle',
      'last_name': 'Tomicki',
      'email': 'mtomicki3@hatena.ne.jp',
      'ip_address': '57.215.223.191',
    },
  ]

  const columns = computed<TableColumn<typeof data[number]>[]>(() => [
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
      visible: media.sm,
    },
    {
      label: 'Action',
      width: '100px',
    },
  ])
</script>