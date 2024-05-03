<template>
  <div
    class="p-card"
    :class="card({ variant })"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority'

  const card = cva(
    'p-card p-background', {
      variants: {
        variant: {
          ghost: 'p-card-ghost',
        },
      },
      defaultVariants: {
        variant: null,
      },
    },
  )

  export type CardProps = VariantProps<typeof card>

  defineProps<{
    variant?: CardProps['variant'],
  }>()
</script>


<style>
.p-card {
  @apply
    rounded-lg
    border
    text-card-foreground
    shadow-sm;
}

.p-card-ghost {
  @apply
    bg-transparent
    border-transparent
    shadow-none;
}
</style>