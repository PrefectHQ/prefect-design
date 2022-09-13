<template>
  <PWindow class="p-terminal">
    <template #actions>
      <PButton size="xs" inset class="p-terminal__copy-button" @click="copy">
        Copy
      </PButton>
    </template>

    <div class="p-terminal__code">
      {{ command }}<span class="p-terminal__cursor" />
    </div>
  </PWindow>
</template>

<script lang="ts" setup>
  import PButton from '@/components/Button/PButton.vue'
  import PWindow from '@/components/Window/PWindow.vue'
  import { showToast } from '@/plugins'

  const props = defineProps<{
    command: string,
  }>()

  async function copy(): Promise<void> {
    await navigator.clipboard.writeText(props.command)

    showToast('Copied!', 'success')
  }
</script>

<style>
.p-terminal__copy-button { @apply
  opacity-50
  hover:opacity-100
}

.p-terminal__code { @apply
  px-5
  py-4
}

.p-terminal__cursor { @apply
  ml-1
  -mb-1
  bg-gray-400
  inline-block;
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