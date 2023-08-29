<template>
  <PBaseInput ref="wrapperElement" class="p-select-button">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <button
        ref="buttonElement"
        type="button"
        class="p-select-button__control"
        aria-hidden="true"
        v-bind="attrs"
      >
        <span class="p-select-button__value">
          <slot name="default" />
        </span>
      </button>
    </template>
    <template #append>
      <span class="p-select-button__icon">
        <PIcon icon="ChevronUpDownIcon" />
      </span>
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PBaseInput from '@/components/BaseInput/PBaseInput.vue'

  const wrapperElement = ref<typeof PBaseInput>()
  const wrapper = computed(() => wrapperElement.value?.el)
  const buttonElement = ref<HTMLButtonElement>()
  const el = computed(() => buttonElement.value)

  defineExpose({ el, wrapper })
</script>

<style>
.p-select-button { @apply
  cursor-pointer
}

.p-select-button__control { @apply
  bg-transparent
  w-full
  h-full
  py-2
  px-3
  text-left
  outline-none
  border-none
  ring-0
  focus:ring-0
  truncate;
  color: var(--p-color-input-text);
}

.p-select-button__control:disabled { @apply
  cursor-not-allowed
}

.p-select-button__value { @apply
  min-h-[1.5rem]
  flex
  justify-start
  items-stretch
  w-full
  h-full
}

.p-select-button__icon { @apply
  pr-2
  flex
  items-center
}

.p-select-button__icon .p-icon { @apply
  w-4
  h-4
}
</style>