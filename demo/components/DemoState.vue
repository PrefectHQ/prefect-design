<template>
  <p-label label="Validation State" class="demo-state p-background">
    <p-checkbox v-model="state.valid" label="valid" />
    <p-checkbox v-model="state.validated" label="validated" />
    <p-checkbox v-model="state.pending" label="pending" />
    <p-checkbox v-model="internalDisabled" label="disabled" />
  </p-label>
</template>

<script lang="ts" setup>
  import { State } from '@/types'
  import { computed, reactive, watch } from 'vue'

  const props = defineProps<{
    state: State | null | undefined,
    disabled: boolean | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:state', value: State): void,
    (event: 'update:disabled', value: boolean): void,
  }>()

  const state = reactive<State>({
    valid: props.state?.valid ?? true,
    validated: props.state?.validated ?? false,
    pending: props.state?.pending ?? false,
  })

  const internalDisabled = computed({
    get() {
      return props.disabled ?? false
    },
    set(value) {
      emits('update:disabled', value)
    },
  })

  watch(state, value => emits('update:state', value))
</script>

<style>
.demo-state { @apply
  max-w-fit
  px-8
  py-4
  my-4
  rounded-default
}
</style>