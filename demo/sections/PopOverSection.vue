<template>
  <Section heading="Pop Overs">
    <SubSection heading="Composition - Manual">
      <position-select v-model:position="position" />
      <div ref="manualContainer" class="relative bg-slate-500 p-2 my-2">
        <div>
          container
        </div>
        <div ref="manualTarget" class="inline-block bg-black text-white m-20 p-2">
          target
        </div>
        <div ref="manualContent" class="bg-primary text-white p-2" :style="manualStyles">
          content<br>test
        </div>
      </div>

      {{ manualStyles }}
    </SubSection>


    <SubSection heading="Composition - Dynamic">
      <position-select v-model:position="positions" multiple />
      <div ref="dynamicContainer" class="relative bg-slate-500 p-2 my-2">
        <div>
          container
        </div>
        <div ref="dynamicTarget" class="inline-block bg-black text-white m-20 p-2">
          target
        </div>
        <div ref="dynamicContent" class="bg-primary text-white p-20" :style="dynamicStyles">
          content<br>test
        </div>
      </div>
      {{ dynamicStyles }}
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import PositionSelect from '../components/PositionSelect.vue'
  import Section from '../components/Section.vue'
  import SubSection from '../components/SubSection.vue'
  import { usePositionStyles, useMostVisiblePositionStyles } from '@/compositions/placement'
  import { left, right } from '@/utilities/position'

  const position = ref(left)
  const manualTarget = ref<HTMLDivElement>()
  const manualContent = ref<HTMLDivElement>()
  const manualContainer = ref<HTMLDivElement>()
  const manualStyles = usePositionStyles(manualTarget, manualContent, manualContainer, position)

  const positions = ref([left, right])
  const dynamicTarget = ref()
  const dynamicContent = ref()
  const dynamicContainer = ref()
  const dynamicStyles = useMostVisiblePositionStyles(dynamicTarget, dynamicContent, dynamicContainer, positions)
</script>