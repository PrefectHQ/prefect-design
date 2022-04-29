<template>
  <div class="p-select">
    <span class="p-select__icon">
      <SelectorIcon />
    </span>
    <select v-model="value" class="p-select__native" @focus="open = false">
      <template v-for="(option, index) in options" :key="index">
        <option :selected="option === value">
          {{ option }}
        </option>
      </template>
    </select>

    <button
      class="p-select__custom"
      type="button"
      aria-hidden="true"
      tabindex="-1"
      @click.stop="openSelect"
      @keydown="closeIfTab"
    >
      <span class="p-select__selected-value">{{ value }}</span>
    </button>
    <template v-if="open">
      <ul class="p-select__options" role="listbox">
        <template v-for="(option, index) in options" :key="index">
          <p-select-option :label="option" :selected="option === value" @click.prevent="value = option" />
        </template>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onUnmounted, ref, watch } from 'vue'

  export default defineComponent({
    name: 'PSelect',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  // eslint-disable-next-line import/order
  import SelectorIcon from '@heroicons/vue/solid/SelectorIcon'
  import PSelectOption from '@/components/SelectOption'

  const props = defineProps<{
    modelValue: string | null | undefined,
    options: string[],
    allowDeselect?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | null) {
      emits('update:modelValue', value)
    },
  })

  const options = computed(() => {
    const validOptions = props.options.filter(x => x !== '')

    if (props.allowDeselect) {
      validOptions.unshift('')
    }

    return validOptions
  })

  const open = ref(false)

  function openSelect(): void {
    open.value = true
  }

  function closeSelect(): void {
    open.value = false
  }

  function closeIfTab(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      closeSelect()
    }
  }

  watch(open, () => {
    if (open.value) {
      document.addEventListener('click', closeSelect)
      window.addEventListener('resize', closeSelect)
    } else {
      document.removeEventListener('click', closeSelect)
      window.removeEventListener('resize', closeSelect)
    }
  })

  onUnmounted(() => {
    document.removeEventListener('click', closeSelect)
    window.removeEventListener('resize', closeSelect)
  })
</script>

<style>
.p-select { @apply
  relative
}

.p-select__native { @apply
  block
  w-full
  pl-3
  pr-10
  py-2
  text-base
  border-gray-300
  focus:outline-none
  focus:ring-prefect-500
  focus:border-prefect-500
  sm:text-sm
  rounded-md
  appearance-none
  bg-none
}

.p-select__custom { @apply
  bg-white
  absolute
  hidden
  top-0
  left-0
  w-full
  h-full
  border
  border-gray-300
  rounded-md
  shadow-sm
  pl-3
  pr-10
  py-2
  text-left
  cursor-default
  focus:outline-none
  focus:ring-1
  focus:ring-prefect-500
  focus:border-prefect-500
  sm:text-sm
}

.p-select__selected-value { @apply
  block
  truncate
}

.p-select__icon { @apply
  absolute
  inset-y-0
  right-0
  pr-2
  z-[2]
  flex
  items-center
  pointer-events-none
}

.p-select__icon svg { @apply
  w-4
  h-4
}

.p-select__options { @apply
  absolute
  z-[3]
  mt-1
  left-0
  w-full
  bg-white
  shadow-lg
  max-h-60
  rounded-md
  py-1
  text-base
  ring-1
  ring-black
  ring-opacity-5
  overflow-auto
  focus:outline-none
  sm:text-sm
}

@media (hover: hover) {
  .p-select__custom { @apply
    block
  }

  .p-select__native:focus + .p-select__custom { @apply
    hidden
  }
}
</style>