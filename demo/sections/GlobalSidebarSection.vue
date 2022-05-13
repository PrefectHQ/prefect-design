<template>
  <p-global-sidebar>
    <template #upper-links>
      <p-icon icon="PrefectGradient" />
      <p-global-nav-item href="#" icon="CollectionIcon" @click="toggleContextSidebar" />
    </template>

    <template #bottom-links>
      <p-global-nav-item href="#" icon="QuestionMarkCircleIcon" />
    </template>

    <template #profile-button>
      <button v-if="profileImage" type="button">
        <img :src="profileImage" alt="Profile image">
      </button>
      <p-button rounded icon="UserIcon" />
    </template>
  </p-global-sidebar>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const profileImage = ref('https://randomuser.me/api/portraits/women/49.jpg')

  const emit = defineEmits<{
    (event: 'update:value', value: boolean): void,
  }>()

  const showContextSidebar = ref(false)

  const toggleContextSidebar = (): void => {
    showContextSidebar.value = !showContextSidebar.value
    emit('update:value', showContextSidebar.value)
  }
</script>