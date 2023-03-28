<template>
  <ComponentPage title="OrderedList" :demos="demos">
    <template #no-icons>
      <p-ordered-list :items="itemsNoData" />
    </template>

    <template #no-slots>
      <p-ordered-list :items="itemsReversed" />
    </template>

    <template #left-and-right>
      <p-ordered-list :items="itemsReversed">
        <template #left="{ item }">
          <template v-if="item.date">
            <span class="ordered-list__date">{{ item.date }}</span>
          </template>
        </template>

        <template #right="{ item }">
          <p-heading heading="6">
            {{ item.title }}
          </p-heading>

          <p-markdown-renderer :text="item.body" />
        </template>
      </p-ordered-list>
    </template>

    <template #one-side-description>
      <p-toggle v-model="sideToggleValue">
        <template #prepend>
          Left
        </template>

        <template #append>
          Right
        </template>
      </p-toggle>
    </template>

    <template #one-side>
      <p-ordered-list :items="itemsReversed">
        <template #[side]="{ item }">
          <template v-if="sideToggleValue">
            <p-heading heading="6">
              {{ item.title }}
            </p-heading>
          </template>

          <template v-else>
            <span class="ordered-list__date">{{ item.date }}</span>
          </template>
        </template>
      </p-ordered-list>
    </template>

    <template #custom-node>
      <p-ordered-list :items="itemsReversed" class="ordered-list__custom-node">
        <template #node="{ item }">
          <div class="ordered-list__ninja-node">
            <p-icon v-if="item.icon" :icon="item.icon" solid />
          </div>
        </template>
      </p-ordered-list>
    </template>

    <template #custom-node-content>
      <p-ordered-list :items="itemsReversed">
        <template #node-content="{ item }: { item: OrderedListItem }">
          <template v-if="item.title">
            <div class="ordered-list__custom-node-content" />
          </template>
        </template>
      </p-ordered-list>
    </template>

    <template #custom-side>
      <p-ordered-list :items="itemsReversed" class="ordered-list__custom-side">
        <template #right="{ item }: { item: OrderedListItem }">
          <p-card
            :flat="!expandedList.includes(item.id)"
            class="ordered-list__custom-side__card"
            :class="{ 'ordered-list__custom-side__card--expanded': expandedList.includes(item.id) }"
            @click="expand(item)"
          >
            <p-heading heading="6">
              {{ item.title }}
            </p-heading>

            <template v-if="expandedList.includes(item.id) && item.body">
              <p-markdown-renderer :text="item.body" />
            </template>
          </p-card>
        </template>
      </p-ordered-list>
    </template>

    <template #target-a-specific-slot>
      <p-ordered-list :items="itemsReversed" class="ordered-list__target-specific" item-id-key="id">
        <template #left="{ item }: { item: OrderedListItem }">
          <div class="ordered-list__target-specific__left" @mouseover="handleMouseoverItem(item)" @mouseout="handleMouseoutItem">
            {{ item.title }}
          </div>
        </template>

        <template v-if="hoveredItemSlotKey" #[hoveredItemSlotKey]="{ item }: { item: OrderedListItem }">
          <template v-if="item.date">
            <span class="ordered-list__date">{{ item.date }}</span>
          </template>
        </template>
      </p-ordered-list>
    </template>

    <template #virtual-scroller>
      <p-ordered-list :items="itemsManyData">
        <template #left="{ index }">
          {{ index }}
        </template>

        <template #right="{ item }">
          <p-heading heading="6">
            {{ item.title }}
          </p-heading>
        </template>
      </p-ordered-list>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { OrderedListItem } from '@/types/orderedList'
  import { ref, computed } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    {
      title: 'No Icons',
      description: 'This is the default state of the component.',
    },
    {
      title: 'No Slots',
      description: 'This is the default state of the component (when there are icons in the data).',
    },
    {
      title: 'Custom Node',
      description: 'Override the default node item.',
    },
    {
      title: 'Custom Node Content',
      description: 'Override the default node content.',
    },
    {
      title: 'Left and Right',
      description: 'Use left and right slots.',
    },
    {
      title: 'One side',
      description: 'Add some data to just one side of the list item.',
    },
    {
      title: 'Custom side',
      description: 'A slightly more complicated example.',
    },
    {
      title: 'Target a specific slot',
      description: 'Target a specific slot to add some functionality; note that this is easiest when you pass the `itemIdKey` prop.',
    },
    {
      title: 'Virtual Scroller',
      description: 'Uses `PVirtualScroller` under the hood for safety when rendering large lists.',
    },
  ]

  const side = ref<'left' | 'right'>('left')
  const sideToggleValue = computed({
    get() {
      return side.value === 'right'
    },
    set(value) {
      side.value = value ? 'right' : 'left'
    },
  })

  const itemsNoData: OrderedListItem[] = Array.from({ length: 3 }, () => ({
    id: crypto.randomUUID(),
  }))

  const items: OrderedListItem[] = [
    {
      id: 0,
      title: 'Born',
      body: 'I was born in Shangzhou, China.',
    },
    {
      id: crypto.randomUUID(),
      icon: 'AcademicCapIcon',
      title: 'Graduated from the University of Michigan',
      date: '2018-05-01',
      body: 'I graduated from the University of Michigan with a degree in Computer Science and a minor in Mathematics.',
    },
    {
      id: crypto.randomUUID(),
      icon: 'PrefectGradient',
      title: 'Joined Prefect',
      date: '2019-08-01',
      body: 'I joined Prefect as a Software Engineer. I worked on the Prefect Core team, building out the Prefect Cloud and Prefect Server products.',
    },
    {
      id: crypto.randomUUID(),
      title: 'Got a cat',
      body: 'Her name is Luna.',
    },
    {
      id: crypto.randomUUID(),
      icon: 'Slack',
      title: 'Joined Slack',
      date: '2022-12-15',
      body: 'I joined Slack as a Software Engineer. I work on the Slack Core team, building out the Slack product.',
    },
  ]

  const itemsReversed = [...items].reverse()

  const itemsManyData: OrderedListItem[] = Array.from({ length: 1000 }, (item, index) => ({
    id: crypto.randomUUID(),
    title: `Item ${index}`,
  }))

  const expandedList = ref<string[]>([])

  function expand(item: OrderedListItem): void {
    if (expandedList.value.includes(item.id)) {
      expandedList.value = expandedList.value.filter((id) => id !== item.id)
    } else {
      expandedList.value = [...expandedList.value, item.id]
    }
  }

  const hoveredItem = ref<string | null>(null)
  const hoveredItemSlotKey = computed<string>(() => {
    if (hoveredItem.value) {
      return `item-${hoveredItem.value}__right`
    }

    return ''
  })

  const handleMouseoverItem = (item: OrderedListItem): void => {
    hoveredItem.value = item.id
  }

  const handleMouseoutItem = (): void => {
    hoveredItem.value = null
  }
