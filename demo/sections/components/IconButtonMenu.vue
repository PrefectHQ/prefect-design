<template>
  <ComponentPage title="Icon Button Menu" :demos="[{ title: 'Icon Button Menu' }]">
    <template #icon-button-menu>
      <div class="icon-button-menu__container">
        <p-icon-button-menu>
          <template #default="{ close }">
            <p-overflow-menu-item icon="ArchiveBoxArrowDownIcon" label="Archive" @click="close" />
            <p-overflow-menu-item icon="ArrowDownCircleIcon" label="Move Down" @click="close" />
            <p-overflow-menu-item icon="ArrowUpCircleIcon" label="Move Up" @click="close" />
            <p-overflow-menu-item icon="ArrowRightCircleIcon" label="Move Right" @click="close" />
          </template>
        </p-icon-button-menu>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PIconButtonMenu from '@/components/IconButtonMenu/PIconButtonMenu.vue'
  import POverflowMenuItem from '@/components/OverflowMenuItem/POverflowMenuItem.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>

<style>
.icon-button-menu__container { @apply
  h-64
}
</style>