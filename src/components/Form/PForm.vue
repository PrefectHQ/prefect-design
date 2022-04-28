<template>
  <form class="p-form" @submit.prevent="emits('submit', $event)">
    <div class="p-form__header">
      <slot name="heading">
        <span>
          {{ heading }}
        </span>
      </slot>
    </div>
    <slot />
    <div class="p-form__footer">
      <slot name="footer">
        <p-button inset @click="emits('cancel')">
          Cancel
        </p-button>
        <p-button type="submit">
          Submit
        </p-button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts" setup>
  defineProps<{
    heading?: string,
  }>()

  const emits = defineEmits<{
    (event: 'cancel'): void,
    (event: 'submit', value: Event): void,
  }>()
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