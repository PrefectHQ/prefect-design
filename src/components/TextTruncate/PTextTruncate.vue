<template>
  <span class="p-text-truncate">
    {{ text }}
    <span class="p-text-truncate--action-text" @click="expanded = !expanded">
      {{ expanded ? collapseText : actionText }}
    </span>
  </span>
</template>

<script lang="ts">
  export default {
    name: 'PTextTruncate',
  }
</script>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  const props = defineProps<{
    text: string,
    characterCount?: number | null,
    actionText?: string | null,
    collapseText?: string | null,
  }>()

  const actionText = computed(() => props.actionText ?? 'See More')
  const collapseText = computed(() => props.collapseText ?? 'See Less')
  const text = computed(() => {
    let txt = props.text
    let cc = props.characterCount ?? 70
    // TODO : Create a checker for the character count being greater than the truncated amount
    if (expanded.value) {
      return txt
    }
    return `${txt.substring(0, cc)}...`
  })
  const expanded = ref(false)
</script>

<style>
.p-text-truncate {
  @apply inline;
}
.p-text-truncate--action-text {
  @apply cursor-pointer
  underline
  text-primary;
}
</style>