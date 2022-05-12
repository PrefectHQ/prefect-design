<template>
  <p-list-item class="list-item-input" @mouseenter="hoverStart" @mouseleave="hoverEnd">
    <div class="list-item-input__control" :class="classes.control" @mouseenter="hoverControlStart" @mouseleave="hoverControlEnd">
      <label class="list-item-input__checkbox" :class="classes.checkbox">
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

  const hover = ref(false)
  const hoverControl = ref(false)
  const showControl = computed(() => hoverControl.value || props.selected.includes(props.value))

  const classes = computed(() => ({
    control: {
      'list-item-input__control--hover': hover.value && !showControl.value,
      'list-item-input__control--visible': showControl.value,
    },
    checkbox: {
      'list-item-input__checkbox--visible': showControl.value,
    },
  }))

  function hoverStart(): void {
    hover.value = true
  }

  function hoverEnd(): void {
    hover.value = false
  }

  function hoverControlStart(): void {
    hoverControl.value = true
  }

  function hoverControlEnd(): void {
    hoverControl.value = false
  }
</script>

<style>
.list-item-input { @apply
  bg-gray-50
  shadow
  rounded-lg
  overflow-hidden
  flex
  p-0
  relative
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
  z-10
  bg-gray-200
}

.list-item-input__control--hover { @apply
  w-4
}

.list-item-input__control--hover {
  margin-right: -0.75em;
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
  w-12
  cursor-pointer
  opacity-0
  transition-all
}

.list-item-input__checkbox--visible { @apply
  opacity-100
}
</style>