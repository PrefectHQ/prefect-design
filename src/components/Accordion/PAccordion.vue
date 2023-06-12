<template>
  <div class="p-accordion">
    <template v-for="section in sections" :key="section">
      <div class="p-accordion__section">
        <div class="p-accordion__header">
          <!-- dynamic slot names don't work great yet -->
          <!-- @vue-ignore -->
          <slot :name="`${section}-heading`">
            {{ section }}
          </slot>
          <p-button
            size="sm"
            icon="ChevronDownIcon"
            flat
            rounded
            class="p-accordion__button"
            :class="getButtonClass(String(section))"
            @click="toggleSection(String(section))"
          />
        </div>

        <PAutoHeightTransition>
          <template v-if="isOpen(String(section))">
            <div class="p-accordion__content">
              <div class="p-accordion__content-padding">
                <!-- dynamic slot names don't work great yet -->
                <!-- @vue-ignore -->
                <slot :name="`${section}-content`" />
              </div>
            </div>
          </template>
        </PAutoHeightTransition>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup generic="const T extends Readonly<string[]>">
  import { Ref, ref } from 'vue'
  import { PAutoHeightTransition } from '@/components/AutoHeightTransition'

  const props = defineProps<{
    sections: T,
  }>()

  type AccordionSlots<T extends Readonly<string[]>> = {
    // this is the type vue wants sadly
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in T[number] as `${K}-heading`]?: (props: {}) => unknown
  } & {
    // this is the type vue wants sadly
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in T[number] as `${K}-content`]: (props: {}) => unknown
  }

  defineSlots<AccordionSlots<T>>()

  const open: Ref<T[number] | null> = ref(props.sections[0])

  function toggleSection(section: string): void {
    if (isOpen(section)) {
      open.value = null
      return
    }

    open.value = section
  }

  function isOpen(section: string): boolean {
    return open.value === section
  }

  function getButtonClass(section: string): string | undefined {
    if (isOpen(section)) {
      return 'p-accordion__button--open'
    }
  }
</script>

<style>
.p-accordion__header { @apply
  text-base
  py-2
  border-t
  border-foreground-200
  flex
  justify-between
  items-center
}

.p-accordion__content-padding { @apply
  pb-2
}

.p-accordion__button { @apply
  transition-transform
}

.p-accordion__button--open { @apply
  rotate-180
}
</style>