<template>
  <Section heading="Pop Overs">
    <placement-select v-model:position="position" />
    <div ref="container" class="relative">
      <div ref="target" class="inline-block bg-black text-white m-20 p-2">
        target
      </div>
      <div ref="content" class="bg-primary text-white p-2" :style="styles">
        content<br>test
      </div>
    </div>

    {{ styles }}
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import PlacementSelect from '../components/PlacementSelect.vue'
  import Section from '../components/Section.vue'
  import { usePositionStyles } from '@/compositions/placement'
  import { left } from '@/utilities/placement'

  const position = ref(left)

  const target = ref()
  const content = ref()
  const container = ref()

  const styles = usePositionStyles(target, content, container, position)
</script>

<style></style>