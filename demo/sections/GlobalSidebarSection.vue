<template>
  <p-global-sidebar>
    <template #upper-links>
      <p-icon icon="PrefectGradient" class="w-6" />
      <p-global-nav-item href="#" icon="CollectionIcon" />
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
</script>