<template>
  <Section heading="List Items">
    <SubSection heading="Regular">
      <div class="grid gap-2">
        <template v-for="i in 3" :key="i">
          <p-list-item>
            List Item {{ i }}
          </p-list-item>
        </template>
      </div>
    </SubSection>
    <SubSection heading="Inputs">
      <div class="grid gap-2">
        <template v-for="i in 3" :key="i">
          <p-list-item-input v-model:selected="selected" :value="i">
            List Item {{ i }}
          </p-list-item-input>
        </template>
      </div>

      <div class="mt-2">
        {{ selected }}
      </div>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../../components/Section.vue'
  import SubSection from '../../components/SubSection.vue'
  import PListItem from '@/components/ListItem/PListItem.vue'
  import PListItemInput from '@/components/ListItemInput/PListItemInput.vue'

  const selected = ref([1])
</script>