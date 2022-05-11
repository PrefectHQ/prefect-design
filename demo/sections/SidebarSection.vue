<!-- <template>
  <Teleport to="#app">
    <transition name="slide">
      <p-context-sidebar v-if="showContextSidebar" upper-divider>
        <template #header>
          <h3>Bob Inc</h3>
          <p>Very cool company</p>
        </template>
        <template #upper-links>
          <p>link1</p>
          <p>link2</p>
          <p>link3</p>
        </template>
        <template #bottom-links>
          <p>link-1</p>
          <p>link-2</p>
        </template>
      </p-context-sidebar>
    </transition>

    <p-global-sidebar
      @update:value="toggleContextSidebar"
    >
      <template #upper-links>
        <p-icon icon="PrefectGradient" />
        <p-icon icon="FolderIcon" @click="toggleContextSidebar" />
      </template>

      <template #bottom-links>
        <p-icon icon="LightBulbIcon" />
      </template>

      <template #profile-button>
        <button v-if="profileImage" type="button">
          <img :src="profileImage" alt="Profile image">
        </button>

        <p-button rounded icon="UserIcon" />
      </template>
    </p-global-sidebar>
  </Teleport>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const showContextSidebar = ref(false)

  const toggleContextSidebar = (value: boolean): void => {
    showContextSidebar.value = value
  }

  const profileImage = ref('https://randomuser.me/api/portraits/women/49.jpg')
</script>

<style>
.slide-enter-active {
  @apply
  transition-all
  duration-500
}

.slide-leave-active {
  @apply
  transition-all
  duration-500
}

.slide-enter-from,
.slide-leave-to {
  @apply
  -translate-y-full
  sm:-translate-x-full
  sm:-translate-y-0
 }
</style> -->