<template>
  <header class="page-heading">
    <div class="page-heading__leading">
      <div class="page-heading__crumbs">
        <PBreadCrumbs :class="classes" :crumbs="crumbs" />
        <slot name="after-crumbs" />
      </div>
      <slot />
    </div>

    <div class="page-heading__trailing">
      <slot name="actions" />
    </div>
  </header>
</template>

<script lang="ts" setup>
  import { PropType, computed } from 'vue'
  import PBreadCrumbs from '@/components/BreadCrumbs/PBreadCrumbs.vue'
  import { BreadCrumbs } from '@/types/breadcrumbs'
  import { Size } from '@/types/size'

  const props = defineProps({
    crumbs: {
      type: Array as PropType<BreadCrumbs>,
      required: true,
    },
    size: {
      type: String as PropType<Size>,
      default: 'xl',
    },
  })

  const classes = computed(() => ({
    'page-heading__crumbs--xs': props.size === 'xs',
    'page-heading__crumbs--sm': props.size === 'sm',
    'page-heading__crumbs--md': props.size === 'md',
    'page-heading__crumbs--lg': props.size === 'lg',
    'page-heading__crumbs--xl': props.size === 'xl',
  }))
</script>

<style>
.page-heading { @apply
  grid
  gap-2
  grid-cols-1
  items-end
  md:grid-cols-2
  md:min-h-[42px]
}

.page-heading__crumbs { @apply
  flex
  items-center
  justify-start
  gap-2
}

.page-heading__trailing { @apply
  flex
  items-center
  gap-2
  justify-start
  md:justify-end
}

.page-heading__crumbs--xs { @apply
  text-xs
}

.page-heading__crumbs--sm { @apply
  text-sm
}

.page-heading__crumbs--md { @apply
  text-base
}

.page-heading__crumbs--lg { @apply
  text-lg
}

.page-heading__crumbs--xl { @apply
  text-xl
}
</style>