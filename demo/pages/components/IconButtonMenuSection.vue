<template>
  <Section heading="Icon Button Menu">
    <p-icon-button-menu>
      <template #default="{ close }">
        <p-overflow-menu-item icon="ArchiveIcon" label="Archive" @click="close" />
        <p-overflow-menu-item icon="ArrowCircleDownIcon" label="Move Down" @click="close" />
        <p-overflow-menu-item icon="ArrowCircleUpIcon" label="Move Up" @click="close" />
        <p-overflow-menu-item icon="ArrowCircleRightIcon" label="Move Right" @click="close" />
      </template>
    </p-icon-button-menu>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../../components/Section.vue'
  import PIconButtonMenu from '@/components/IconButtonMenu/PIconButtonMenu.vue'
  import POverflowMenuItem from '@/components/OverflowMenuItem/POverflowMenuItem.vue'
</script>