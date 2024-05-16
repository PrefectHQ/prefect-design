<template>
  <div class="p-pager">
    <slot name="limit">
      <template v-if="limit">
        <div class="p-pager__limit">
          {{ limitText }} <p-select v-model="limit" small class="p-pager__limit-select" :options="limits" />
        </div>
      </template>
    </slot>

    <div class="p-pager__slot">
      <slot />
    </div>

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

      <p class="p-pager__context">
        Page
        <template v-if="pages">
          <span class="p-pager__page">{{ page }}</span> of <span class="p-pager__page">{{ pages }}</span>
        </template>
        <template v-else>
          <span class="p-pager__page">{{ page }}</span>
        </template>
      </p>
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
  const limit = defineModel<number>('limit')

  const limits = defineModel<number[]>('limits', { default: () => [5, 10, 25, 50] })
  const limitText = computed(() => 'Items per page')

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
  gap-2
  sm:flex-row
}

.p-pager__context { @apply
  text-xs
  text-subdued
}

.p-pager__buttons { @apply
  flex
  flex-wrap
  items-center
  gap-2
}

.p-pager__slot { @apply
  grow
}

.p-pager__limit { @apply
  text-xs
  text-subdued
  flex
  items-center
  gap-1
}
</style>