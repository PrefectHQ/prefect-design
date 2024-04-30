<template>
  <CardBase
    :class="props.class"
    :variant="props.variant"
  >
    <CardHeader v-if="$slots.header || $slots.title || $slots.description">
      <CardTitle v-if="$slots.title">
        <slot name="title" />
      </CardTitle>
      <CardDescription v-if="$slots.description">
        <slot name="description" />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
    <CardFooter v-if="$slots.footer">
      <slot name="footer" />
    </CardFooter>
  </CardBase>
</template>

<script setup lang="ts">
  import { type HTMLAttributes } from 'vue'
  import CardBase, { type CardProps } from '@/components/Card/PCardBase.vue'
  import CardContent from '@/components/Card/PCardContent.vue'
  import CardDescription from '@/components/Card/PCardDescription.vue'
  import CardFooter from '@/components/Card/PCardFooter.vue'
  import CardHeader from '@/components/Card/PCardHeader.vue'
  import CardTitle from '@/components/Card/PCardTitle.vue'

  const props = defineProps<{
    class?: HTMLAttributes['class'],
    variant?: CardProps['variant'],
  }>()
</script>
