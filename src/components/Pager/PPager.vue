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
      <p-button small icon="ChevronLeftIcon" :disabled="!showPrevious" @click="previous">
        Previous
      </p-button>
      <p-button small icon-append="ChevronRightIcon" :disabled="!showNext" @click="next">
        Next
      </p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    page: number,
    pages?: number,
  }>()

  const emit = defineEmits<{
    (event: 'update:page', value: number): void,
  }>()

  const showPrevious = computed(() => props.page > 1)
  const showNext = computed(() => props.page < (props.pages ?? Infinity))

  function previous(): void {
    emit('update:page', props.page - 1)
  }

  function next(): void {
    emit('update:page', props.page + 1)
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