<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import EditorPanel from './components/EditorPanel.vue'
import ListPanel from './components/ListPanel.vue'
import JsonPanel from './components/JsonPanel.vue'
import ViewBuilder from './components/ViewBuilder.vue'
import { useSchemaStore } from './stores/schema'
import { storeToRefs } from 'pinia'

const store = useSchemaStore()
const { isEditing, isJsonView, isViewBuilderOpen, selectedItemId } = storeToRefs(store)
</script>

<template>
  <div class="flex h-screen w-full bg-white font-sans text-gray-900 overflow-hidden">
    <Sidebar />
    <div class="flex flex-1">
      <ListPanel class="w-[400px] border-r border-gray-200" />
      <main class="flex-1 h-full relative flex flex-col">
        <JsonPanel v-if="isJsonView" />
        <ViewBuilder v-else-if="isViewBuilderOpen" />
        <EditorPanel v-else-if="isEditing" />
        <div v-else class="flex items-center justify-center h-full bg-gray-50">
          <p class="text-gray-500">Select an item to view or edit</p>
        </div>
      </main>
    </div>
  </div>
</template>