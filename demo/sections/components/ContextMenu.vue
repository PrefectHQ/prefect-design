<template>
  <ComponentPage title="Context Menu" :demos="demos">
    <template #description>
      The `p-context-menu` component is a wrapper around the `p-pop-over` component that provides a context menu for a target element. It contains slots for the following:
      - default - the content of the `p-overflow-menu` component (generally `p-overflow-menu-item`)
      - target - the target element that will trigger the context menu
      - context-menu - an override for the default `p-overflow-menu` in case the default isn't quite what you need
    </template>

    <PContextMenu auto-close>
      <template #target="{ toggle }">
        <PButton @click="toggle">
          Click me
        </PButton>
      </template>

      <POverflowMenuItem>Item 1</POverflowMenuItem>
      <POverflowMenuItem>Item 2</POverflowMenuItem>
    </PContextMenu>

    <template #position-at-click>
      <PContextMenu auto-close position-at-click>
        <template #target="{ close, open }">
          <PWindow class="w-full h-full">
            <div class="relative text-subdued w-[480px] h-[200px]" @click.right.prevent="open" @click="close">
              Right click to bring up a context menu
            </div>
          </PWindow>
        </template>

        <POverflowMenuItem>Item 1</POverflowMenuItem>
        <POverflowMenuItem>Item 2</POverflowMenuItem>
      </PContextMenu>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PContextMenu from '@/components/ContextMenu/PContextMenu.vue'
  import POverflowMenuItem from '@/components/OverflowMenuItem/POverflowMenuItem.vue'
  import PWindow from '@/components/Window/PWindow.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    {
      title: 'Position at click',
    },
  ]
</script>