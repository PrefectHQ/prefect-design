<!-- <template>
  <a
    :href="href"
    :class="isActive ? 'active-class' : 'inactive-class'"
    class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 focus:outline-none transition duration-150 ease-in-out hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
    active-class="border-indigo-500 text-gray-900 focus:border-indigo-700"
    inactive-class="text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
  >
    <p-icon :icon="icon" class="w-10 h-10" />
    <span>{{ title }}</span>
  </a>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  console.log(RouterLink)

  defineProps<{
    href: string,
    title: string,
    icon?: string,
    isActive: boolean,
  }>()
</script>

<style>
</style> -->