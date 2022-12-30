<template>
  <div ref="el" class="p-base-input" :class="classes" :style="styles" v-bind="listeners">
    <div v-if="prepend" class="p-base-input__prepend">
      {{ prepend }}
    </div>
    <slot name="prepend" />
    <slot name="control" :attrs="attrsWithDisabled" />
    <div v-if="append" class="p-base-input__append">
      {{ append }}
    </div>
    <slot name="append" />
    <div v-if="failed" class="p-base-input__failed-icon">
      <PIcon icon="ExclamationCircleIcon" />
    </div>
    <div v-if="state?.pending" class="p-base-input__pending-icon">
      <PLoadingIcon />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BaseInput',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { PLoadingIcon } from '@/components/LoadingIcon'
  import { useAttrsStylesClassesAndListeners } from '@/compositions/attributes'
  import { State } from '@/types/state'
  import { asArray } from '@/utilities'

  const props = defineProps<{
    state?: State,
    prepend?: string,
    append?: string,
    disabled?: boolean,
  }>()

  const { classes: attrClasses, listeners, styles, attrs } = useAttrsStylesClassesAndListeners()
  const failed = computed(() => props.state?.valid === false && props.state.validated && !props.state.pending)
  const el = ref<HTMLDivElement>()

  defineExpose({ el })

  const classes = computed(() => [
    ...asArray(attrClasses.value),
    {
      'p-base-input--disabled': props.disabled,
      'p-base-input--failed': failed.value,
      'p-base-input--pending': props.state?.pending,
    },
  ])

  const attrsWithDisabled = computed(() => ({
    ...attrs.value,
    disabled: props.disabled,
  }))
</script>

<style>
.p-base-input { @apply
  w-full
  border
  flex
  items-center
  focus-within:ring-1
  bg-background
  border-background-400
  dark:border-foreground-200
  text-foreground
  focus-within:border-prefect-600
  focus-within:ring-prefect-600
  shadow-sm
  rounded-md
  font-normal
}

.p-base-input--disabled,
:disabled .p-base-input { @apply
  cursor-not-allowed
  opacity-50
}

.p-base-input__prepend,
.p-base-input__append { @apply
  px-2
  flex
  flex-col
  whitespace-nowrap
  justify-center
  self-stretch
  text-sm
  border-background-400
  dark:border-foreground-200
}

.p-base-input__prepend { @apply
  border-r
}

.p-base-input__append { @apply
  border-l
}

.p-base-input--failed { @apply
  border-red-600
  focus-within:border-red-600
  focus-within:ring-red-600
}

.p-base-input--failed {
  scroll-margin: var(--prefect-scroll-margin);
}

.p-base-input__failed-icon { @apply
  text-red-600
  w-5
  h-5
  mr-2
}

.p-base-input--pending { @apply
  border-prefect-300
  focus-within:border-prefect-300
  focus-within:ring-prefect-300
}

.p-base-input__pending-icon { @apply
  relative
  text-prefect-300
  w-5
  h-5
  mr-2
}
</style>