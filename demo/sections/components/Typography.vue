<template>
  <ComponentPage
    title="Typography"
    :demos="[
      { title: 'Fonts' },
      { title: 'Adjusting Dates for Offset' },
    ]"
  >
    <template #fonts>
      <div class="mb-4">
        <p class="text-xs">
          Text-xs
        </p>
        <p class="text-sm text-gray-500">
          Font-size: 12px; Line-height: 16px;
        </p>
        <p class="text-sm text-gray-500">
          Use for metadata, tooltips
        </p>
      </div>
      <div class="mb-4">
        <p class="text-sm">
          Text-sm
        </p>
        <p class="text-sm text-gray-500">
          Font-size: 14px; Line-height: 20px;
        </p>
        <p class="text-sm text-gray-500">
          Use for form field labels, Key/Value pairs
        </p>
      </div>
      <div class="mb-4">
        <p class="text-base">
          Text-base
        </p>
        <p class="text-sm text-gray-500">
          Font-size: 16px; Line-height: 24px;
        </p>
        <p class="text-sm text-gray-500">
          Use for body text
        </p>
      </div>
      <div class="mb-4">
        <p class="text-lg">
          <b>Text-lg</b>
        </p>
        <p class="text-sm text-gray-500">
          Font-size: 18px; Line-height: 28px; font-weight: bold;
        </p>
        <p class="text-sm text-gray-500">
          Use for body text headings
        </p>
      </div>
      <div class="mb-4">
        <p class="text-xl">
          <b>Text-xl</b>
        </p>
        <p class="text-sm text-gray-500">
          Font-size: 20px; Line-height: 28px; font-weight: bold;
        </p>
        <p class="text-sm text-gray-500">
          Use for Seconary page headings (Modals, Panels)
        </p>
      </div>
      <div class="mb-4">
        <p class="text-2xl">
          <b>Text-2xl</b>
        </p>
        <p class="text-sm text-gray-500">
          Font-size: 24px; Line-height: 32px; font-weight: bold;
        </p>
        <p class="text-sm text-gray-500">
          Use for Primary Page Navigation Headers (Breadcrumb)
        </p>
      </div>
      <div class="mb-4">
        <p class="text-3xl">
          <b>Text-3xl</b>
        </p>
        <p class="text-sm text-gray-500">
          Font-size: 30px; Line-height: 36px; font-weight: bold;
        </p>
        <p class="text-sm text-gray-500">
          Use for Hero Text Headings (Empty States, Marketing Screens)
        </p>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'

</script>