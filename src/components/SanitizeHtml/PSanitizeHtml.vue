<template>
  <span class="p-sanitize-html">
    <PUnwrap :html="sanitizedHtml" />
  </span>
</template>

<script lang="ts" setup>
  import { default as dompurify } from 'dompurify'
  import { computed } from 'vue'
  import { PUnwrap } from '@/components/Unwrap'

  const props = defineProps<{
    html: string | HTMLElement | DocumentFragment,
    config?: dompurify.Config,
  }>()

  const defaultConfig: dompurify.Config = {
    FORBID_TAGS: ['script', 'style', 'iframe', 'form'],
    FORBID_ATTR: ['style', 'action', 'method', 'onclick', 'onmouseover', 'onload', 'data', 'onmousedown', 'onmouseup'],
    USE_PROFILES: { svg: true, html: true },
  }

  const sanitize = (text: string | HTMLElement | DocumentFragment): string | HTMLElement | DocumentFragment => {
    return dompurify.sanitize(
      text,
      props.config ?? defaultConfig,
    )
  }

  const sanitizedHtml = computed(() => {
    return sanitize(props.html)
  })
</script>