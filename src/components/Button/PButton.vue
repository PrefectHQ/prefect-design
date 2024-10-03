<template>
  <component
    :is="component"
    ref="el"
    :class="button({ variant: computedVariantCompatLayer, size: computedSizeCompatLayer, icon: icon && !$slots.default })"
    :disabled="disabled || loading"
    :aria-selected="selected"
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
  import { cva, type VariantProps } from 'class-variance-authority'
  import { computed, ref } from 'vue'
  import { RouteLocationRaw } from 'vue-router'
  import PIcon from '@/components/Icon/PIcon.vue'
  import PLoadingIcon from '@/components/LoadingIcon/PLoadingIcon.vue'
  import { Icon } from '@/types'
  import { isRouteExternal } from '@/utilities/router'

  const button = cva(
    'p-button',
    {
      variants: {
        variant: {
          default: 'p-button--default',
          destructive: 'p-button--destructive',
          outline: 'p-button--outline',
          ghost: 'p-button--ghost',
          link: 'p-button--link',
        },
        size: {
          default: 'px-3 py-1.5',
          sm: 'text-sm px-2 py-1',
          lg: 'h-11 rounded-md px-8',
          icon: 'h-10 w-10',
        },
        icon: {
          true: 'h-10 w-10',
        },
      },
      compoundVariants: [
        {
          size: 'sm',
          icon: true,
          class: 'max-h-7 max-w-7',
        },
      ],
      defaultVariants: {
        variant: 'outline',
        size: 'default',
      },
    },
  )

  type ButtonProps = VariantProps<typeof button>

  const props = defineProps<{
    variant?: ButtonProps['variant'],
    size?: ButtonProps['size'],
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

  const iconSize = computed(() => {
    if (props.size === 'sm') {
      return 'small'
    }

    if (props.size === 'lg') {
      return 'large'
    }

    return 'default'
  })

  const computedVariantCompatLayer = computed(() => {
    // Until we migrate all the buttons to use the new variant prop, we need to support the old props
    if (props.dangerous || props.variant === 'destructive') {
      return 'destructive'
    }

    if (props.primary || props.variant === 'default') {
      return 'default'
    }

    if (props.flat || props.variant === 'ghost') {
      return 'ghost'
    }

    if (props.variant === 'link') {
      return 'link'
    }

    return 'outline'
  })

  const computedSizeCompatLayer = computed(() => {
    // Until we migrate all the buttons to use the new size prop, we need to support the old props
    if (props.size) {
      return props.size
    }
    if (props.small) {
      return 'sm'
    }
    return 'default'
  })
</script>

<style>
.p-button { @apply
  relative
  inline-flex
  items-center
  justify-center
  whitespace-nowrap
  rounded-md
  border
  border-transparent
  text-sm
  font-medium
  ring-offset-background
  transition-colors
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-focus-ring
  focus-visible:ring-offset-2
  disabled:pointer-events-none
  disabled:opacity-50
  select-none
  aria-selected:bg-[color:var(--p-color-button-selected-bg)]
  aria-selected:text-[color:var(--p-color-button-selected-text)]
  aria-selected:border-[color:var(--p-color-button-selected-border)]
}

.p-button--default { @apply
  bg-primary
  text-primary-foreground
  hover:bg-primary/90
  active:bg-primary/80
}

.p-button--outline { @apply
  border
  border-input
  bg-background
  hover:bg-accent
  hover:text-accent-foreground
  active:bg-accent/60
}

.p-button--ghost { @apply
  hover:bg-accent
  hover:text-accent-foreground
  active:bg-accent/60
}

.p-button--destructive { @apply
  bg-destructive
  text-destructive-foreground
  hover:bg-destructive/90
  active:bg-destructive/80
}

.p-button--link { @apply
  text-primary
  underline-offset-4
  hover:underline
}

.p-button__content { @apply
  gap-1
  inline-flex
  flex-grow
  justify-center
  items-center
  font-normal
}

.p-button__loading-icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>