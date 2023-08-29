<template>
  <component :is="component" :id="kebabHash" class="p-hash-link" @click="goToRoute">
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { kebabCase } from '@/utilities'

  const props = defineProps<{
    depth?: number,
    hash?: string,
  }>()

  const router = useRouter()

  const kebabHash = computed(() => {
    return kebabCase(props.hash ?? '')
  })

  function goToRoute(): void {
    const hash = props.hash ? `#${kebabHash.value}` : undefined

    router.push({ hash })
  }

  const component = computed(() => {
    if (props.depth) {
      return `h${props.depth}`
    }

    return 'span'
  })
</script>

<style>
.p-hash-link { @apply
  cursor-pointer
  relative
  transition-all
  flex
}

.p-hash-link:before {
  content: '#';
}

.p-hash-link:before { @apply
  inline-block
  opacity-0
  relative
  text-link
  top-0
  left-0
  transition-all
  w-0
}

.p-hash-link:hover.p-hash-link:before { @apply
  opacity-100
  mr-1
  w-min
}
</style>