<template>
  <div class="p-pager">
    <p class="p-pager__context">
      Showing page <span class="p-pager__page">{{ page }}</span> of <span class="p-pager__page">{{ pages }}</span>
    </p>
    <div class="p-pager__buttons">
      <p-button inset size="sm" :disabled="!showPrevious" @click="emit('previous')">
        <p-icon icon="ArrowSmLeftIcon" /> Previous
      </p-button>
      <p-button inset size="sm" :disabled="!showNext" @click="emit('next')">
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
    (event: 'next' | 'previous'): void,
  }>()

  const showPrevious = computed(() => props.page > 1)
  const showNext = computed(() => props.page < (props.pages ?? Infinity))
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
  text-gray-700
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