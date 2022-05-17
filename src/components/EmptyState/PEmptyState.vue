<template>
  <div
    class="p-empty-state"
  >
    <div class="p-empty-state__icon ">
      <slot name="icon" />
    </div>

    <h3 class="p-empty-state__heading">
      <slot name="heading" />
    </h3>

    <p class="p-empty-state__description">
      <slot name="description" />
    </p>
    <div class="p-empty-state__actions">
      <slot name="actions" />
    </div>
  </div>
</template>


  <style>
  .p-empty-state { @apply
    text-center
    border-2
    border-gray-300
    bg-white
    rounded-lg
    shadow-sm
    p-20
  }

  .p-empty-state__icon { @apply
    mx-auto
    text-gray-400
    flex
    items-center
    justify-center
    gap-x-4
  }

  .p-empty-state__heading { @apply
    mt-9
    text-gray-900
    text-2xl
    font-bold
  }

  .p-empty-state__description { @apply
    text-gray-500
    text-base
    font-normal
    mt-2
  }

  .p-empty-state__actions { @apply
    mt-6
  }
  </style>
