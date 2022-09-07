<template>
  <ComponentPage title="Icons" :demos="[{ title: 'Icons' }]">
    <template #description>
      The following icons are a combination of <p-link to="https://heroicons.com/">
        Hero Icons
      </p-link> and custom icons added by Prefect.
    </template>

    <template #icons>
      <p-text-input v-model="searchTerm" placeholder="Filter Icons">
        <template #append>
          <p-icon icon="SearchIcon" class="mr-2" />
        </template>
      </p-text-input>

      <div class="icons-doc__icons">
        <template v-for="(icon, index) in icons" :key="index">
          <button type="button" :title="icon" @click="selectedIcon = icon">
            <p-icon :icon="icon" class="icons-doc__icon" :class="classes.icon(icon)" />
          </button>
        </template>

        <template v-if="noResults">
          <div class="icons-doc__no-results">
            Sorry, nothing for "{{ searchDebounced }}" <p-icon icon="EmojiSadIcon" class="icons-doc__no-results-icon" />
          </div>
        </template>
      </div>

      <div class="icons-doc__code-snippet">
        <CodeBlock :value="codeSnippet" language="html" show-copy />
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import * as prefectIcons from '@/components/Icon/icons'
  import { HeroIcon, PrefectIcon } from '@/types'
  import * as heroIcons from '@heroicons/vue/solid'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import CodeBlock from '@/demo/components/CodeBlock.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const prefectIconKeys = Object.keys(prefectIcons) as PrefectIcon[]
  const heroIconKeys = Object.keys(heroIcons) as HeroIcon[]
  const icons = [...prefectIconKeys, ...heroIconKeys]

  const selectedIcon = ref<typeof icons[number]>()
  const codeSnippet = computed(() => `<p-icon icon="${selectedIcon.value ?? '...'}" />`)

  const searchTerm = ref('')
  const searchDebounced = useDebouncedRef(searchTerm, 100)

  const classes = computed(() => ({
    icon:(key: string) => ({
      'icons-doc__icon--excluded': !iconMatchesSearch(key),
    }),
  }))

  const noResults = computed(() => icons.filter(iconMatchesSearch).length === 0)

  function iconMatchesSearch(icon: string): boolean {
    return icon.toLowerCase().includes(searchDebounced.value.toLowerCase())
  }
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
text-slate-600
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
</style>