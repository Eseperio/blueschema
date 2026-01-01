<script setup lang="ts">
import { useSchemaStore } from '@/stores/schema'
import { storeToRefs } from 'pinia'
import { ChevronRight, Copy, Trash2, Search, Folder, Zap, Plus } from 'lucide-vue-next'
import type { SchemaItem, EntityItem, ActionItem, DataSourceItem, EnvironmentItem, RoleItem, GroupItem } from '@/stores/schema';
import Badge from './Badge.vue';
import { computed } from 'vue';

const store = useSchemaStore()
const { filteredItems, activeCategory, actionPath, data, selectedItemId } = storeToRefs(store)

const formatLabel = (str: string) => {
  if (typeof str !== 'string') return '';
  return str.replace(/([A-Z])/g, ' $1').trim();
};

const getDisplayName = (item: SchemaItem) => {
  // @ts-ignore
  return item.title || item.name || 'Unnamed';
};

const handleItemClick = (item: SchemaItem) => {
  if ('actions' in item) {
    store.navigateToGroup(item.id);
  } else {
    store.editFormState = JSON.parse(JSON.stringify(item));
    store.selectedItemId = item.id;
    store.isEditing = true;
  }
};

const handleDelete = (id: string, e: MouseEvent) => {
  e.stopPropagation();
  if (!confirm('Are you sure you want to delete this item?')) return;
  store.deleteItem(id);
};

const handleDuplicate = (item: SchemaItem, e: MouseEvent) => {
  e.stopPropagation();
  store.duplicateItem(item);
};

const breadcrumbs = computed(() => {
  if (activeCategory.value !== 'actions') return [];
  const crumbs = [{ name: 'Actions', path: [] as string[] }];
  let currentPath: string[] = [];
  let currentLevel = data.value.actions;
  for (const groupId of actionPath.value) {
    const group = currentLevel.find(item => 'actions' in item && item.id === groupId) as GroupItem | undefined;
    if (group) {
      currentPath.push(groupId);
      crumbs.push({ name: group.name, path: [...currentPath] });
      currentLevel = group.actions;
    }
  }
  return crumbs;
});

const navigateBreadcrumb = (path: string[]) => {
  actionPath.value = path;
};

const isGroup = (item: SchemaItem): item is GroupItem => {
  return 'actions' in item;
}

</script>

<template>
  <div class="bg-white h-full flex flex-col">
     <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
        <div>
          <div class="flex items-baseline gap-2">
            <h2 class="text-xl font-bold text-gray-900 capitalize tracking-tight">{{ formatLabel(activeCategory) }}</h2>
            <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{ filteredItems.length }} items</span>
          </div>
          <p v-if="activeCategory !== 'actions'" class="text-sm text-gray-500 mt-1">Manage definitions and properties.</p>
        </div>
        <div class="flex items-center gap-4">
          <div v-if="activeCategory === 'actions'" class="flex gap-2">
            <button @click="store.createNewItem('action')" class="text-xs bg-white text-blue-700 px-2 py-1 rounded shadow-sm hover:bg-gray-50">+ action</button>
            <button @click="store.createNewItem('group')" class="text-xs bg-white text-green-700 px-2 py-1 rounded shadow-sm hover:bg-gray-50">+ group</button>
          </div>
          <button v-else @click="store.createNewItem()" class="text-xs bg-white text-blue-700 px-2 py-1 rounded shadow-sm hover:bg-gray-50">+ item</button>
        </div>
     </div>

     <div v-if="activeCategory === 'actions'" class="px-6 py-2 border-b border-gray-200 bg-gray-50 text-sm">
        <span v-for="(crumb, index) in breadcrumbs" :key="index">
          <button @click="navigateBreadcrumb(crumb.path)" class="hover:underline">{{ crumb.name }}</button>
          <span v-if="index < breadcrumbs.length - 1" class="mx-2">></span>
        </span>
      </div>

     <div class="flex-1 overflow-y-auto p-2">
       <div v-if="filteredItems.length === 0" class="flex flex-col items-center justify-center h-64 text-gray-400">
         <Search :size="48" class="mb-4 opacity-20" />
         <p>No items found.</p>
       </div>
       <div v-else class="space-y-1">
          <div 
             v-for="item in filteredItems" 
             :key="item.id" 
             @click="handleItemClick(item)"
             :class="['p-3 rounded-lg cursor-pointer group', { 'bg-blue-100': selectedItemId === item.id, 'hover:bg-gray-50': selectedItemId !== item.id }]"
           >
            <div class="flex justify-between">
              <div class="text-base text-gray-900 flex items-center gap-2">
                 <Folder v-if="isGroup(item)" :size="16" class="text-gray-400" />
                 <Zap v-else-if="activeCategory === 'actions'" :size="16" class="text-gray-400" />
                 {{ getDisplayName(item) }}
               </div>
               <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                    @click="handleDuplicate(item, $event)"
                    class="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-100 rounded-md transition-colors"
                    title="Duplicate"
                  >
                   <Copy :size="16" />
                 </button>
                 <button 
                    @click="handleDelete(item.id, $event)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-md transition-colors"
                    title="Delete"
                  >
                   <Trash2 :size="16" />
                 </button>
               </div>
            </div>
            <div class="text-xs text-gray-500 truncate max-w-xs mt-0.5 mb-1">{{ item.description || '-' }}</div>
            <div class="mt-2 flex gap-2 flex-wrap">
              <template v-if="activeCategory === 'entities'">
                <Badge color="blue">{{ (item as EntityItem).fields?.length || 0 }} fields</Badge>
                <Badge color="purple">{{ (item as EntityItem).relations?.length || 0 }} rels</Badge>
                <Badge v-if="(item as EntityItem).timestamps" color="gray">Timestamps</Badge>
              </template>
              <template v-if="activeCategory === 'actions'">
                <template v-if="isGroup(item)">
                  <Badge color="green">{{ item.actions.length }} items</Badge>
                  <Badge color="gray">{{ item.routeSuffix }}</Badge>
                </template>
                <template v-else>
                  <Badge v-if="(item as ActionItem).responseFormat" color="purple">{{ (item as ActionItem).responseFormat }}</Badge>
                  <Badge v-if="(item as ActionItem).route" color="green">{{ (item as ActionItem).route }}</Badge>
                </template>
              </template>
              <template v-if="activeCategory === 'dataSources'">
                <Badge color="orange">{{ (item as DataSourceItem).type || 'unknown' }}</Badge>
              </template>
              <template v-if="activeCategory === 'environment'">
                <Badge v-if="(item as EnvironmentItem).required" color="red">Required</Badge>
                <Badge v-else color="gray">Optional</Badge>
              </template>
              <template v-if="activeCategory === 'accessControl'">
                <Badge color="blue">{{ (item as RoleItem).permissions?.length || 0 }} perms</Badge>
              </template>
            </div>
           </div>
       </div>
     </div>
  </div>
</template>