<template>
  <ComponentPage title="Icon Button Menu" :demos="[{ title: 'Icon Button Menu' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-icon-button-menu
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #icon-button-menu>
      <div class="icon-button-menu__container">
        <p-icon-button-menu>
          <template #default="{ close }">
            <p-overflow-menu-item icon="ArchiveIcon" label="Archive" @click="close" />
            <p-overflow-menu-item icon="ArrowCircleDownIcon" label="Move Down" @click="close" />
            <p-overflow-menu-item icon="ArrowCircleUpIcon" label="Move Up" @click="close" />
            <p-overflow-menu-item icon="ArrowCircleRightIcon" label="Move Right" @click="close" />
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