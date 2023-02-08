<template>
  <span :id="hash" class="p-hash-link" @click="goToRoute">
    <span class="p-hash-link__hash">
      #
    </span>
    <span class="p-hash-link__text">
      <slot />
    </span>
  </span>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const props = defineProps<{
    hash?: string,
  }>()

  const router = useRouter()

  function goToRoute(): void {
    const hash = props.hash ? `#${props.hash}` : undefined

    router.push({ hash })
  }
</script>

<style>
.p-hash-link { @apply
  cursor-pointer
}

.p-hash-link__hash { @apply
  opacity-0
  translate-x-2
  absolute
  text-prefect-600
  transition-all
}

.p-hash-link__text { @apply
  inline-block
  transition-transform
}

.p-hash-link:hover .p-hash-link__text { @apply
  translate-x-4
}

.p-hash-link:hover .p-hash-link__hash { @apply
  opacity-100
  translate-x-0
}
</style>