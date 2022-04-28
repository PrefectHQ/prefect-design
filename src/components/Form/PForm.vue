<template>
  <form class="p-form" @submit.prevent="emits('submit', $event)">
    <slot name="header">
      <div class="p-form__header">
        {{ header }}
      </div>
    </slot>
    <slot />
    <slot name="footer">
      <div class="p-form__footer">
        <p-button inset @click="emits('cancel')">
          Cancel
        </p-button>
        <p-button type="submit">
          Submit
        </p-button>
      </div>
    </slot>
  </form>
</template>

<script lang="ts" setup>
  defineProps<{
    header?: string,
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