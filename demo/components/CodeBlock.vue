<template>
  <div class="code-block p-background">
    <pre>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <code multiline v-html="highlighted" />
  </pre>
    <template v-if="showCopy">
      <p-button inset size="sm" class="code-block__copy-button" @click="copy">
        Copy
      </p-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { showToast } from '@/plugins'
  import { highlight, languages } from 'prismjs'
  import { computed } from 'vue'

  const props = defineProps<{
    value?: string,
    showCopy?: boolean,
    language: string,
  }>()

  const highlighted = computed(() => {
    return highlight(props.value ?? '', languages[props.language], props.language).trim()
  })

  async function copy(): Promise<void> {
    await navigator.clipboard.writeText(props.value ?? '')

    showToast('Copied!', 'success')
  }
</script>

<style>
.code-block {
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;

  @apply
  relative
  font-mono
  whitespace-pre
  break-normal
  text-left
  p-2
  text-slate-50
  bg-slate-700
}

.code-block__copy-button { @apply
  absolute
  top-2
  right-2
  opacity-50
  hover:opacity-100
}
</style>
