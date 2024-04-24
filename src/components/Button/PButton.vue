<template>
  <component
    :is="component"
    ref="el"
    class="p-button"
    :class="classes"
    :disabled="disabled || loading"
    v-bind="componentProps"
  >
    <div class="p-button__content">
      <template v-if="icon">
        <PIcon :size="iconSize" :icon="icon" class="p-button__icon" />
      </template>
      <slot />
      <template v-if="iconAppend">
        <PIcon :size="iconSize" :icon="iconAppend" class="p-button__icon" />
      </template>
    </div>
    <template v-if="loading">
      <PLoadingIcon class="p-button__loading-icon" />
    </template>
  </component>
</template>

<script lang="ts" setup>
  import { computed, useSlots, ref } from 'vue'
  import { RouteLocationRaw } from 'vue-router'
  import PIcon from '@/components/Icon/PIcon.vue'
  import PLoadingIcon from '@/components/LoadingIcon/PLoadingIcon.vue'
  import { Icon } from '@/types'
  import { isRouteExternal } from '@/utilities/router'

  const props = defineProps<{
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link',
    size?: 'default' | 'sm' | 'lg' | 'icon',
    primary?: boolean,
    flat?: boolean,
    selected?: boolean,
    icon?: Icon,
    iconAppend?: Icon,
    dangerous?: boolean,
    to?: RouteLocationRaw,
    small?: boolean,
    disabled?: boolean,
    loading?: boolean,
  }>()

  const slots = useSlots()
  const el = ref<HTMLButtonElement>()

  defineExpose({
    el,
  })

  const component = computed(() => {
    if (props.to) {
      return isRouteExternal(props.to) ? 'a' : 'router-link'
    }

    return 'button'
  })

  const componentProps = computed(() => {
    if (component.value === 'a') {
      return {
        role: 'button',
        href: props.to,
      }
    }

    if (component.value === 'button') {
      return {
        type: 'button',
      }
    }

    return {
      role: 'button',
      to: props.to,
    }
  })

  const classes = computed(() => ({
    'p-button--icon-only': props.icon && !slots.default,
    'p-button--default': props.primary || props.variant === 'default' || props.variant === 'destructive',
    'p-button--destructive': props.dangerous || props.variant === 'destructive',
    'p-button--ghost': props.flat || props.variant === 'ghost',
    'p-button--small': props.small || props.size === 'sm',
    'p-button--icon-prepend': props.icon && slots.default,
    'p-button--icon-append': props.iconAppend && slots.default,
    'p-button--disabled': props.disabled || props.loading,
    'p-button--loading': props.loading,
    'p-button--selected': props.selected,
  }))

  const iconSize = props.small ? undefined : 'large'
</script>

<style>
.p-button { @apply
  relative
  inline-flex
  items-center
  px-4
  py-2
  rounded-default
  border
  outline-none
  focus:ring-spacing-focus-ring
  focus:ring-focus-ring
  focus:ring-offset-focus-ring
  focus:ring-offset-focus-ring-offset
  bg-transparent
  border-input
  text-primary-foreground;
}

.p-button:focus:not(:focus-visible) { @apply
  ring-transparent
  ring-offset-transparent
}

.p-button:not(:disabled):hover {
  background-color: var(--p-color-button-default-bg-hover);
  border-color: var(--p-color-button-default-border-hover);
  color: var(--p-color-button-default-text-hover);
}

.p-button:not(:disabled):active {
  background-color: var(--p-color-button-default-bg-active);
  border-color: var(--p-color-button-default-border-active);
  color: var(--p-color-button-default-text-active);
}

.p-button--icon-prepend { @apply
  pl-2
}

.p-button--icon-append { @apply
  pr-2
}

.p-button--icon-only { @apply
  px-2
}

.p-button__content { @apply
  gap-1
  inline-flex
  flex-grow
  justify-center
  items-center
  font-normal
}

