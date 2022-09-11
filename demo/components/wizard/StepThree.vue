<template>
  <div class="step-three">
    <CodeBlock language="js" :value="JSON.stringify(formData)" />
  </div>
</template>

<script lang="ts" setup>
  import CodeBlock from '../CodeBlock.vue'

  defineProps<{
    formData: {
      favoriteColor: string,
      agrees: true,
    },
  }>()
</script>

<style>
.step-three { @apply
  rounded
  overflow-hidden
}
</style>