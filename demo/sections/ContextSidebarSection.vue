<template>
  <p-context-sidebar>
    <template #header>
      <div class="flex flex-col my-3 sm:mt-0">
        <span class="font-normal text-sm mx-3">Acme Technologies</span>
        <span class="font-bold text-base mx-3">DS Team Q1 collection</span>
      </div>
    </template>

    <template #upper-links>
      <router-link
        v-slot="{ href, navigate, isExactActive }"
        to="/dashboard"
        custom
      >
        <p-context-nav-item :is-active="isExactActive" :href="href" title="Dashboard" icon="HomeIcon" @click="navigate" />
      </router-link>
      <router-link
        v-slot="{ href, navigate, isExactActive }"
        to="/flows"
        custom
      >
        <p-context-nav-item :is-active="isExactActive" :href="href" title="Flows" icon="Flow" @click="navigate" />
      </router-link>
    </template>

    <template #bottom-links>
      <router-link
        v-slot="{ href, navigate, isExactActive }"
        to="/edit"
        custom
      >
        <p-context-nav-item :is-active="isExactActive" :href="href" title="Settings" icon="CogIcon" @click="navigate" />
      </router-link>
      <router-link
        v-slot="{ href, navigate, isExactActive }"
        to="/leave"
        custom
      >
        <p-context-nav-item :is-active="isExactActive" :href="href" title="Leave Workspace" icon="LogoutIcon" @click="navigate" />
      </router-link>
    </template>
  </p-context-sidebar>
</template>