<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight, ChevronDown } from 'lucide-vue-next'

defineProps<{
  title: string,
  defaultOpen?: boolean
}>()

const isOpen = ref(false)
</script>

<template>
  <div class="border border-gray-200 rounded-lg mb-4 bg-white overflow-hidden">
    <button 
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
    >
      <span class="font-semibold text-gray-700 text-sm">{{ title }}</span>
      <ChevronDown v-if="isOpen" :size="16" />
      <ChevronRight v-else :size="16" />
    </button>
    <div v-if="isOpen" class="p-4 border-t border-gray-200">
      <slot></slot>
    </div>
  </div>
</template>
