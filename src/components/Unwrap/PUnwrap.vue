<template>
  <html v-unwrap="html" />
</template>

<script lang="ts" setup>
  import { DirectiveBinding } from 'vue'

  defineProps<{
    html: string,
  }>()

  const vUnwrap = {
    mounted(el: Element, binding: DirectiveBinding) {
      const frag = document.createRange().createContextualFragment(binding.value)
      el.replaceWith(frag)
    },
  }
</script>