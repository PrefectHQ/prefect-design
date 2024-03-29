<template>
  <p-context-menu :placement="[positions.bottomLeft]" disable-close-on-menu-click class="advanced-demo">
    <template #target="{ toggle }">
      <p-label label="Region">
        <p-button class="advanced-demo__target" small icon-append="ChevronDownIcon" @click.stop="toggle">
          <span v-if="emptyContinent" class="advanced-demo__placeholder">Select a continent to begin</span>
          <span v-else>{{ continent }}</span>

          <template v-if="!emptyContinent">
            <span class="advanced-demo__separator"> / </span>
            <span v-if="emptyCountry" class="advanced-demo__placeholder">Select a country</span>
            <span v-else-if="continent">{{ country }}</span>
          </template>

          <template v-if="!emptyCountry">
            <span class="advanced-demo__separator"> / </span>
            <span v-if="emptyBorders" class="advanced-demo__placeholder">Select borders</span>
            <span v-else>{{ borders.join(', ') }}</span>
          </template>
        </p-button>
      </p-label>
    </template>

    <PCascadePanels :panels="panels" class="advanced-demo__panels">
      <template #continents>
        <Continents v-model:value="continent" class="advanced-demo__panel" />
      </template>

      <template #countries>
        <Countries v-model:value="country" v-model:continent="continent" class="advanced-demo__panel" />
      </template>

      <template #borders>
        <Borders v-model:value="borders" v-model:country="country" class="advanced-demo__panel" />
      </template>
    </PCascadePanels>
  </p-context-menu>
</template>

<script lang="ts" setup>
  import { PCascadePanels } from '@/components'
  import { CascadePanel, useCascadePanels } from '@/compositions'
  import { positions } from '@/utilities'
  import { computed, ref, watchEffect } from 'vue'
  import Borders from '@/demo/components/cascade/Borders.vue'
  import Continents from '@/demo/components/cascade/Continents.vue'
  import Countries from '@/demo/components/cascade/Countries.vue'

  const continent = ref<string>()
  const country = ref<string>()
  const borders = ref<string[]>([])

  const panels: CascadePanel[] = [
    {
      id: 'continents',
      level: 0,
    },
    {
      id: 'countries',
      level: 1,
    },
    {
      id: 'borders',
      level: 2,
    },
  ]

  const { open, openPanelById, closePanelById } = useCascadePanels(panels)
  open()

  const emptyContinent = computed(() => !continent.value)
  const emptyCountry = computed(() => !country.value)
  const emptyBorders = computed(() => !borders.value.length)

  watchEffect(() => {
    if (continent.value) {
      openPanelById('countries')
    }

    if (country.value) {
      borders.value = []
      openPanelById('borders')
    } else {
      borders.value = []
      closePanelById('borders')
    }
  })
</script>

<style>
.advanced-demo__target { @apply
  min-w-48
}

.advanced-demo__target .p-button__content {@apply
  justify-between
  px-1
}

.p-overflow-menu { @apply
  bg-transparent
  shadow-none
  }

.advanced-demo__panels { @apply
  flex
  gap-1
}

.advanced-demo__placeholder,
.advanced-demo__separator { @apply
  text-subdued
}
</style>