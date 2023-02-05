<template>
  <span class="p-html">
    <PUnwrap :html="sanitizedHtml" />
  </span>
</template>

<script lang="ts" setup>
  import { default as dompurify } from 'dompurify'
  import { computed } from 'vue'
  import { PUnwrap } from '@/components/Unwrap'

  const props = defineProps<{
    html: string,
  }>()

  const forbiddenAttrs = ['style']
  const useProfiles = { svg: true, html: true }

  const sanitize = (text: string): string => {
    return dompurify.sanitize(
      text,
      {
        FORBID_ATTR: forbiddenAttrs,
        USE_PROFILES: useProfiles,
      },
    )
  }

  const sanitizedHtml = computed(() => {
    return sanitize(props.html)
  })
</script>