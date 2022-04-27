<template>
  <span
    class="p-tag"
    :class="classes"
  >
    <div v-if="$slots.icon" class="p-tag--icon">
      <slot name="icon" />
    </div>

    <span class="p-tag--label"><slot /></span>
  </span>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'

  const props = defineProps<{
    color?: string,
    flat?: boolean,
  }>()

  const states = ref(['completed', 'cancelled', 'failed', 'pending', 'running', 'scheduled'])
  const mappedStates = computed(() => states.value.map(state => ({ [`p-tag--${state}`]: props.color?.toLowerCase() === state })))
  const classes  = computed(() => [...[{ 'p-tag--flat': props.flat }], ...mappedStates.value])
</script>

<style>
.p-tag {@apply
  gap-1
  inline-flex
  items-center
  rounded-full
  bg-gray-100
  text-black
  px-2.5
  py-0.5
  text-sm
}
.p-tag--flat:is(
  .p-tag--completed,
  .p-tag, .p-tag--cancelled,
  .p-tag--failed,
  .p-tag--pending,
  .p-tag--running,
  .p-tag--scheduled){ @apply
  bg-transparent
}

.p-tag--flat:is(
  .p-tag--completed,
  .p-tag, .p-tag--cancelled,
  .p-tag--failed,
  .p-tag--pending,
  .p-tag--running,
  .p-tag--scheduled) .p-tag--label{ @apply
  text-slate-700
  font-semibold
}

.p-tag--completed { @apply
  text-slate-50
  bg-stateColors-completed
  rounded-md
}
.p-tag--completed:is(.p-tag--flat) .p-tag--icon { @apply
  text-stateColors-completed
}
.p-tag--cancelled { @apply
  text-slate-50
  bg-stateColors-cancelled
  rounded-md
}
.p-tag--cancelled:is(.p-tag--flat) .p-tag--icon { @apply
  text-stateColors-cancelled
}
.p-tag--failed{ @apply
  text-slate-50
  bg-stateColors-failed
  rounded-md
}
.p-tag--failed:is(.p-tag--flat) .p-tag--icon { @apply
  text-stateColors-failed
}
.p-tag--pending{ @apply
  text-slate-800
  bg-stateColors-pending
  rounded-md
}
.p-tag--pending:is(.p-tag--flat) .p-tag--icon { @apply
  text-stateColors-pending
}
.p-tag--running{ @apply
  text-slate-50
  bg-stateColors-running
  rounded-md
}
.p-tag--running:is(.p-tag--flat) .p-tag--icon { @apply
  text-stateColors-running
}
.p-tag--scheduled { @apply
  text-slate-800
  bg-stateColors-scheduled
  rounded-md
}
.p-tag--scheduled:is(.p-tag--flat) .p-tag--icon { @apply
  text-stateColors-scheduled
}
.p-tag--icon {@apply
  w-4
  h-4
}
</style>