.p-button--default {
  background-color: var(--p-color-button-primary-bg);
  border-color: var(--p-color-button-primary-border);
  color: var(--p-color-button-primary-text);
}
.p-button--default:not(:disabled):hover {
  background-color: var(--p-color-button-primary-bg-hover);
  border-color: var(--p-color-button-primary-border-hover);
  color: var(--p-color-button-primary-text-hover);
}
.p-button--default:not(:disabled):active {
  background-color: var(--p-color-button-primary-bg-active);
  border-color: var(--p-color-button-primary-border-active);
  color: var(--p-color-button-primary-text-active);
}

.p-button--destructive {
  background-color: var(--p-color-button-danger-bg);
  border-color: var(--p-color-button-danger-border);
  color: var(--p-color-button-danger-text);
}
.p-button--destructive:not(:disabled):hover {
  background-color: var(--p-color-button-danger-bg-hover);
  border-color: var(--p-color-button-danger-border-hover);
  color: var(--p-color-button-danger-text-hover);
}
.p-button--destructive:not(:disabled):active {
  background-color: var(--p-color-button-danger-bg-active);
  border-color: var(--p-color-button-danger-border-active);
  color: var(--p-color-button-danger-text-active);
}

.p-button--default.p-button--destructive {
  background-color: var(--p-color-button-primary-danger-bg);
  border-color: var(--p-color-button-primary-danger-border);
  color: var(--p-color-button-primary-danger-text);
}
.p-button--default.p-button--destructive:not(:disabled):hover {
  background-color: var(--p-color-button-primary-danger-bg-hover);
  border-color: var(--p-color-button-primary-danger-border-hover);
  color: var(--p-color-button-primary-danger-text-hover);
}
.p-button--default.p-button--destructive:not(:disabled):active {
  background-color: var(--p-color-button-primary-danger-bg-active);
  border-color: var(--p-color-button-primary-danger-border-active);
  color: var(--p-color-button-primary-danger-text-active);
}

.p-button--ghost {
  background-color: var(--p-color-button-flat-bg);
  border-color: var(--p-color-button-flat-border);
  color: var(--p-color-button-flat-text);
}
.p-button--ghost:not(:disabled):hover {
  background-color: var(--p-color-button-flat-bg-hover);
  border-color: var(--p-color-button-flat-border-hover);
  color: var(--p-color-button-flat-text-hover);
}
.p-button--ghost:not(:disabled):active {
  background-color: var(--p-color-button-flat-bg-active);
  border-color: var(--p-color-button-flat-border-active);
  color: var(--p-color-button-flat-text-active);
}

.p-button--ghost.p-button--destructive {
  background-color: var(--p-color-button-flat-danger-bg);
  border-color: var(--p-color-button-flat-danger-border);
  color: var(--p-color-button-flat-danger-text);
}
.p-button--ghost.p-button--destructive:not(:disabled):hover {
  background-color: var(--p-color-button-flat-danger-bg-hover);
  border-color: var(--p-color-button-flat-danger-border-hover);
  color: var(--p-color-button-flat-danger-text-hover);
}
.p-button--ghost.p-button--destructive:not(:disabled):active {
  background-color: var(--p-color-button-flat-danger-bg-active);
  border-color: var(--p-color-button-flat-danger-border-active);
  color: var(--p-color-button-flat-danger-text-active);
}

.p-button--small { @apply
  text-sm
  px-2
  py-1
}

.p-button--small .p-button__icon { @apply
  max-w-[1.25rem]
  max-h-[1.25rem]
}

.p-button--icon-prepend.p-button--small { @apply
  pl-1
}

.p-button--icon-append.p-button--small { @apply
  pr-1
}

.p-button--icon-only.p-button--small { @apply
  px-1
}

.p-button--disabled { @apply
  cursor-not-allowed
  opacity-50
}

.p-button--loading { @apply
  cursor-wait
}

.p-button--loading .p-button__content { @apply
  opacity-40
}

.p-button__loading-icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.p-button--selected,
.p-button--selected:not(:disabled):hover,
.p-button--selected:not(:disabled):active {
  background-color: var(--p-color-button-selected-bg);
  border-color: var(--p-color-button-selected-border);
  color: var(--p-color-button-selected-text);
  cursor: default;
}
</style>