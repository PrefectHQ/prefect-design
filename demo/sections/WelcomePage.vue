<template>
  <div class="welcome-page">
    <div class="welcome-page__circles-container">
      <component :is="CirclesIcon" class="welcome-page__circles" />
    </div>

    <div class="welcome-page__content-container">
      <div class="welcome-page__content">
        <p-icon class="welcome-page__logo-icon" icon="Prefect" />
        <div class="welcome-page__intro">
          <p class="welcome-page__title">
            <span class="bg-sentiment-positive">Prefect Design</span>
          </p>
          <p class="welcome-page__description">
            Prefect Design is UI Component library built on Vue 3 and Typescript. Components are designed on top of Tailwind CSS, so each component is beautiful and responsive.
          </p>
        </div>
        <p-terminal class="welcome-page__terminal" command="npm i @prefecthq/prefect-design" />
        <div class="welcome-page__links">
          <a href="https://www.prefect.io/">
            <p-button icon="BookOpenIcon">
              Documentation
            </p-button>
          </a>
          <a href="https://github.com/prefectHQ/prefect-design/" target="_blank">
            <p-button icon="GitHubIcon">
              Github
            </p-button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import CirclesIcon from '@/demo/components/CirclesIcon.svg'
</script>

<style>
.welcome-page { @apply
  relative
  overflow-hidden
}

.welcome-page__content-container { @apply
  relative
  max-h-full
  overflow-auto
  w-full
  z-10
}

.welcome-page__content { @apply
  flex
  flex-col
  items-center
  py-10
  gap-10
}

.welcome-page__logo-icon { @apply
  w-52
  h-52
}

.welcome-page__intro { @apply
  flex
  flex-col
  gap-2
  text-justify
  max-w-md
}

.welcome-page__title { @apply
  text-center
  text-4xl
  font-normal
}

.welcome-page__terminal { @apply
  max-w-md
}

.welcome-page__links { @apply
  flex
  gap-2
}

.welcome-page__circles-container { @apply
  -translate-x-1/2
  -translate-y-1/2
  absolute
  left-1/2
  origin-center
  opacity-20
  top-1/2
  select-none
  z-0
}

.welcome-page__circles {
  animation-name: spin;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>