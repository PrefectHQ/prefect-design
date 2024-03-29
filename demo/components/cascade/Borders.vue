<template>
  <p-card class="borders">
    <p-text-input v-model="search" class="borders__search" placeholder="Search borders" />

    <transition name="fade" mode="out-in">
      <p-loading-icon v-if="loading" class="borders__loading-icon" />

      <div v-else-if="empty" class="borders__empty">
        No borders found
      </div>

      <div v-else class="borders__content">
        <p-virtual-scroller :items="items" class="borders__scroller">
          <template #default="{ item: { border } }">
            <p-overflow-menu-item class="borders__item" :class="classes.border(border)" @click="toggle(border)">
              {{ border }}
              <p-icon v-if="value.includes(border)" size="small" icon="CheckIcon" class="ml-auto" />
            </p-overflow-menu-item>
          </template>
        </p-virtual-scroller>
      </div>
    </transition>
  </p-card>
</template>

<script setup lang="ts">
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'

  const search = ref()
  const loading = ref(false)
  const country = defineModel<string | undefined>('country', { required: true })
  const value = defineModel<string[]>('value', { default: [] })

  type CountryResponse = {
    borders: string[],
  }


  const fetchBorders = async (country: string): Promise<string[]> => {
    if (!country) {
      return []
    }

    loading.value = true

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country.toLowerCase()}?fullText=true`)
      const data = await response.json()
      return data.map((country: CountryResponse) => country.borders).flat().filter((border: string) => border)
    } catch {
      return []
    } finally {
      setTimeout(() => loading.value = false, 1000)
    }
  }

  const subscriptionArgs = computed <[string] | null>(() => {
    if (!country.value) {
      return null
    }

    return [country.value]
  })

  const subscription = useSubscriptionWithDependencies(fetchBorders, subscriptionArgs)
  const borders = computed<string[]>(() => subscription.response ?? [])
  const empty = computed(() => filteredborders.value.length === 0 && !loading.value)

  const filteredborders = computed(() => {
    if (!search.value) {
      return borders.value
    }

    return borders.value.filter(border => border.toLowerCase().includes(search.value.toLowerCase()))
  })

  const items = computed(() => {
    return filteredborders.value.map((border) => ({
      border,
    }))
  })

  const classes = computed(() => ({
    border: (border: string) => ({
      'p-overflow-menu-item--active': value.value.includes(border),
    }),
  }))

  function toggle(country: string): void {
    if (value.value.includes(country)) {
      value.value = value.value.filter(border => border !== country)
    } else {
      value.value = [...value.value, country]
    }
  }
</script>


<style>
.borders { @apply
  px-0
  flex
  flex-col
  min-h-56
  min-w-64
}

.borders__item { @apply
  text-xs
  rounded
}

.borders__search { @apply
  mx-4
  shrink
  w-auto
  mb-4
}

.borders__search .p-text-input__control { @apply
  text-xs
}

.borders__content { @apply
  overflow-hidden
  max-h-96
  px-4
  grow
  relative
}

.borders__close { @apply
  ml-auto
  text-subdued
}

.borders__scroller { @apply
  overflow-y-auto
  max-h-96
}

.borders__loading-icon { @apply
  mx-auto
}

.borders__empty { @apply
  flex
  justify-center
  text-xs
  items-center
  text-subdued
}

.fade-enter-active, .fade-leave-active { @apply
  transition-opacity
}

.fade-enter, .fade-leave-to { @apply
  opacity-0
}
</style>