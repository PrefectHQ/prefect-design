<template>
  <PListItem class="p-list-item-input p-background">
    <div class="p-list-item-input__control">
      <label class="p-list-item-input__checkbox">
        <PCheckbox v-model="model" v-bind="{ value, disabled }" />
      </label>
    </div>

    <div class="p-list-item-input__content">
      <slot />
    </div>
  </PListItem>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PCheckbox from '@/components/Checkbox/PCheckbox.vue'
  import PListItem from '@/components/ListItem/PListItem.vue'

  type Selected = boolean | unknown[] | undefined

  const props = defineProps<{
    selected: Selected | null,
    value: unknown,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: Selected): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? undefined
    },
    set(value) {
      emit('update:selected', value)
    },
  })
</script>

<style>
.p-list-item-input { @apply
  rounded-default
  overflow-hidden
  flex
  p-0
}

.p-list-item-input__control { @apply
  flex-grow-0
  flex-shrink-0
  justify-self-stretch
  py-3
  px-2
}

.p-list-item-input__content { @apply
  flex-grow
  py-3
  pr-4
  min-w-0
}
</style>