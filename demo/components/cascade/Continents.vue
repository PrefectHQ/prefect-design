<template>
  <p-card class="continents">
    <p-text-input v-model="search" class="continents__search" placeholder="Search continents" />

    <div class="continents__content">
      <p-overflow-menu-item
        v-for="continent in filteredContinents"
        :key="continent"
        class="continents__item"
        :class="classes.continent(continent)"
        @click="toggle(continent)"
      >
        {{ continent }}

        <p-icon v-if="continent === value" size="small" icon="ChevronRightIcon" class="ml-auto" />
      </p-overflow-menu-item>
    </div>
  </p-card>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  const search = ref()
  const value = defineModel<string | undefined>('value', { required: true })

  const continents = [
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Oceania',
    'South America',
  ]

  const filteredContinents = computed(() => {
    if (!search.value) {
      return continents
    }

    return continents.filter(continent => continent.toLowerCase().includes(search.value.toLowerCase()))
  })

  const classes = computed(() => ({
    continent: (continent: string) => ({
      'p-overflow-menu-item--active': continent === value.value,
    }),
  }))

  function toggle(continent: string): void {
    if (continent === value.value) {
      value.value = undefined
    } else {
      value.value = continent
    }
  }
</script>

<style>
.continents { @apply
  px-2
  flex-col
  flex
  gap-4
}

.continents__item { @apply
  text-xs
  rounded
}

.continents__search { @apply
  mx-2
  w-auto
}

.continents__search .p-text-input__control { @apply
  text-xs
}

.continents__content { @apply
  max-h-96
  overflow-y-auto
}
</style>