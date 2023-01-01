<template>
  <PWindow class="p-code-file">
    <template #actions>
      <p class="p-code-file__file-name">
        {{ fileName }}
      </p>
      <PButton size="xs" inset class="p-code-file__copy-button" @click="copy">
        <span class="p-code-file__copy-text">Copy</span>
        <p-icon icon="DuplicateIcon" />
      </PButton>
    </template>

    <div class="p-code-file__code">
      <code><pre class="p-code-file__code-line"><span v-for="(line, index) in code" :key="index">{{ line }}</span></pre></code>
    </div>
  </PWindow>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PWindow from '@/components/Window/PWindow.vue'
  import { showToast } from '@/plugins'

  const props = defineProps<{
    code: string,
    fileName?: string,
  }>()

  const fileName = computed(() => props.fileName ?? '')

  const code = computed(() => props.code.split('\n'))

  async function copy(): Promise<void> {
    await navigator.clipboard.writeText(props.code)

    showToast('Copied!', 'success')
  }
</script>

<style>
.p-code-file__copy-button { @apply
  opacity-50
  hover:opacity-100
}

.p-code-file__copy-text { @apply
  font-medium
}

.p-code-file__code { @apply
  pb-2
}

.p-code-file__code-line span {
  @apply
  block
  w-full
  h-5;
}

.p-code-file__code-line span:before {
  counter-increment: line;
  content: counter(line);
  @apply
  inline-block
  border-r-[1px]
  border-slate-200
  px-3
  mr-5
  text-slate-400;
}

.p-code-file__code-line {
  counter-reset: line;
  @apply
  py-1
}

.p-code-file__code-line:not(:last-of-type) .p-code-file__cursor { @apply
  hidden
}

.p-code-file__file-name { @apply
  absolute
  top-1/2
  left-1/2
  transform
  -translate-x-1/2
  -translate-y-1/2
  text-slate-400
}
</style>