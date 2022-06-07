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
    <div class="p-form__footer">
      <slot name="footer">
        <PButton inset @click="emits('cancel')">
          Cancel
        </PButton>
        <PButton type="submit" :disabled="disabled" :loading="loading">
          Submit
        </PButton>
      </slot>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'
  import PButton from '@/components/Button/PButton.vue'

  defineProps<{
    heading?: string,
    disabled?: boolean,
    loading?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'cancel'): void,
    (event: 'submit', value: Event): void,
  }>()

  const slots = useSlots()
</script>

<style>
.p-form { @apply
  w-full
  flex
  flex-col
  gap-y-6
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