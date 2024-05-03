<template>
  <ComponentPage title="Dropdown" :demos="demos">
    <template #basic>
      <p-dropdown-menu>
        <template #trigger>
          <p-button>
            Open
          </p-button>
        </template>
        <p-dropdown-menu-item @click="handleClick">
          <p-icon icon="InboxIcon" size="small" class="mr-2 h-4 w-4" />
          <span>Inbox</span>
        </p-dropdown-menu-item>
        <p-dropdown-menu-item @click="handleClick">
          <p-icon icon="ArchiveBoxIcon" size="small" class="mr-2 h-4 w-4" />
          <span>Archive</span>
        </p-dropdown-menu-item>
        <p-dropdown-menu-item @click="handleClick">
          <p-icon icon="TrashIcon" size="small" class="mr-2 h-4 w-4" />
          <span>Trash</span>
        </p-dropdown-menu-item>
      </p-dropdown-menu>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const handleClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement
    // eslint-disable-next-line no-alert
    alert(`Clicked: ${target.textContent}`)
  }

  const demos = [
    {
      title: 'Basic',
    },

  ]
</script>

