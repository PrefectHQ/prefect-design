<template>
  <div class="p-pager">
    <p class="p-pager__context">
      <template v-if="pages">
        Showing page <span class="p-pager__page">{{ page }}</span> of <span class="p-pager__page">{{ pages }}</span>
      </template>
      <template v-else>
        Page <span class="p-pager__page">{{ page }}</span>
      </template>
    </p>
    <div class="p-pager__buttons">
      <p-button
        v-if="pages"
        icon="ChevronDoubleLeftIcon"
        :disabled="disableFirst"
        size="sm"
        variant="ghost"
        @click="first"
      />

      <p-button icon="ChevronLeftIcon" :disabled="disablePrevious" size="sm" variant="ghost" @click="previous" />
      <p-button icon="ChevronRightIcon" :disabled="disableNext" size="sm" variant="ghost" @click="next" />

      <p-button
        v-if="pages"
        icon="ChevronDoubleRightIcon"
        :disabled="disableLast"
        size="sm"
        variant="ghost"
        @click="last"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const page = defineModel<number>('page', { required: true })
  const pages = defineModel<number>('pages')

  const disableFirst = computed(() => page.value === 1)
  const disableLast = computed(() => page.value === (pages.value ?? Infinity))
  const disableNext = computed(() => page.value >= (pages.value ?? Infinity))
  const disablePrevious = computed(() => page.value <= 1)

  function previous(): void {
    --page.value
  }

  function next(): void {
    ++page.value
  }

  function first(): void {
    page.value = 1
  }

  function last(): void {
    page.value = pages.value ?? 1
  }
</script>

<style>
.p-pager { @apply
  flex
  flex-col
  flex-wrap
  items-center
  justify-between
  gap-2
  sm:flex-row
}

.p-pager__context { @apply
  text-sm
  text-subdued
}

.p-pager__page { @apply
  font-medium
}

.p-pager__buttons { @apply
  flex
  flex-wrap
  items-center
  gap-2
}
</style>