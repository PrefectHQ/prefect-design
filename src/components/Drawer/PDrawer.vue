<template>
  <slot name="activator" v-bind="{ show, hide, toggle }">
    <p-button icon="Bars3Icon" @click="toggle" />
  </slot>

  <teleport to="body">
    <aside class="p-drawer">
      <slot v-bind="{ show, hide, toggle }" />
    </aside>
  </teleport>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const visible = ref(false)

  const hide = (): void => {
    visible.value = false
  }

  const toggle = (): void => {
    visible.value = !visible.value
  }

  const show = (): void => {
    visible.value = true
  }
</script>

<style>
.p-drawer { @apply
  h-full
  fixed
  top-0
  left-0
  z-50
}
</style>