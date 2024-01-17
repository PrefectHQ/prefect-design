<template>
  <html v-unwrap="html" />
</template>

<script lang="ts" setup>
  import { DirectiveBinding, ref } from 'vue'

  defineProps<{
    html: string | HTMLElement | DocumentFragment,
  }>()

  const parentElement = ref()

  const vUnwrap = {
    mounted(el: Element, binding: DirectiveBinding) {
      const frag = document.createRange().createContextualFragment(binding.value)
      parentElement.value = el.parentElement
      parentElement.value.replaceChildren(frag)
    },
    updated(el: Element, binding: DirectiveBinding) {
      const frag = document.createRange().createContextualFragment(binding.value)
      parentElement.value.replaceChildren(frag)
    },
  }
</script>