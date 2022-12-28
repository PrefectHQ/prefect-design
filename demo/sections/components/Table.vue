<template>
  <ComponentPage
    title="Tables"
    :demos="[
      { title: 'Basic' },
      { title: 'With Multiselect' },
      { title: 'Using Columns' },
      { title: 'Custom Slots' },
      { title: 'Empty States' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code>p-tables</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #basic>
      <p-table :data="data" />
    </template>

    <template #with-multiselect>
      <p-table v-model:selected="selectedRows" :data="data" />

      <p-code multiline class="mt-4">
        {{ selectedRows }}
      </p-code>
    </template>

    <template #using-columns>
      <p-table v-bind="{ data, columns, rowClasses, columnClasses }">
        <template #action-heading>
          My Actions
        </template>
        <template #action>
          No Actions
        </template>
      </p-table>
    </template>

    <template #custom-slots>
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
    </template>

    <template #empty-states>
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
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PTable from '@/components/Table/PTable.vue'
  import PTableBody from '@/components/Table/PTableBody.vue'
  import PTableData from '@/components/Table/PTableData.vue'
  import PTableHead from '@/components/Table/PTableHead.vue'
  import PTableHeader from '@/components/Table/PTableHeader.vue'
  import { ClassValue } from '@/types/attributes'
  import { TableColumn, TableData } from '@/types/tables'
  import { media } from '@/utilities'
  import { computed, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

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

  const selectedRows = ref<TableData[]>([])

  function rowClasses(row: TableData, index: number): ClassValue {
    return {
      'custom-row-class': row.id == 2,
      'custom-row-class--index': index === 3,
    }
  }

  function columnClasses(column: TableColumn, value: unknown, index: number): ClassValue {
    return {
      'custom-column-class': column.label === 'Last Name',
      'custom-column-class--index': index === 3,
    }
  }
</script>

<style>
.custom-row-class { @apply
  bg-slate-300
}

.custom-row-class--index { @apply
  bg-gray-100
}

.custom-column-class { @apply
  bg-gray-200
}

.custom-column-class--index { @apply
  bg-slate-300
}
</style>