<template>
  <ComponentPage title="Heading" :demos="[{ title: 'Custom Elements' }]">
    <p-content>
      <PHeading>Heading 1</PHeading>
      <PHeading heading="2">
        Heading 2
      </PHeading>
      <PHeading heading="3">
        Heading 3
      </PHeading>
      <PHeading heading="4">
        Heading 4
      </PHeading>
      <PHeading heading="5">
        Heading 5
      </PHeading>
      <PHeading heading="6">
        Heading 6
      </PHeading>
    </p-content>

    <template #custom-elements>
      <p-content>
        <PHeading element="p">
          Heading 1
        </PHeading>
        <PHeading element="p" heading="2">
          Heading 2
        </PHeading>
        <PHeading element="p" heading="3">
          Heading 3
        </PHeading>
        <PHeading element="p" heading="4">
          Heading 4
        </PHeading>
        <PHeading element="p" heading="5">
          Heading 5
        </PHeading>
        <PHeading element="p" heading="6">
          Heading 6
        </PHeading>
      </p-content>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PHeading from '@/components/Heading/PHeading.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>