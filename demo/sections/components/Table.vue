<template>
  <ComponentPage
    title="Tables"
    :demos="[
      { title: 'Basic' },
      { title: 'In a card' },
      { title: 'With Multiselect' },
      { title: 'Using Columns' },
      { title: 'Custom Slots' },
      { title: 'Empty States' },
    ]"
  >
    <template #basic>
      <p-table :data="data" />
    </template>

    <template #in-a-card>
      <p-card>
        <p-table :data="data">
          <template #footer>
            <PTableRow>
              <PTableData class="text-center" colspan="5">
                Footer
              </PTableData>
            </PTableRow>
          </template>
        </p-table>
      </p-card>
    </template>

    <template #with-multiselect>
      <p-table v-model:selected="selectedRows" :data="data" />

      <p-code class="mt-4">
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
      <p-table :data="emptyDate" :columns="columns">
        <template #empty-state>
          <p-empty-results>
            <template #actions>
              <p-button small>
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
  ] satisfies TableData

  type Data = (typeof data)[number]

  const emptyDate: Data[] = []

  const columns = computed<TableColumn<Data>[]>(() => [
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

  const selectedRows = ref<Data[]>([])

  function rowClasses(row: Data, index: number): ClassValue {
    return {
      'custom-row-class': row.id == 2,
      'custom-row-class--index': index === 3,
    }
  }

  function columnClasses(column: TableColumn<Data>, value: unknown, index: number): ClassValue {
    return {
      'custom-column-class': column.label === 'Last Name',
      'custom-column-class--index': index === 3,
    }
  }
</script>

<style>
.custom-row-class { @apply
  bg-rose-400
  dark:bg-rose-900
}

.custom-row-class--index { @apply
  bg-teal-200
  dark:bg-teal-900
}

.custom-column-class { @apply
  bg-emerald-200
  dark:bg-emerald-900
}

.custom-column-class--index { @apply
  bg-amber-200
  dark:bg-amber-900
}
</style>