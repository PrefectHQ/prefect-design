<template>
  <div class="p-text-truncate">
    <span>
      {{ text }}
    </span>
    <span>
      {{ actionText }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, nextTick, withDefaults } from 'vue'
  const props = withDefaults(defineProps<{
    characterCount?: number,
    text: string,
    actionText?: string,
  }>(), {
    text: '',
    characterCount: 70,
    actionText: 'See more',
  })

  const characterCount = computed(() => props.characterCount)
  const text = computed(() => props.text)
  const expanded = ref(false)
</script>

<style>
.p-text-truncate {
  @apply inline-flex;
}
</style>