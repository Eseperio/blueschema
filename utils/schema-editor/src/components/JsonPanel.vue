<script setup lang="ts">
import { useSchemaStore } from '@/stores/schema'
import { storeToRefs } from 'pinia'
import { Download, X } from 'lucide-vue-next'

const store = useSchemaStore()
const { generatedJson } = storeToRefs(store)

const close = () => {
  store.isJsonView = false
}
</script>

<template>
  <div class="bg-white h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-20">
      <h2 class="text-xl font-bold text-gray-900">Generated JSON</h2>
      <div class="flex gap-3">
        <button 
          @click="close"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm"
        >
          <X :size="16" /> Close
        </button>
        <button 
          @click="store.downloadJson"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm"
        >
          <Download :size="16" /> Download
        </button>
      </div>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto p-6 bg-gray-50/50">
      <div class="max-w-4xl mx-auto">
        <pre class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-sm whitespace-pre-wrap break-all">{{ generatedJson }}</pre>
      </div>
    </div>
  </div>
</template>
