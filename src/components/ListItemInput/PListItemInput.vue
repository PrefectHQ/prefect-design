<template>
  <PListItem class="list-item-input" v-on="{ mouseenter, mouseleave }">
    <div class="list-item-input__control" :class="classes.control">
      <label class="list-item-input__checkbox">
        <PCheckbox v-model="model" v-bind="{ value, disabled }" />
      </label>
    </div>

    <div class="list-item-input__content">
      <slot />
    </div>
  </PListItem>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
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
    set(value: Selected) {
      emit('update:selected', value)
    },
  })

  const hover = ref(false)
  const show = computed(() => {
    if (hover.value) {
      return true
    }

    if (typeof model.value === 'object') {
      return model.value.includes(props.value)
    }

    return model
  })

  const classes = computed(() => ({
    control: {
      'list-item-input__control--visible': show.value,
    },
  }))

  function mouseenter(): void {
    if (!props.disabled) {
      hover.value = true
    }
  }

  function mouseleave(): void {
    if (!props.disabled) {
      hover.value = false
    }
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
}

.list-item-input__content { @apply
  flex-grow
  py-3
  pl-3
  pr-4
  min-w-0
}

.list-item-input__control { @apply
  flex-grow-0
  flex-shrink-0
  flex
  w-10
  sm:w-2
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
  items-start
  sm:items-center
  flex
  flex-shrink-0
  justify-self-stretch
  bg-gray-200
  w-10
  pt-3
  sm:pt-0
  cursor-pointer
}
</style>