<template>
  <div class="p-empty-state">
    <div class="p-empty-state__icon">
      <slot name="icon" />
    </div>

    <div class="p-empty-state__heading">
      <slot name="heading" />
    </div>

    <div class="p-empty-state__description">
      <slot name="description" />
    </div>

    <div>
      <slot name="action" />
    </div>
  </div>
</template>


  <style>
  .p-empty-state { @apply
    border-2
    border-gray-300
    bg-white
    rounded-lg
    shadow-sm
    p-32
    flex
    flex-col
    justify-center
    text-center
    gap-y-5
  }

  .p-empty-state__icon { @apply
    flex
    items-center
    justify-center
    gap-x-5
  }

  .p-empty-state__heading { @apply
    text-gray-900
    text-2xl
    font-bold
  }

  .p-empty-state__description { @apply
    text-gray-500
    text-base
    font-normal
  }
  </style>
