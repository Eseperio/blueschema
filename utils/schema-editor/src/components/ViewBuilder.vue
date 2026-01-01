<script setup lang="ts">
import { useSchemaStore } from '@/stores/schema'
import { storeToRefs } from 'pinia'
import { VueDraggableNext } from 'vue-draggable-next'
import { Plus, Trash2, X } from 'lucide-vue-next'
import type { ViewItem, RowItem, ColumnItem, ComponentItem, ActionItem } from '@/stores/schema'
import { computed } from 'vue';

const store = useSchemaStore()
const { editFormState } = storeToRefs(store)

const view = computed(() => (editFormState.value as ActionItem).view!)

const availableComponents: ComponentItem[] = [
  { id: 'comp-table', type: 'table' },
  { id: 'comp-list', type: 'list' },
  { id: 'comp-card', type: 'card' },
  { id: 'comp-cardWithIcon', type: 'cardWithIcon' },
  { id: 'comp-menuHorizontal', type: 'menuHorizontal' },
  { id: 'comp-menuVertical', type: 'menuVertical' },
]

const addRow = () => {
  view.value.rows.push({
    id: `row_${Date.now()}`,
    columns: [
      {
        id: `col_${Date.now()}`,
        width: 100,
        components: [],
      },
    ],
  })
}

const addColumn = (row: RowItem) => {
  row.columns.push({
    id: `col_${Date.now()}`,
    width: 100,
    components: [],
  })
  // Recalculate widths
  const width = 100 / row.columns.length
  row.columns.forEach(col => col.width = width)
}

const removeRow = (rowIndex: number) => {
  view.value.rows.splice(rowIndex, 1)
}

const removeColumn = (row: RowItem, colIndex: number) => {
  row.columns.splice(colIndex, 1)
  // Recalculate widths
  const width = 100 / row.columns.length
  row.columns.forEach(col => col.width = width)
}

const removeComponent = (col: ColumnItem, compIndex: number) => {
  col.components.splice(compIndex, 1)
}

const cloneComponent = (comp: ComponentItem) => {
  return {
    ...comp,
    id: `comp_${Date.now()}`,
  }
}

const closeViewBuilder = () => {
  store.isViewBuilderOpen = false;
}
</script>

<template>
  <div v-if="editFormState" class="flex h-full">
    <!-- Component Palette -->
    <div class="w-64 bg-gray-50 border-r p-4">
      <h3 class="font-bold mb-4">Components</h3>
      <VueDraggableNext
        :list="availableComponents"
        :group="{ name: 'components', pull: 'clone', put: false }"
        :sort="false"
        :clone="cloneComponent"
        class="space-y-2"
      >
        <div v-for="comp in availableComponents" :key="comp.id" class="p-2 border rounded bg-white cursor-move">
          {{ comp.type }}
        </div>
      </VueDraggableNext>
    </div>

    <!-- Canvas -->
    <div class="flex-1 p-6 overflow-y-auto">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold mb-4">View Builder: {{ view.name }}</h2>
        <button @click="closeViewBuilder" class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm">
          <X :size="16" /> Close
        </button>
      </div>
      
      <div class="space-y-4 p-4">
        <VueDraggableNext :list="view.rows" group="rows" class="space-y-4">
          <div v-for="(row, rowIndex) in view.rows" :key="row.id" class="relative group min-h-[50px] p-2 hover:border-dashed hover:border-2 hover:border-indigo-400">
            <!-- Row Controls -->
            <div class="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 flex items-center gap-1 bg-white rounded-bl-lg shadow-md z-10">
              <button @click="addColumn(row)" class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Add Column</button>
              <button @click="removeRow(rowIndex)" class="text-red-500 hover:text-red-700 p-1">
                <Trash2 :size="16" />
              </button>
            </div>
            
            <div class="flex gap-2">
              <VueDraggableNext :list="row.columns" group="columns" class="flex flex-1 gap-2 p-2">
                <div v-for="(col, colIndex) in row.columns" :key="col.id" class="relative flex-grow group p-2 hover:border-dashed hover:border-2 hover:border-green-400" :style="{ width: col.width + '%' }">
                   <!-- Column Controls -->
                   <div class="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 bg-white rounded-bl-lg shadow-md z-10">
                    <button @click="removeColumn(row, colIndex)" class="text-red-500 hover:text-red-700 p-1">
                      <Trash2 :size="16" />
                    </button>
                   </div>

                  <VueDraggableNext
                    :list="col.components"
                    group="components"
                    class="min-h-[100px] p-2"
                  >
                    <div v-for="(comp, compIndex) in col.components" :key="comp.id" class="p-2 border rounded bg-white cursor-move mb-2">
                      <div class="flex items-center justify-between">
                        <span>{{ comp.type }}</span>
                        <button @click="removeComponent(col, compIndex)" class="text-red-500 hover:text-red-700">
                          <Trash2 :size="14" />
                        </button>
                      </div>
                    </div>
                  </VueDraggableNext>
                </div>
              </VueDraggableNext>
            </div>
          </div>
        </VueDraggableNext>

        <button @click="addRow" class="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600">
          <Plus :size="16" /> Add Row
        </button>
      </div>
    </div>
  </div>
  <div v-else class="p-6">
    <p>Select a view to start editing.</p>
  </div>
</template>
