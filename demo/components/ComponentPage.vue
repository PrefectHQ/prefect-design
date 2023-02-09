<template>
  <div class="component-page">
    <!-- make sticky header -->
    <div class="component-page__heading">
      <p-hash-link class="component-page__heading-link" :hash="title">
        {{ title }}
      </p-hash-link>
      <p-link to="https://www.prefect.io/">
        Documentation
      </p-link>
    </div>

    <template v-if="description || slots.description">
      <div class="component-page__description">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </template>

    <template v-if="validDemosArray.length">
      <div class="component-page__demos">
        <template v-for="demo in validDemosArray" :key="demo.title">
          <div class="component-page__demo">
            <p-hash-link v-if="demo.slotKey && validDemosArray.length > 1" class="component-page__heading-link" :hash="demo.slotKey">
              {{ demo.title }}
            </p-hash-link>

            <template v-if="demo.description">
              <div class="component-page__demo-description">
                {{ demo.description }}
              </div>
            </template>

            <template v-if="useResizable">
              <ResizableSection>
                <slot :name="demo.slotKey" />
              </ResizableSection>
            </template>

            <template v-else>
              <p-card class="component-page__demo-card">
                <slot :name="demo.slotKey" />
              </p-card>
            </template>
          </div>
        </template>
      </div>
    </template>

    <div class="component-page__navigation">
      <template v-if="previousComponent">
        <p-link :to="routeRecordsFlat[previousComponent]" class="component-page__navigation-link">
          <p-icon icon="ArrowNarrowLeftIcon" />
          {{ previousComponent }}
        </p-link>
      </template>
      <template v-else>
        <div />
      </template>

      <template v-if="nextComponent">
        <p-link :to="routeRecordsFlat[nextComponent]" class="component-page__navigation-link">
          {{ nextComponent }}
          <p-icon icon="ArrowNarrowRightIcon" />
        </p-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { asArray, kebabCase } from '@/utilities'
  import { computed, useSlots } from 'vue'
  import { useRoute } from 'vue-router'
  import ResizableSection from '@/demo/components/ResizableSection.vue'
  import { getRouteRecordIndex, routeRecordsFlat } from '@/demo/router/routeRecordsFlat'

  type DemoSection = {
    title: string,
    description?: string,
  }

  const props = defineProps<{
    title: string,
    description?: string,
    demos?: DemoSection | DemoSection[],
    useResizable?: boolean,
  }>()

  const slots = useSlots()
  const route = useRoute()

  const validDemosArray = computed(() => {
    const demos = []

    if (slots.default) {
      demos.push({ title: 'default', slotKey: 'default' })
    }

    if (props.demos) {
      demos.push(...asArray(props.demos))
    }

    return asArray(demos)
      .map(demo => ({
        ...demo,
        slotKey: kebabCase(demo.title),
      }))
      .filter(({ slotKey }) => slotKey in slots)
  })

  const routeIndex = computed(() => getRouteRecordIndex(route))
  const previousComponent = computed(() => routeIndex.value === - 1 ? undefined : Object.keys(routeRecordsFlat)[routeIndex.value - 1])
  const nextComponent = computed(() => routeIndex.value === - 1 ? undefined : Object.keys(routeRecordsFlat)[routeIndex.value + 1])
</script>

<style>
.component-page { @apply
  max-w-full
  relative
}

.component-page__heading { @apply
  flex
  justify-between
  text-sm
  sticky
  bg-background
  dark:bg-background-400
  top-16
  lg:top-0
  px-6
  py-6
  lg:px-8
  z-10
}

.component-page__heading .component-page__heading-link { @apply
  text-2xl
}

.component-page__description .hash-link,
.component-page__demos .hash-link { @apply
  text-lg
}

.component-page__heading-link { @apply
  text-base
}

.component-page__demos { @apply
  max-w-full
  py-4
}

.component-page__description,
.component-page__demos,
.component-page__demo { @apply
  mt-4
  mb-8
}

.component-page__description,
.component-page__demo-description { @apply
  text-foreground-300
  my-2
  text-sm
}

.component-page__demo,
.component-page__description,
.component-page__demo-description { @apply
  max-w-full
  mx-auto
  py-6
  px-6
  lg:px-8
}

.component-page__demo-card { @apply
  bg-transparent
}

.component-page__navigation { @apply
  flex
  justify-between
}

.component-page__navigation-link { @apply
  flex
  gap-1
  items-center
}
</style>