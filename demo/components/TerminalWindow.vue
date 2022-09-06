<template>
  <div class="terminal-window">
    <div class="terminal-window__top-bar">
      <div class="terminal-window__window">
        <div class="terminal-window__window-button" />
        <div class="terminal-window__window-button" />
        <div class="terminal-window__window-button" />
      </div>
      <p-button size="xs" inset class="terminal-window__copy-button" @click="copy">
        Copy
      </p-button>
    </div>
    <div class="terminal-window__code">
      {{ command }}<span class="terminal-window__cursor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
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
.terminal-window { @apply
  max-w-2xl
  bg-gray-800
  rounded
  w-full
}

.terminal-window__top-bar { @apply
  relative
  flex
  px-5
  py-4
  justify-between
  bg-white/25
}

.terminal-window__window { @apply
  flex
  gap-2
}

.terminal-window__window-button { @apply
  rounded-full
  h-3
  w-3
}

.terminal-window__window-button:nth-of-type(1) { @apply
  bg-[#FB4E4E]
}

.terminal-window__window-button:nth-of-type(2) { @apply
  bg-[#F6A609]
}

.terminal-window__window-button:nth-of-type(3) { @apply
  bg-[#2AC769]
}

.terminal-window__copy-button { @apply
  absolute
  top-2
  right-2
  opacity-50
  hover:opacity-100
}

.terminal-window__code { @apply
  text-gray-200
  px-5
  py-4
}

.terminal-window__cursor { @apply
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