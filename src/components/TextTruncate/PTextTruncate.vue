<template>
  <span class="p-text-truncate">
    {{ text }}
    <span v-if="!tooShort" class="p-text-truncate--action-text" @click="expanded = !expanded">
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
  import { computed, ref, withDefaults } from 'vue'

  const props = withDefaults(defineProps<{
    text: string,
    characterCount?: number,
    actionText?: string,
    collapseText?: string,
  }>(), {
    text: 'None',
    characterCount: () => 70,
    actionText: 'See More',
    collapseText: 'See Less',
  })

  const actionText = computed(() => props.actionText)
  const collapseText = computed(() => props.collapseText)
  const text = computed(() => {
    if (expanded.value || tooShort.value) {
      return props.text
    }
    return `${props.text.substring(0, props.characterCount).trim()}...`
  })
  const tooShort = computed(() => {
    return props.text.length <= props.characterCount
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