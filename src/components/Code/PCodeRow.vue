<template>
  <div class="code-row">
    <div v-if="$slots.leading" class="code-row__leading">
      <slot name="leading" />
    </div>

    <div class="code-row__content">
      <slot />
    </div>

    <div v-if="$slots.trailing" class="code-row__trailing">
      <slot name="trailing" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'PCodeRow',
    expose: [],
  })
</script>

<style>
.code-row {
  @apply flex w-full;
}

.code-row__leading {
  @apply select-none;
}

.code-row__content {
  @apply flex-grow select-auto whitespace-pre-wrap;
}

.code-row__trailing {
  @apply text-xs text-slate-500 leading-6;
}
</style>