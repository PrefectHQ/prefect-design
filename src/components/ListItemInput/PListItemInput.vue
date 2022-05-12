<template>
  <p-list-item class="list-item-input" v-on="{ mouseenter, mouseleave }">
    <div class="list-item-input__control" :class="classes.control">
      <label class="list-item-input__checkbox">
        <p-checkbox v-model="model" :value="value" />
      </label>
    </div>

    <div class="list-item-input__content">
      <slot />
    </div>
  </p-list-item>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PCheckbox from '../Checkbox'
  import PListItem from '../ListItem'

  const props = defineProps<{
    selected: unknown[],
    value: unknown,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: unknown[]): void,
  }>()

  const model = computed({
    get() {
      return props.selected
    },
    set(value: unknown[]) {
      emit('update:selected', value)
    },
  })

  function mouseenter(): void {
    hover.value = true
  }

  function mouseleave(): void {
    hover.value = false
  }

  const hover = ref(false)
  const show = computed(() => hover.value || props.selected.includes(props.value))

  const classes = computed(() => ({
    control: {
      'list-item-input__control--visible': show.value,
    },
  }))
</script>

<style>
.list-item-input { @apply
bg-gray-50
  shadow
  rounded-lg
  overflow-hidden
  flex
  p-0
}

.list-item-input__content { @apply
  flex-grow
  py-3
  px-4
}

.list-item-input__control { @apply
  flex-grow-0
  flex-shrink-0
  flex
  w-1
  justify-self-stretch
  overflow-hidden
  transition-all
}

.list-item-input__control:focus-within,
.list-item-input__control--visible { @apply
  w-10
}

.list-item-input__checkbox { @apply
  justify-center
  items-center
  flex
  flex-shrink-0
  justify-self-stretch
  bg-gray-200
  w-10
  cursor-pointer
}
</style>