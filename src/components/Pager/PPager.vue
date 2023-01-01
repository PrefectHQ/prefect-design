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
      <p-button inset size="sm" :disabled="!showPrevious" @click="previous">
        <p-icon icon="ArrowSmLeftIcon" /> Previous
      </p-button>
      <p-button inset size="sm" :disabled="!showNext" @click="next">
        Next <p-icon icon="ArrowSmRightIcon" />
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
  text-foreground-200
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