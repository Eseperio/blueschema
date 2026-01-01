<script setup lang="ts">
import { 
  Box, 
  Zap, 
  Database, 
  Server, 
  Settings, 
  Shield, 
  Search, 
  Plus, 
  Eye,
  Layers,
} from 'lucide-vue-next';
import { useSchemaStore } from '@/stores/schema';
import { storeToRefs } from 'pinia';
import type { Category } from '@/stores/schema';

const store = useSchemaStore();
const { data, activeCategory, searchQuery, isEditing, selectedItemId } = storeToRefs(store);

const formatLabel = (str: string) => {
  if (typeof str !== 'string') return '';
  return str.replace(/([A-Z])/g, ' $1').trim();
};

const renderCategoryIcon = (cat: Category) => {
  switch (cat) {
    case 'entities': return Box;
    case 'actions': return Zap;
    case 'dataSources': return Database;
    case 'services': return Server;
    case 'environment': return Settings;
    case 'accessControl': return Shield;
    default: return Box;
  }
};

function selectCategory(cat: Category) {
  activeCategory.value = cat;
  isEditing.value = false;
  store.isJsonView = false;
  store.isViewBuilderOpen = false;
  selectedItemId.value = null;
  store.actionPath = [];
}

</script>

<template>
  <div class="w-[280px] bg-gray-50 border-r border-gray-200 flex flex-col h-screen flex-shrink-0">
    <div class="p-4 border-b border-gray-200 bg-white flex items-center gap-3">
      <div class="bg-blue-600 p-2 rounded-lg shadow-sm">
        <Layers class="text-white" :size="20" />
      </div>
      <h1 class="font-bold text-gray-800 text-lg tracking-tight">BlueSchema</h1>
    </div>

    <div class="p-4">
      <div class="relative">
        <Search class="absolute left-3 top-2.5 text-gray-400" :size="16" />
        <input 
          type="text" 
          placeholder="Search..."
          v-model="searchQuery"
          class="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto px-2 space-y-1">
      <button
        v-for="cat in Object.keys(data) as Category[]"
        :key="cat"
        @click="selectCategory(cat)"
        :class="['w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors', {
          'bg-blue-100 text-blue-700': activeCategory === cat,
          'text-gray-600 hover:bg-gray-100 hover:text-gray-900': activeCategory !== cat
        }]"
      >
        <div class="flex items-center gap-3">
          <component :is="renderCategoryIcon(cat)" :size="18" />
          <span class="capitalize">{{ formatLabel(cat) }}</span>
        </div>
        <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', {
          'bg-blue-200 text-blue-800': activeCategory === cat,
          'bg-gray-200 text-gray-600': activeCategory !== cat
        }]">
          {{ data[cat]?.length || 0 }}
        </span>
      </button>
    </nav>

    <div class="p-4 border-t border-gray-200 bg-white space-y-2">
      <button 
        @click="store.showJsonView()"
        class="w-full inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-md font-medium shadow-sm hover:bg-gray-50"
      >
        <Eye :size="16" /> View JSON
      </button>
    </div>
  </div>
</template>
