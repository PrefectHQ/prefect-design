<template>
  <div class="min-h-full">
    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <div class="px-4 py-8 sm:px-0">
            <span class="text-2xl">Typography</span>
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Typography />
            </div>
          </div>
          <div class="px-4 py-8 sm:px-0">
            <span class="text-2xl">Buttons</span>
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Buttons />
            </div>
          </div>
          <div class="px-4 py-8 sm:px-0">
            <span class="text-2xl">Forms</span>
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Forms />
            </div>
          </div>

          <div class="px-4 py-8 sm:px-0">
            <span class="text-2xl">Toggle</span>
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Toggle />
            </div>
          </div>

          <div class="px-4 py-8 sm:px-0">
            <span class="text-2xl">Tag</span>
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Tag />
            </div>
          </div>

          <div class="px-4 py-8 sm:px-0">
            <span class="text-2xl">Toast</span>
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Toast />
            </div>
          </div>

          <div class="px-4 py-8 sm:px-0">
            <span class="text-2xl">Modal</span>
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <Modal />
            </div>
          </div>

          <div class="px-4 py-8 sm:px-0">
            <span class="text-2xl">Tag Wrapper</span>
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-4">
              <TagWrapper />
            </div>
          </div>

          <Icons />
          <TablesSection />
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Buttons from './Buttons.vue'
  import Forms from './Forms.vue'
  import Icons from './Icons.vue'
  import Modal from './Modal.vue'
  import TablesSection from './sections/tables/tables.vue'
  import Tag from './Tag.vue'
  import TagWrapper from './TagWrapper.vue'
  import Toast from './Toast.vue'
  import Toggle from './Toggle.vue'
  import Typography from './Typography.vue'
</script>