<template>
  <router-link
    v-slot="{ href, navigate }"
    :to="to"
    custom
  >
    <a :href="href" @click="navigate">
      <template v-if="icon">
        <p-icon :icon="icon" class="p-global-nav-item__icon" />
      </template>
      <span>{{ title }}</span>
    </a>
  </router-link>
</template>

<script lang="ts" setup>
  import { Icon } from '@/types/icon'

  defineProps<{
    to: string,
    title?: string,
    icon?: Icon,
  }>()
</script>

<style>
.p-global-nav-item__icon {
  @apply
  w-6
  stroke-slate-400
  hover:stroke-white
  transition
  duration-200
  ease-linear
}
</style>