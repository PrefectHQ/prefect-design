<template>
  <ComponentPage title="Timeline" :demos="demos" use-resizable>
    <template #description>
      <p-content>
        <p-label label="Layout">
          <p-button-group v-model="layout" size="sm" :options="['default', 'stacked', 'alternate']" />
        </p-label>
        <p-label v-if="layout == 'stacked'" label="alignment">
          <p-button-group v-model="alignInternal" size="sm" :options="['left', 'center', 'right']" />
        </p-label>
      </p-content>
    </template>

    <template #no-icons>
      <p-timeline :items="itemsNoData" v-bind="{ layout, align }" />
    </template>

    <template #no-slots>
      <p-timeline :items="itemsReversed" v-bind="{ layout, align }" />
    </template>

    <template #date-and-content>
      <p-timeline :items="itemsReversed" v-bind="{ layout, align }">
        <template #date="{ item }">
          <template v-if="item.date">
            <span class="ordered-list__date">{{ item.date }}</span>
          </template>
        </template>

        <template #content="{ item }">
          <p-heading heading="6">
            {{ item.title }}
          </p-heading>

          <p-markdown-renderer :text="item.body" />
        </template>
      </p-timeline>
    </template>

    <template #one-side-description>
      <p-toggle v-model="sideToggleValue">
        <template #prepend>
          Date
        </template>

        <template #append>
          Content
        </template>
      </p-toggle>
    </template>

    <template #one-side>
      <p-timeline :items="itemsReversed" v-bind="{ layout, align }">
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
      </p-timeline>
    </template>

    <template #custom-point>
      <p-timeline :items="itemsReversed" class="ordered-list__custom-point" v-bind="{ layout, align }">
        <template #point="{ item }">
          <div class="ordered-list__ninja-point">
            <p-icon v-if="item.icon" :icon="item.icon" solid />
          </div>
        </template>
      </p-timeline>
    </template>

    <template #custom-point-content>
      <p-timeline :items="itemsReversed" v-bind="{ layout, align }">
        <template #point-content>
          <div class="ordered-list__custom-point-content" />
        </template>
      </p-timeline>
    </template>

    <template #custom-side>
      <p-timeline :items="itemsReversed" class="ordered-list__custom-side" v-bind="{ layout, align }">
        <template #content="{ item }: { item: TimelineItem }">
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
      </p-timeline>
    </template>

    <template #target-a-specific-slot>
      <p-timeline :items="itemsReversed" class="ordered-list__target-specific" item-key="id" v-bind="{ layout, align }">
        <template #date="{ item }: { item: TimelineItem }">
          <div class="ordered-list__target-specific__content" @mouseover="handleMouseoverItem(item)" @mouseout="handleMouseoutItem">
            {{ item.title }}
          </div>
        </template>

        <template v-if="hoveredItemSlotKey" #[hoveredItemSlotKey]="{ item }: { item: TimelineItem }">
          <template v-if="item.date">
            <span class="ordered-list__date">{{ item.date }}</span>
          </template>
        </template>
      </p-timeline>
    </template>

    <template #virtual-scroller>
      <p-timeline :items="itemsManyData" class="ordered-list__virtual-scroller" v-bind="{ layout, align }">
        <template #date="{ index }">
          {{ index }}
        </template>

        <template #content="{ item }">
          <p-heading heading="6">
            {{ item.title }}
          </p-heading>
        </template>
      </p-timeline>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { TimelineAlignment, TimelineItem, TimelineLayout } from '@/types/timeline'
  import { ref, computed } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    {
      title: 'No icons',
      description: 'This is the default state of the component.',
    },
    {
      title: 'No slots',
      description: 'This is the default state of the component (when there are icons in the data).',
    },
    {
      title: 'Custom point',
      description: 'Override the default point item.',
    },
    {
      title: 'Custom point content',
      description: 'Override the default point content.',
    },
    {
      title: 'Date and content',
      description: 'Use the date and content slots.',
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
      description: 'Target a specific slot to add some functionality; note that this is easiest when you pass the `itemKey` prop.',
    },
    {
      title: 'Virtual scroller',
      description: 'Uses `PVirtualScroller` under the hood for safety when rendering large lists.',
    },
  ]

  const layout = ref<TimelineLayout>('default')

  const alignInternal = ref<TimelineAlignment>('left')
  const align = computed(() => {
    if (layout.value !== 'stacked') {
      return undefined
    }

    return alignInternal.value
  })
  const side = ref<'content' | 'date'>('date')
  const sideToggleValue = computed({
    get() {
      return side.value === 'content'
    },
    set(value) {
      side.value = value ? 'content' : 'date'
    },
  })

  const itemsNoData: TimelineItem[] = Array.from({ length: 3 }, () => ({
    id: crypto.randomUUID(),
  }))

  const items: TimelineItem[] = [
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

  const itemsManyData: TimelineItem[] = Array.from({ length: 1000 }, (item, index) => ({
    id: crypto.randomUUID(),
    title: `Item ${index}`,
  }))

  const expandedList = ref<string[]>([])

  function expand(item: TimelineItem): void {
    if (expandedList.value.includes(item.id)) {
      expandedList.value = expandedList.value.filter((id) => id !== item.id)
    } else {
      expandedList.value = [...expandedList.value, item.id]
    }
  }

  const hoveredItem = ref<string | null>(null)
  const hoveredItemSlotKey = computed<string>(() => {
    if (hoveredItem.value) {
      return `item-${hoveredItem.value}-content`
    }

    return ''
  })

  const handleMouseoverItem = (item: TimelineItem): void => {
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

.ordered-list__ninja-point { @apply
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

.ordered-list__custom-point .p-timeline-item:nth-of-type(1) .ordered-list__ninja-point { @apply
  border-[#995AA0]
}

.ordered-list__custom-point .p-timeline-item:nth-of-type(2) .ordered-list__ninja-point { @apply
  border-[#EA9500]
}

.ordered-list__custom-point .p-timeline-item:nth-of-type(3) .ordered-list__ninja-point { @apply
  border-[#4C9C23]
}

.ordered-list__custom-point .p-timeline-item:nth-of-type(4) .ordered-list__ninja-point { @apply
  border-[#00AAE6]
}

.ordered-list__custom-point .p-timeline-item:nth-of-type(5) .ordered-list__ninja-point { @apply
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

.ordered-list__target-specific .p-timeline-item:hover .p-timeline-point,
.ordered-list__custom-side .p-timeline-item:hover .p-timeline-point { @apply
  transition-all
  scale-125
}

.ordered-list__target-specific__content { @apply
  w-full
  h-full
}

.ordered-list__custom-point-content { @apply
  p-2
  bg-amber-500
  rounded-full
  border-4
  border-danger
}

.ordered-list__virtual-scroller { @apply
  h-96
  overflow-auto
}
</style>