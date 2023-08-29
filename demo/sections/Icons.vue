<template>
  <ComponentPage title="Icons" :demos="[{ title: 'Icons' }]">
    <template #description>
      The following icons are a combination of <PLink to="https://heroicons.com/">
        Hero Icons
      </PLink> and custom icons added by Prefect.
    </template>

    <template #icons>
      <PTextInput v-model="searchTerm" placeholder="Filter Icons">
        <template #append>
          <PIcon icon="MagnifyingGlassIcon" class="mr-2" />
        </template>
      </PTextInput>

      <div class="icons-doc__icons">
        <template v-for="(icon, index) in icons" :key="index">
          <button type="button" :title="icon" @click="selectedIcon = icon">
            <PIcon :icon="icon" class="icons-doc__icon" :class="classes.icon(icon)" />
          </button>
        </template>

        <template v-if="noResults">
          <div class="icons-doc__no-results">
            Sorry, nothing for "{{ searchDebounced }}" <PIcon icon="FaceFrownIcon" class="icons-doc__no-results-icon" />
          </div>
        </template>
      </div>

      <div class="icons-doc__size-preview">
        <div class="icons-doc__size-selector p-background">
          <PLabel label="Icon Size">
            <PRadioGroup v-model="sizeValue" :options="sizes" />
          </PLabel>
        </div>

        <div class="icons-doc__icon-preview">
          <template v-if="selectedIcon">
            <PIcon :icon="selectedIcon" :size="sizeValue || undefined" />
          </template>
        </div>
      </div>

      <div class="icons-doc__code-snippet">
        <CodeBlock :value="codeSnippet" language="html" show-copy />
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PRadioGroup, PLabel, PIcon, PLink, PTextInput } from '@/components'
  import * as prefectIcons from '@/components/Icon/icons'
  import { HeroIcon, PrefectIcon } from '@/types'
  import * as heroIcons from '@heroicons/vue/24/outline'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import CodeBlock from '@/demo/components/CodeBlock.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const prefectIconKeys = Object.keys(prefectIcons) as PrefectIcon[]
  const heroIconKeys = Object.keys(heroIcons) as HeroIcon[]
  const icons = [...prefectIconKeys, ...heroIconKeys]

  const selectedIcon = ref<typeof icons[number]>()
  const codeSnippet = computed(() => `<p-icon icon="${selectedIcon.value ?? '...'}"${sizeValue.value ? ` size="${ sizeValue.value}"` : ''} />`)

  const searchTerm = ref('')
  const searchDebounced = useDebouncedRef(searchTerm, 100)

  const classes = computed(() => ({
    icon: (key: string) => ({
      'icons-doc__icon--excluded': !iconMatchesSearch(key),
    }),
  }))

  const noResults = computed(() => icons.filter(iconMatchesSearch).length === 0)

  function iconMatchesSearch(icon: string): boolean {
    return icon.toLowerCase().includes(searchDebounced.value.toLowerCase())
  }

  const sizes = [{ label: 'default', value: '' }, { label: 'small', value: 'small' }, { label: 'large', value: 'large' }]
  const sizeValue = ref<'small' | 'large' | ''>('')
</script>

<style>
.icons-doc__icons { @apply
  relative
  p-4
  flex
  gap-2
  flex-wrap
}

.icons-doc__icon { @apply
  w-8
  h-8
  duration-300
  transition-opacity
}

.icons-doc__icon--excluded { @apply
  opacity-10
}

.icons-doc__no-results { @apply
  text-subdued
  absolute
  left-0
  top-0
  right-0
  bottom-0
  flex
  flex-col
  gap-1
  text-3xl
  justify-center
  items-center
}

.icons-doc__no-results-icon { @apply
  h-14
  w-14
}

.icons-doc__size-preview { @apply
  py-4
  flex
  w-full
}

.icons-doc__size-selector { @apply
  max-w-fit
  px-8
  py-4
}

.icons-doc__icon-preview { @apply
  h-full
  m-auto
}
</style>