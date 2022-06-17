<template>
  <Section heading="Card">
    <SubSection heading="Regular">
      <p-card>
        <h1>This is a Card component</h1>
      </p-card>
    </SubSection>
    <SubSection heading="Button">
      <p-card-button>
        <h1>This is a Card button component</h1>
      </p-card-button>
    </SubSection>
    <SubSection heading="Button with router-link">
      <p-card-button to="/tables">
        <h1>This is a Card button component using a router link</h1>
      </p-card-button>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/Section.vue'
  import SubSection from '../components/SubSection.vue'
</script>