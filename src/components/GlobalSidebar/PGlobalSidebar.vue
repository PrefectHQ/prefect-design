<!-- <template>
  <div class="p-global-sidebar">
    <div class="p-global-sidebar__nav-links">
      <slot name="upper-links" />
      <button @click="toggleContextSidebar">
        Btn
      </button>
    </div>

    <div class="p-global-sidebar__nav-links">
      <slot name="bottom-links" />

      <div class="p-global-sidebar__profile">
        <slot name="profile-button" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const emit = defineEmits<{
    (event: 'update:value', value: boolean): void,
  }>()

  const showContextSidebar = ref(false)

  const toggleContextSidebar = (): void => {
    showContextSidebar.value = !showContextSidebar.value
    emit('update:value', showContextSidebar.value)
  }
</script>

<style>
.p-global-sidebar {
  @apply
  bg-slate-800
  fixed
  h-16
  w-screen
  flex
  flex-row
  items-center
  justify-between
  px-5
  z-10
  sm:h-screen
  sm:w-16
  sm:flex-col
  sm:py-5
}

.p-global-sidebar__nav-links {
  @apply
  flex
  items-center
  gap-3
  flex-row
  sm:gap-5
  sm:flex-col
}

.p-global-sidebar__nav-links>*{
  @apply
  w-6
  fill-slate-400
}

.p-global-sidebar__profile {
  @apply
  cursor-pointer
  h-10
  w-10
  rounded-full
  hidden
  overflow-hidden
  sm:block
}

.p-global-sidebar__show-context {
  @apply
  fill-slate-400
  h-6
  w-6
  block
  sm:hidden
  cursor-pointer
}
</style> -->