</script>

<style>
.ordered-list .p-toggle__control { @apply
  bg-sky-500
  border-sky-500
}

.ordered-list__date { @apply
  text-sm
  text-gray-500
}

.ordered-list__ninja-node { @apply
  flex
  items-center
  justify-center
  p-1
  rounded
  shadow-sm
  hover:shadow-lg
  text-foreground
  bg-background
  border-2
}

.ordered-list__custom-node .p-ordered-list__item:nth-of-type(1) .ordered-list__ninja-node { @apply
  border-[#995AA0]
}

.ordered-list__custom-node .p-ordered-list__item:nth-of-type(2) .ordered-list__ninja-node { @apply
  border-[#EA9500]
}

.ordered-list__custom-node .p-ordered-list__item:nth-of-type(3) .ordered-list__ninja-node { @apply
  border-[#4C9C23]
}

.ordered-list__custom-node .p-ordered-list__item:nth-of-type(4) .ordered-list__ninja-node { @apply
  border-[#00AAE6]
}

.ordered-list__custom-node .p-ordered-list__item:nth-of-type(5) .ordered-list__ninja-node { @apply
  border-[#E3331C]
}

.ordered-list__custom-side__card { @apply
  cursor-pointer
  transition-all
  py-1
}

.ordered-list__custom-side__card--expanded { @apply
  py-4
}

.ordered-list__target-specific .p-ordered-list__item:hover .p-ordered-list__node,
.ordered-list__custom-side .p-ordered-list__item:hover .p-ordered-list__node { @apply
  transition-all
  scale-125
}

.ordered-list__target-specific__left { @apply
  w-full
  h-full
  py-4
}

.ordered-list__custom-node-content { @apply
  p-2
  bg-amber-500
  rounded-full
  border-4
  border-danger
}
</style>