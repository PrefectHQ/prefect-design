TableNativeColumn<template>
  <section :class="classWithBase('p-table')">
    <header :class="classWithBase('p-table__header')">
      <slot name="header">
        <template v-for="column in columns" :key="column">
          <div :class="[classWithBase('p-table__heading'), classWithBase(`p-table__heading--${kebabCase(column)}`)]">
            <slot :name="`${kebabCase(column)}-heading`" v-bind="{ column }">
              <span>{{ column }}</span>
            </slot>
          </div>
        </template>
      </slot>
    </header>
    <main :class="classWithBase('p-table__body')">
      <template v-for="(row, index) in data" :key="index">
        <div :class="classWithBase('p-table__row')">
          <template v-for="column in columns" :key="column">
            <div :class="[classWithBase('p-table__column'), classWithBase(`p-table__column--${kebabCase(column)}`)]">
              <slot :name="kebabCase(column)" v-bind="{ column, row }" />
            </div>
          </template>
        </div>
      </template>
    </main>
    <template v-if="slots.footer">
      <footer>
        <slot name="footer" />
      </footer>
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    data: Record<string, unknown>[],
    columns: string[],
    baseClass?: string,
  }>()

  const slots = useSlots()

  function classWithBase(value: string): string | string[] {
    if (props.baseClass === undefined) {
      return value
    }

    return [value, value.replace('p-table', props.baseClass)]
  }
</script>

<style>
.p-table { @apply
  overflow-hidden
  shadow
  ring-1
  ring-black
  ring-opacity-5
  md:rounded-lg
  min-w-full
  divide-y
  divide-gray-300
}

.p-table__header { @apply
  bg-gray-50
  grid
}

.p-table__heading { @apply
  px-3
  py-3.5
  text-sm
  font-semibold
  text-gray-900
  whitespace-nowrap
}

.p-table__body { @apply
  divide-y
  divide-gray-200
  bg-white
}

.p-table__row { @apply
  grid
}

.p-table__column { @apply
  whitespace-nowrap
  px-3
  py-4
  text-sm
  text-gray-500
}
</style>