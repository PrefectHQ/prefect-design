<template>
  <ComponentPage
    title="Design tokens"
    :demos="[
      { title: 'Semantics and naming conventions' },
      { title: 'Backgrounds and borders' },
      { title: 'Text' },
      { title: 'Selectables' },
    ]"
  >
    <template #description>
      Design tokens are the smallest unit of design in Prefect. They provide values for things like colors, spacing, and typography.
    </template>

    <template #semantics-and-naming-conventions>
      <p class="design_tokens__paragraph">
        We aim to ensure design tokens are semantic, their name implies their use case and how specific that use case is. This helps us keep our design system consistent and easy to use, while enabling themes and broadly deployed future aesthetic changes.
      </p>
      <p class="design_tokens__paragraph">
        For example, <p-code inline>
          text-default
        </p-code> is a semantic name for a color used by default on text. <p-code inline>
          text-slate-800
        </p-code> is more arbitrary and hard to keep consistent.
      </p>
      <p class="design_tokens__paragraph">
        There are two types of design tokens in our system: <strong>root</strong> tokens and <strong>component</strong> tokens. Root tokens are more generic and used broadly. Component tokens are scoped to a specific component or component type, often the value of these tokens is a root token.
      </p>
      <p class="design_tokens__paragraph">
        All our tokens are defined as CSS variables and prefixed with <p-code inline>
          --p-
        </p-code>, then the rest of the token naming fallowing our naming conventions described below.
      </p>
      <p class="design_tokens__paragraph">
        Root tokens are also provided as tailwind classes, but we try and control the specificity as much as possible. For example, a token intended only for background colors is provided as a tailwind background color class, not a generic color class, whereas a more generic token like <p-code inline>
          --p-color-live
        </p-code> is provided as a tailwind color class and can be used as such (e.g. <p-code inline>
          bg-live
        </p-code>, <p-code inline>
          border-live
        </p-code>, <p-code inline>
          text-live
        </p-code>, etc).
      </p>

      <h3 class="design_tokens__subheader">
        Naming root tokens
      </h3>
      <p class="design_tokens__paragraph">
        Root tokens are named using the following convention:
      </p>
      <p-code class="design_tokens__code-block">
        // * = required
        <br>
        --p-{category*}-{property}-{use case*}-{variant}
      </p-code>
      <ul class="design_tokens__list">
        <li>
          <p-code inline>
            {category}
          </p-code> (required) is the category of the token, e.g. <p-code inline>
            color
          </p-code>, <p-code inline>
            spacing
          </p-code>, <p-code inline>
            typography
          </p-code>, etc.
        </li>
        <li>
          <p-code inline>
            {property}
          </p-code> is the surface the token is intended for, e.g. <p-code inline>
            bg
          </p-code>, <p-code inline>
            border
          </p-code>, <p-code inline>
            text
          </p-code>, etc.
        </li>
        <li>
          <p-code inline>
            {use case}
          </p-code> (required) is the semantic use of the token, e.g. <p-code inline>
            default
          </p-code>, <p-code inline>
            subdued
          </p-code>, <p-code inline>
            selectable
          </p-code>, etc.
        </li>
        <li>
          <p-code inline>
            {variant}
          </p-code> is for alternate variations of the token, e.g. <p-code inline>
            positive
          </p-code>, <p-code inline>
            neutral
          </p-code>, <p-code inline>
            negative
          </p-code>, etc.
        </li>
      </ul>
      <p class="design_tokens__paragraph">
        Examples:
      </p>
      <p-code class="design_tokens__code-block">
        --p-color-text-default
        <br>
        --p-color-text-subdued
        <br>
        // Format: --p-{category}-{property}-{use case}
      </p-code>
      <p-code class="design_tokens__code-block">
        --p-color-syntax-comment
        <br>
        --p-color-syntax-selector
        <br>
        --p-color-syntax-parameter
        <br>
        // Format: --p-{category}-{use case}-{variant}
      </p-code>

      <h3 class="design_tokens__subheader">
        Naming component tokens
      </h3>
      <p class="design_tokens__paragraph">
        Component tokens are named using the following convention:
      </p>
      <p-code class="design_tokens__code-block">
        // * = required
        <br>
        --p-{category*}-{pattern*}-{variant}-{property}-{state}
      </p-code>
      <ul class="design_tokens__list">
        <li>
          <p-code inline>
            {category}
          </p-code> (required) is the category of the token, e.g. <p-code inline>
            color
          </p-code>, <p-code inline>
            spacing
          </p-code>, <p-code inline>
            typography
          </p-code>, etc.
        </li>
        <li>
          <p-code inline>
            {pattern}
          </p-code> (required) is the pattern of the component or component type, e.g. <p-code inline>
            button
          </p-code>, <p-code inline>
            input
          </p-code>, <p-code inline>
            tag
          </p-code>, etc.
        </li>
        <li>
          <p-code inline>
            {variant}
          </p-code> is for alternate variations of the token, e.g. <p-code inline>
            default
          </p-code>, <p-code inline>
            primary
          </p-code>, <p-code inline>
            danger
          </p-code>, etc.
        </li>
        <li>
          <p-code inline>
            {property}
          </p-code> is the CSS property the token is intended for, e.g. <p-code inline>
            bg
          </p-code>, <p-code inline>
            border
          </p-code>, <p-code inline>
            text
          </p-code>, etc.
        </li>
        <li>
          <p-code inline>
            {state}
          </p-code> is the state of the component, e.g. <p-code inline>
            hover
          </p-code>, <p-code inline>
            active
          </p-code>, <p-code inline>
            focus
          </p-code>, etc.
        </li>
      </ul>
      <p class="design_tokens__paragraph">
        Examples:
      </p>
      <p-code class="design_tokens__code-block">
        --p-color-input-bg
        <br>
        --p-color-input-border
        <br>
        --p-color-input-text
        <br>
        --p-color-input-placeholder
        <br>
        // Format: --p-{category}-{pattern}-{property}
      </p-code>
      <p-code class="design_tokens__code-block">
        --p-color-button-primary-bg-hover
        <br>
        --p-color-button-danger-bg-active
        <br>
        --p-color-button-default-border-hover
        <br>
        // Format: --p-{category}-{pattern}-{variant}-{property}-{state}
      </p-code>
    </template>

    <template #backgrounds-and-borders>
      <p class="design_tokens__paragraph">
        There are 3 base levels of background colors. If we encounter a design calling for more levels of background colors than this, we should reconsider the design.
      </p>
      <div class="border border-default rounded-md my-4 p-6">
        <p><strong>Level 0:</strong> The base background color of the application, applied globally.</p>
        <div class="p-background mt-4 p-6 rounded-md">
          <p>
            <strong>Level 1:</strong> Add the class <p-code inline>
              p-background
            </p-code> directly to a container to apply the level 1 background color. Used on cards by default.
          </p>
          <div class="p-background mt-4 p-6 rounded-md">
            <p>
              <strong>Level 2:</strong> Adding the class <p-code inline>
                p-background
              </p-code> directly to a container will automatically apply the level 2 background color when it's nested within a level 1 background, using a simple <p-code inline>
                .p-background + .p-background {}
              </p-code> style.
            </p>
          </div>
        </div>
      </div>
      <p class="design_tokens__paragraph">
        There are two additional background colors for specific use cases. These need to work on all backgrounds.
      </p>
      <div class="border border-default rounded-md my-4 p-6">
        <p>On level 0</p>
        <div class="bg-floating shadow-lg inline-block p-2 rounded-md mt-4">
          `bg-floating` is for floating elements, like dropdowns and tooltips.
        </div>
        <p-code class="mt-4">
          `bg-code` is for code blocks and inline code snippets.
        </p-code>
        <div class="p-background mt-4 p-6 rounded-md">
          <p>On level 1</p>
          <div class="bg-floating shadow-lg inline-block p-2 rounded-md mt-4">
            bg-floating
          </div>
          <p-code class="mt-4">
            bg-code
          </p-code>
          <div class="p-background mt-4 p-6 rounded-md">
            <p>On level 2</p>
            <div class="bg-floating shadow-lg inline-block p-2 rounded-md mt-4">
              bg-floating
            </div>
            <p-code class="mt-4">
              bg-code
            </p-code>
          </div>
        </div>
      </div>
      <p class="design_tokens__paragraph">
        For borders, we strive for them to work well on all backgrounds. We have 1 root border token, <p-code inline>
          --p-divider
        </p-code>, for layout level divider lines. All other border colors are component level tokens.
      </p>
      <div class="border border-default rounded-md my-4 p-6">
        <p>On level 0</p>
        <p-divider />
        <div class="p-background mt-4 p-6 rounded-md">
          <p>On level 1</p>
          <p-divider />
          <div class="p-background mt-4 p-6 rounded-md">
            <p>On level 2</p>
            <p-divider />
          </div>
        </div>
      </div>
    </template>

    <template #text>
      Here are our text color tokens and some notes about them.

      <p-table class="mt-4" :data="textTokenTableData" />
    </template>

    <template #selectables>
      <p class="design_tokens__paragraph">
        Our platform features numerous selectable UI elements, including navigation, button groups, tabs, etc. We use a couple tokens to keep these consistent.
      </p>
      <p class="design_tokens__paragraph">
        Most of the time we use the <p-code inline>
          --p-color-selectable-hover
        </p-code> and <p-code inline>
          --p-color-selected
        </p-code> tokens. Such as in the <p-link :to="routeRecordsFlat['p-button-group']">
          Button Group
        </p-link> or <p-link :to="routeRecordsFlat['p-context-sidebar']">
          Context Sidebar
        </p-link> components. The <p-link :to="routeRecordsFlat['p-overflow-menu']">
          Overflow Menu
        </p-link> component shows how just the hover style could be used, when selections aren't persistent.
      </p>
      <p class="design_tokens__paragraph">
        In rare cases, the <p-code inline>
          --p-color-text-selected
        </p-code> token is used, such as in the <p-link :to="routeRecordsFlat['p-tab']">
          Tabs
        </p-link> and <p-link :to="routeRecordsFlat['p-wizard']">
          Wizard
        </p-link> components.
      </p>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { TableData } from '@/types'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { routeRecordsFlat } from '@/demo/router/routeRecordsFlat'

  const textTokenTableData = [
    {
      'Name': '--p-color-text-default',
      'Tailwind class': 'text-default',
      'Notes': 'The default text color applied globally.',
    },
    {
      'Name': '--p-color-text-subdued',
      'Tailwind class': 'text-subdued',
      'Notes': '',
    },
    {
      'Name': '--p-color-text-inverse',
      'Tailwind class': 'text-inverse',
      'Notes': 'For use on light backgrounds in dark mode, and vice versa.',
    },
    {
      'Name': '--p-color-text-link',
      'Tailwind class': 'text-link',
      'Notes': '',
    },
    {
      'Name': '--p-color-text-code',
      'Tailwind class': 'text-code',
      'Notes': 'Primarily used as the default code color in code blocks and inline code snippets.',
    },
    {
      'Name': '--p-color-text-invalid',
      'Tailwind class': 'text-invalid',
      'Notes': '',
    },
    {
      'Name': '--p-color-text-selected',
      'Tailwind class': 'text-selected',
      'Notes': 'Used sparingly in certain components, like tabs, more information below in the Selectables section.',
    },
  ] satisfies TableData
</script>

<style>
.design_tokens__subheader { @apply
  text-lg
  font-semibold
  mb-4
}

.design_tokens__paragraph { @apply
  text-base
  max-w-xl
}

.design_tokens__paragraph + .design_tokens__paragraph,
.design_tokens__code-block + .design_tokens__code-block,
.design_tokens__paragraph + .design_tokens__code-block,
.design_tokens__code-block + .design_tokens__paragraph { @apply
  mt-4
}

.design_tokens__paragraph + .design_tokens__subheader,
.design_tokens__code-block + .design_tokens__subheader { @apply
  mt-8
}

.design_tokens__list { @apply
  list-disc
  ml-8
  my-4
  flex
  flex-col
  gap-2
}
</style>