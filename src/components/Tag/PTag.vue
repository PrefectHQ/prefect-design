<template>
  <span
    class="p-tag"
    :class="classes"
  >
    <div v-if="icon" class="p-tag--icon">
      <p-icon :icon="icon" />
    </div>

    <span class="p-tag--label"><slot /></span>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Icon } from '@/types/icon'

  const props = defineProps<{
    color?: 'completed' | 'cancelled' | 'failed' | 'pending' | 'running' | 'scheduled',
    flat?: boolean,
    icon?: Icon,
  }>()

  const states = ['completed', 'cancelled', 'failed', 'pending', 'running', 'scheduled']
  const mappedStates = computed(() => states.map(state => ({ [`p-tag--${state}`]: props.color?.toLowerCase() === state })))
  const classes  = computed(() => [{ 'p-tag--flat': props.flat }, ...mappedStates.value])
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
.p-tag:is(
  .p-tag--completed,
  .p-tag--cancelled,
  .p-tag--failed,
  .p-tag--pending,
  .p-tag--running,
  .p-tag--scheduled) {@apply
    rounded-md
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
  bg-state-colors-completed
}
.p-tag--completed:is(.p-tag--flat) .p-tag--icon { @apply
  text-state-colors-completed
}
.p-tag--cancelled { @apply
  text-slate-50
  bg-state-colors-cancelled
}
.p-tag--cancelled:is(.p-tag--flat) .p-tag--icon { @apply
  text-state-colors-cancelled
}
.p-tag--failed{ @apply
  text-slate-50
  bg-state-colors-failed
}
.p-tag--failed:is(.p-tag--flat) .p-tag--icon { @apply
  text-state-colors-failed
}
.p-tag--pending{ @apply
  text-slate-800
  bg-state-colors-pending
}
.p-tag--pending:is(.p-tag--flat) .p-tag--icon { @apply
  text-state-colors-pending
}
.p-tag--running{ @apply
  text-slate-50
  bg-state-colors-running
}
.p-tag--running:is(.p-tag--flat) .p-tag--icon { @apply
  text-state-colors-running
}
.p-tag--scheduled { @apply
  text-slate-800
  bg-state-colors-scheduled
}
.p-tag--scheduled:is(.p-tag--flat) .p-tag--icon { @apply
  text-state-colors-scheduled
}
.p-tag--icon {@apply
  w-4
  h-4
}
</style>