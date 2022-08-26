<template>
  <Section heading="Pop Overs">
    <SubSection heading="Composition - Manual">
      <div class="flex items-center gap-2">
        <position-select v-model:position="position" />
        <p-toggle v-model="showManual">
          <template #append>
            Show
          </template>
        </p-toggle>
      </div>
      <div ref="manualContainer" class="relative bg-slate-500 p-2 my-2">
        <div>
          container
        </div>
        <div ref="manualTarget" class="inline-block bg-black text-white m-20 p-2">
          target
        </div>
        <template v-if="showManual">
          <div ref="manualContent" class="bg-primary text-white p-2" :style="manualStyles">
            <span>Manual Composition Content</span>
          </div>
        </template>
      </div>

      {{ manualStyles }}
    </SubSection>

    <SubSection heading="Composition - Dynamic">
      <div class="flex items-center gap-2">
        <position-select v-model:position="positions" />
        <p-toggle v-model="showDynamic">
          <template #append>
            Show
          </template>
        </p-toggle>
      </div>
      <div ref="dynamicContainer" class="relative bg-slate-500 p-2 my-2">
        <div>
          container
        </div>
        <div ref="dynamicTarget" class="inline-block bg-black text-white m-20 p-2">
          target
        </div>
        <template v-if="showDynamic">
          <div ref="dynamicContent" class="bg-primary text-white p-20" :style="dynamicStyles">
            <span>Dynamic Composition Content</span>
          </div>
        </template>
      </div>
      {{ dynamicStyles }}
    </SubSection>


    <SubSection heading="Component">
      <position-select v-model:position="componentPositions" />
      <p-pop-over :placement="componentPositions" class="inline-block" auto-close>
        <template #target="{ toggle }">
          <p-button class="mt-2" @click="toggle">
            Target
          </p-button>
        </template>
        <div class="bg-primary text-white p-20">
          <span>Component Content</span>
        </div>
      </p-pop-over>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import PositionSelect from '../../components/PositionSelect.vue'
  import Section from '../../components/Section.vue'
  import SubSection from '../../components/SubSection.vue'
  import PButton from '@/components/Button/PButton.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import PToggle from '@/components/Toggle/PToggle.vue'
  import { usePositionStyles, useMostVisiblePositionStyles } from '@/compositions/position'
  import { left, right, top } from '@/utilities/position'

  const position = ref(left)
  const showManual = ref(false)
  const {
    target: manualTarget,
    content: manualContent,
    container: manualContainer,
    styles: manualStyles,
  } = usePositionStyles(position)

  const positions = ref([left, right])
  const showDynamic = ref(false)
  const {
    target: dynamicTarget,
    content: dynamicContent,
    container: dynamicContainer,
    styles: dynamicStyles,
  } = useMostVisiblePositionStyles(positions)

  const componentPositions = ref([top])
</script>