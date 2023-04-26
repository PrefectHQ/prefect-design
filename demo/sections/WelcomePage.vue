<template>
  <div class="welcome-page">
    <component :is="CirclesIcon" class="welcome-page__circles" />
    <p-icon class="welcome-page__logo-icon" icon="PrefectLight" />
    <div class="welcome-page__intro">
      <p class="welcome-page__title">
        Prefect Design
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
        <p-button class="welcome-page__github-link" icon="GitHubIcon">
          Github
        </p-button>
      </a>
      <p-link :to="routeRecordsFlat[firstComponent]">
        <p-button secondary icon="ArrowRightIcon">
          Get Started
        </p-button>
      </p-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import CirclesIcon from '@/demo/components/CirclesIcon.svg'
  import { routeRecordsFlat } from '@/demo/router/routeRecordsFlat'

  const [firstComponent] = Object.keys(routeRecordsFlat)
</script>

<style>
.welcome-page { @apply
  relative
  flex
  flex-col
  items-center
  gap-10
  overflow-hidden
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
  font-light
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

.welcome-page__github-link { @apply
  text-white
  bg-black
  focus:ring-black
}

.welcome-page__github-link:not(.p-button--disabled) { @apply
  hover:bg-neutral-900
}

.welcome-page__logo-icon,
.welcome-page__intro,
.welcome-page__title,
.welcome-page__description,
.welcome-page__terminal,
.welcome-page__links { @apply
  z-10
}

.welcome-page__circles { @apply
  text-foreground-50/25
  z-0
  absolute;
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