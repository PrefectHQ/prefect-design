<template>
  <div class="p-accordion">
    <template v-for="section in sections" :key="section">
      <div class="p-accordion__section">
        <slot
          :id="getHeadingId(section)"
          name="header"
          :section="section"
          :selected="isSelected(section)"
          :content="getContentId(section)"
          :toggle="() => toggleSection(section)"
        >
          <button
            :id="getHeadingId(section)"
            type="button"
            :aria-expanded="isSelected(section)"
            :aria-controls="getContentId(section)"
            class="p-accordion__header"
            @click="toggleSection(section)"
          >
            <span class="p-accordion__heading">
              <slot :name="getHeadingId(section)">
                <slot name="heading" :section="section" :selected="isSelected(section)">
                  {{ section }}
                </slot>
              </slot>
            </span>
            <slot name="icon" :section="section">
              <p-icon size="small" icon="ChevronDownIcon" class="p-accordion__icon" :class="getIconClass(section)" />
            </slot>
          </button>
        </slot>

        <PAutoHeightTransition>
          <template v-if="isSelected(section)">
            <div
              :id="getContentId(section)"
              class="p-accordion__content"
              role="region"
              :aria-labelledby="getHeadingId(section)"
            >
              <!-- this is needed because PAutoHeightTransition does not animate an elements padding correctly -->
              <div class="p-accordion__content-padding">
                <slot :name="getContentId(section)">
                  <slot name="content" :section="section" :selected="isSelected(section)" />
                </slot>
              </div>
            </div>
          </template>
        </PAutoHeightTransition>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup generic="const T extends string">
  import { Ref, computed, ref } from 'vue'
  import { PAutoHeightTransition } from '@/components/AutoHeightTransition'
  import { kebabCase } from '@/utilities'

  const props = defineProps<{
    sections: T[],
    selected?: T | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: T | null): void,
  }>()

  const backupSelected: Ref<T | null> = ref(null)

  const selected = computed({
    get() {
      if (props.selected) {
        return props.selected
      }

      if (backupSelected.value) {
        return backupSelected.value
      }

      return null
    },
    set(selected: T | null) {
      backupSelected.value = selected

      emit('update:selected', selected)
    },
  })

  function toggleSection(section: T): void {
    if (isSelected(section)) {
      selected.value = null
      return
    }

    selected.value = section
  }

  function isSelected(section: T): boolean {
    return selected.value === section
  }

  function getIconClass(section: T): string | undefined {
    if (isSelected(section)) {
      return 'p-accordion__icon--open'
    }
  }

  function getHeadingId(section: T): string {
    return `${kebabCase(section)}-heading`
  }

  function getContentId(section: T): string {
    return `${kebabCase(section)}-content`
  }
</script>

<style>
.p-accordion__header { @apply
  w-full
  flex
  gap-2
  items-center
  justify-between
  py-2
  text-base
  text-default
  border-t
  border-default
}

.p-accordion__content-padding { @apply
  pb-2
}

.p-accordion__icon { @apply
  transition-transform
}

.p-accordion__icon--open { @apply
  rotate-180
}
</style>