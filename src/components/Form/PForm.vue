<template>
  <form class="p-form" @submit.prevent="emits('submit', $event)">
    <template v-if="slots.heading || heading">
      <div class="p-form__header">
        <slot name="heading">
          <span>
            {{ heading }}
          </span>
        </slot>
      </div>
    </template>
    <slot />
    <template v-if="slots.footer">
      <div class="p-form__footer">
        <slot name="footer" />
      </div>
    </template>
  </form>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'

  defineProps<{
    heading?: string,
  }>()

  const emits = defineEmits<{
    (event: 'submit', value: Event): void,
  }>()

  const slots = useSlots()
</script>

<style>
.p-form { @apply
  w-full
  flex
  flex-col
  gap-y-4
}

.p-form__header { @apply
  text-xl
}

.p-form__footer { @apply
  flex
  justify-end
  gap-3
}
</style>