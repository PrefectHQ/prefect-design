<template>
  <PWindow class="p-terminal">
    <template #actions>
      <p-button small flat class="p-terminal__copy-button" icon="ClipboardDocumentIcon" @click="copy" />
    </template>
    <div class="p-terminal__code">
      <template v-for="(line, index) in commands" :key="index">
        <p class="p-terminal__code-line">
          {{ line }}
          <span class="p-terminal__cursor" />
        </p>
      </template>
    </div>
  </PWindow>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PWindow from '@/components/Window/PWindow.vue'
  import { showToast } from '@/plugins'
  import { asArray } from '@/utilities'

  const props = defineProps<{
    command: string | string[],
  }>()

  const commands = computed(() => asArray(props.command))

  async function copy(): Promise<void> {
    const copyText = commands.value.join(' && ')
    await navigator.clipboard.writeText(copyText)

    showToast('Copied!', 'success')
  }
</script>

<style>
.p-terminal__code { @apply
  px-4
  py-2
}

.p-terminal__code-line { @apply
  py-1
}

.p-terminal__code-line:not(:last-of-type) .p-terminal__cursor { @apply
  hidden
}

.p-terminal__cursor { @apply
  ml-1
  -mb-1
  inline-block;
  background-color: var(--p-color-text-subdued);
  content: "";
  width: 7px;
  height: 18px;
  animation: blink 1.2s steps(2) infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
}
</style>