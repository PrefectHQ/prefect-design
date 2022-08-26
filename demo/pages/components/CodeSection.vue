<template>
  <Section heading="Code">
    <div>
      This is an <p-code>inline</p-code> code block.
    </div>

    <div class="text-xl mt-8">
      Multiline content
    </div>
    <p-code multiline class="mt-4">
      {{ multilineContent }}
    </p-code>


    <div class="text-xl mt-8">
      Multiline content with code row
    </div>
    <p-code multiline class="mt-4">
      <div v-for="(row, index) in cliRows" :key="index" class="code-row">
        <div class="code-row__leading">
          {{ row.leading }}
        </div>

        <div class="code-row__content">
          {{ row.default }}
        </div>

        <div class="code-row__trailing">
          {{ row.trailing }}
        </div>
      </div>
    </p-code>

    <p-code multiline class="mt-4">
      <div class="code-row">
        <div class="code-row__leading" />
        <div class="code-row__content">
          {{ multilineRow.default }}
        </div>

        <div class="code-row__trailing">
          {{ multilineRow.trailing }}
        </div>
      </div>
    </p-code>


    <div class="text-xl mt-8">
      Multiline content with all leading + trailing
    </div>

    <p-code multiline class="mt-4 max-h-96">
      <div v-for="(row, index) in logRows" :key="index" class="code-row">
        <div class="code-row__leading">
          <p-tag :class="logTypeClasses[row.type]">
            {{ row.type }}
          </p-tag>
        </div>

        <div class="code-row__content">
          {{ row.content }}
        </div>

        <div class="code-row__trailing">
          {{ row.timestamp }}
        </div>
      </div>
    </p-code>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../../components/Section.vue'
  import { PCode } from '@/components'

  const multilineContent = `import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')`

  const cliRows = [
    { leading: '$', default: 'prefect orion start', trailing: new Date().toLocaleTimeString() },
    { leading: ' ', default: 'Starting Orion engine...', trailing: '' },
    { leading: ' ', default: '... db migrations ✅', trailing: '' },
    { leading: ' ', default: '... scheduler ✅', trailing: '' },
    { leading: ' ', default: '... API ✅', trailing: '' },
  ]

  const multilineRow =  {
    leading: '',
    default: `from prefect import flow

@flow
def my_flow():
    return`,
    trailing: '.py',
  }


  const logTypes = ['INFO', 'DEBUG', 'ERROR'] as const
  type LogType = typeof logTypes[number]
  type LogRow = { type: LogType, content: string, timestamp: string }

  const logTypeClasses: Record<LogType, string> = {
    INFO: '!bg-blue-500 !text-white',
    DEBUG: '!bg-slate-500 !text-white',
    ERROR: '!bg-red-500 !text-white',
  }

  const logContent = [
    "print('hello')",
    'json: Allowed all functions that have parameters that have parameters with all arguments and methods.',
    `JSON/XHR: Allowed methods such as GET, POST or DELETE
Node.js: Allowed a set of methods including POST and DELETE, and also allowing the user to bind a JSON or XMLHttpRequest to a function in the console.`,
    'JSON/xml: Allowed a set of parameters such as \'setValue\' or \'setData\' to the specified function. Allowed methods such as GET, POST or DELETE:',
    'Any standard HTTP query (unless using your own function) supports the above options, as long as the above is the order in which you want to run the Javascript session.',
    `Allowed methods
JSON/XHR: Allow any methods that have parameters.
Any standard HTTP query (unless using your own function) supports the above options, as long as the above is the order in which you want to run the Javascript session.`,
    `Optional : In this case if the specified method would like to access a GET or DELETE method, you will have to pass a value to it. If you don't want a single method to have its parameter values on top of the other methods you want to control, you can simply pass a null or array to it as parameter values. Optional parameters support the following options:
optional/parameter: The name of the parameter you want to do with the`,
  ]


  const timestampStart = new Date().getTime()

  const logRows: LogRow[] = [...new Array(200).keys()].map(index =>  {
    return {
      type: logTypes[logTypes.length * Math.random() | 0],
      content:  logContent[logContent.length * Math.random() | 0],
      timestamp: new Date(timestampStart + index * (Math.random() * 6000)).toLocaleTimeString(),
    }
  })
</script>


<style>
.code-row {
  @apply flex w-full;
}

.code-row__leading {
  @apply select-none
  w-[75px]
}

.code-row__content {
  @apply flex-grow select-auto whitespace-pre-wrap;
}

.code-row__trailing {
  @apply text-xs text-slate-500 leading-6;
}
</style>