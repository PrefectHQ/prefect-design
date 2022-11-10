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
  import { computed, ref } from 'vue'
  const props = defineProps<{
    text: string,
    characterCount?: number | null,
    actionText?: string | null,
  }>()

  const characterCount = computed(() => props.characterCount ?? 70)
  const actionText = computed(() => props.actionText ?? 'See More')
  const text = computed(() => props.text)
  const expanded = ref(false)
</script>

<style>
.p-text-truncate {
  @apply inline-flex;
}
</style>