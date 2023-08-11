<template>
  <ComponentPage title="Message" :demos="[{ title: 'Dismissible' }, { title: 'Context' }, { title: 'Custom Actions' }]">
    <p-message>
      here is a plain ol' p-message component
    </p-message>

    <template #dismissible>
      <p-message dismissible>
        Messages can be dismissible, and emit @dismiss when clicked
      </p-message>
    </template>

    <template #context>
      <div class="message_context-demo">
        <p-message info dismissible>
          Messages can be styled as "info" for when you want to give the user a tip or display some non-threatening information for the user to consider
        </p-message>

        <p-message warning dismissible>
          Messages can be styled as "warning" for when you want to warn the user of some potential danger that lurks on the page
        </p-message>

        <p-message error dismissible>
          Messages can be styled as "error" for when you want to seriously warn the user that the things they're about to do has consequences!
        </p-message>

        <p-message success dismissible>
          Messages can be styled as "success" for when you're proud of the user and want them to know it.
        </p-message>
      </div>
    </template>

    <template #custom-actions>
      <p-message>
        Messages have a slot (#action) for custom actions!
        <template #action>
          <a href="#" class="flex text-sm font-light gap-2 items-center">
            Details <p-icon class="!h-4 !w-4" icon="ArrowRightIcon" />
          </a>
        </template>
      </p-message>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>

<style>
.message_context-demo { @apply
  flex
  flex-col
  gap-2
}
</style>
