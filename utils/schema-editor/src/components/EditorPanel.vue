<script setup lang="ts">
import { useSchemaStore } from '@/stores/schema'
import { storeToRefs } from 'pinia'
import { ChevronRight, Save, X, Plus, Type, AlertCircle, Trash2, Key } from 'lucide-vue-next'
import CollapsibleSection from './CollapsibleSection.vue';
import type { EntityItem, ActionItem, ServiceItem, DataSourceItem, EnvironmentItem, RoleItem, RelationItem, Hooks, GroupItem } from '@/stores/schema';
import { computed, ref } from 'vue';

const store = useSchemaStore()
const { editFormState, activeCategory } = storeToRefs(store)

const activeValidationFieldIdx = ref<number | null>(null);

const hookNames: (keyof Hooks)[] = ['beforeCreate', 'afterCreate', 'beforeUpdate', 'afterUpdate', 'beforeDelete', 'afterDelete', 'beforeValidate', 'afterValidate'];

const isGroup = computed(() => editFormState.value && 'actions' in editFormState.value && activeCategory.value === 'actions');

const formatLabel = (str: string) => {
  if (typeof str !== 'string') return '';
  return str.replace(/([A-Z])/g, ' $1').trim();
};

const addField = () => {
  const item = editFormState.value as EntityItem;
  if (!item.fields) {
    item.fields = [];
  }
  item.fields.push({ name: 'new_field', type: 'string', required: false, validation: {} });
};

const removeField = (idx: number) => {
  const item = editFormState.value as EntityItem;
  item.fields.splice(idx, 1);
};

const addRelation = () => {
  const item = editFormState.value as EntityItem;
  const typeEl = document.getElementById('newRelType') as HTMLSelectElement;
  const targetEl = document.getElementById('newRelTarget') as HTMLInputElement;
  if (targetEl.value) {
    const newRel: RelationItem = {
      type: typeEl.value as any,
      targetEntity: targetEl.value,
      sourceField: 'id',
      targetField: `${item.tableName.slice(0, -1)}_id`
    };
    if (!item.relations) {
      item.relations = [];
    }
    item.relations.push(newRel);
    targetEl.value = '';
  }
};

const removeRelation = (idx: number) => {
  const item = editFormState.value as EntityItem;
  item.relations.splice(idx, 1);
};

const addPermission = () => {
  const item = editFormState.value as RoleItem;
  const input = document.getElementById('newPermInput') as HTMLInputElement;
  if (input.value) {
    if (!item.permissions) {
      item.permissions = [];
    }
    item.permissions.push(input.value);
    input.value = '';
  }
};

const removePermission = (idx: number) => {
  const item = editFormState.value as RoleItem;
  item.permissions.splice(idx, 1);
};

const parseJsonConfig = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  try {
    const parsed = JSON.parse(target.value);
    (editFormState.value as DataSourceItem).config = parsed;
  } catch (err) { 
    // Ignore invalid JSON while typing
  }
};

const save = () => {
  if (!editFormState.value) return;
  store.saveItem();
}

</script>

<template>
  <div v-if="editFormState" class="bg-white h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-20">
      <div>
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <span class="capitalize">{{ formatLabel(activeCategory) }}</span>
          <ChevronRight :size="14" />
          <span>{{ editFormState.id.startsWith('new') ? 'New Item' : 'Editing' }}</span>
        </div>
        <div v-if="activeCategory === 'services'" class="text-2xl font-bold text-gray-900">
          {{ (editFormState as ServiceItem).title || 'Untitled Service' }}
        </div>
        <input 
          v-else
          type="text" 
          v-model="editFormState.name"
          class="text-2xl font-bold text-gray-900 border-none focus:ring-0 p-0 w-full placeholder-gray-300"
          placeholder="Item Name"
        />
      </div>
      <div class="flex gap-3">
          <button 
            @click="store.isEditing = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm"
          >
            Cancel
          </button>
          <button 
            @click="save"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm"
          >
            <Save :size="16" /> Save Changes
          </button>
      </div>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto p-6 bg-gray-50/50">
      <div class="max-w-4xl mx-auto space-y-6">
        
        <div v-if="activeCategory !== 'services'" class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            v-model="(editFormState.description as any)"
            rows="8"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Describe the purpose of this element..."
          />
        </div>

        <!-- ENTITY EDITOR -->
        <template v-if="activeCategory === 'entities'">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Table Settings</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Table Name (snake_case)</label>
                    <input 
                      type="text" 
                      v-model="(editFormState as EntityItem).tableName"
                      class="w-full p-2 border border-gray-300 rounded-md font-mono text-sm"
                    />
                </div>
                <div class="flex flex-col gap-3 pt-6">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      v-model="(editFormState as EntityItem).timestamps"
                      class="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span class="text-sm text-gray-700">Enable Timestamps</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      v-model="(editFormState as EntityItem).softDeletes"
                      class="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span class="text-sm text-gray-700">Enable Soft Deletes</span>
                  </label>
                </div>
              </div>
          </div>

          <CollapsibleSection :title="`Fields (${(editFormState as EntityItem).fields?.length || 0})`" :defaultOpen="true">
            <div class="space-y-4">
              <div v-for="(field, idx) in (editFormState as EntityItem).fields" :key="idx" class="bg-gray-50 border border-gray-200 rounded-md p-3 relative group hover:border-blue-300 transition-colors">
                <div class="flex items-center gap-3">
                  <Type :size="16" class="text-gray-400" />
                  <div class="flex-1 grid grid-cols-4 gap-4 items-center">
                    <input 
                      v-model="field.name"
                      class="font-mono text-sm bg-transparent border-none focus:ring-0 p-0 text-blue-700 font-semibold"
                      placeholder="field_name"
                    />
                    <select 
                      v-model="field.type"
                      class="text-sm bg-transparent border-none focus:ring-0 p-0 text-gray-600"
                    >
                        <option v-for="t in ['string','text','integer','boolean','uuid','datetime','decimal']" :key="t" :value="t">{{t}}</option>
                    </select>
                    
                    <div class="flex gap-2 text-xs">
                      <span v-if="field.primaryKey" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">PK</span>
                      <span v-if="field.required" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Req</span>
                      <span v-if="field.unique" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">Unq</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2">
                      <button 
                        @click="activeValidationFieldIdx = activeValidationFieldIdx === idx ? null : idx"
                        :class="['p-1', 'rounded', activeValidationFieldIdx === idx ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-blue-600']"
                        title="Validation Rules"
                      >
                        <AlertCircle :size="16" />
                      </button>
                      <button 
                        @click="removeField(idx)"
                        class="text-gray-400 hover:text-red-500"
                      >
                        <X :size="16" />
                      </button>
                  </div>
                </div>

                <!-- Validation Panel -->
                <div v-if="activeValidationFieldIdx === idx" class="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-4 text-xs bg-white p-3 rounded">
                    <div class="space-y-2">
                        <label class="flex items-center gap-2">
                          <input type="checkbox" v-model="field.required" /> Required
                        </label>
                        <label class="flex items-center gap-2">
                          <input type="checkbox" v-model="field.unique" /> Unique
                        </label>
                        <label v-if="field.validation" class="flex items-center gap-2">
                          <input type="checkbox" v-model="field.validation.email" /> Is Email
                        </label>
                    </div>
                    <div v-if="field.validation" class="space-y-2">
                        <div class="flex gap-2 items-center">
                          <span>Min Len:</span>
                          <input type="number" class="w-16 border rounded px-1" v-model="field.validation.minLength" />
                        </div>
                        <div class="flex gap-2 items-center">
                          <span>Pattern:</span>
                          <input type="text" class="flex-1 border rounded px-1 font-mono" placeholder="Regex..." v-model="field.validation.pattern" />
                        </div>
                    </div>
                </div>
              </div>
              <button 
                @click="addField"
                class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-blue-400 hover:text-blue-600 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus :size="16" /> Add Field
              </button>
            </div>
          </CollapsibleSection>

          <CollapsibleSection :title="`Relations (${(editFormState as EntityItem).relations?.length || 0})`">
              <div class="space-y-3">
                <div v-for="(rel, idx) in (editFormState as EntityItem).relations" :key="idx" class="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm">
                    <div class="flex justify-between items-start mb-2">
                      <div class="flex gap-2 items-center">
                        <span :class="['px-2', 'py-0.5', 'rounded', 'text-xs', 'font-bold', rel.type === 'hasMany' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800']">
                            {{rel.type}}
                        </span>
                        <span class="font-bold text-gray-700">{{rel.targetEntity}}</span>
                      </div>
                      <button @click="removeRelation(idx)" class="text-gray-400 hover:text-red-500"
>
                          <Trash2 :size="14" />
                      </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <div>Source: <span class="font-mono text-gray-700">{{rel.sourceField}}</span></div>
                      <div>Target: <span class="font-mono text-gray-700">{{rel.targetField}}</span></div>
                      <div>OnDelete: {{rel.onDelete || 'N/A'}}</div>
                    </div>
                </div>
                
                <div class="p-3 border-2 border-dashed border-gray-200 rounded-md bg-gray-50/50">
                    <div class="text-xs text-gray-400 font-medium mb-2 uppercase text-center">New Relation</div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                      <select id="newRelType" class="text-xs p-1 border rounded">
                          <option value="hasOne">Has One</option>
                          <option value="hasMany">Has Many</option>
                      </select>
                      <input id="newRelTarget" placeholder="Target Entity" class="text-xs p-1 border rounded" />
                    </div>
                    <button 
                      @click="addRelation"
                      class="w-full py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-100"
                    >
                      Add Relation
                    </button>
                </div>
              </div>
          </CollapsibleSection>

          <CollapsibleSection title="Hooks">
            <div v-if="(editFormState as EntityItem).hooks" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="hook in hookNames" :key="hook">
                <label class="block text-sm font-medium text-gray-700 mb-1 capitalize">{{ hook.replace(/([A-Z])/g, ' $1').trim() }}</label>
                <textarea 
                  v-model="(editFormState as EntityItem).hooks![hook]"
                  rows="8"
                  class="w-full p-2 border border-gray-300 rounded-md text-sm"
                  :placeholder="`Prompt for ${hook}...`"
                />
              </div>
            </div>
          </CollapsibleSection>
        </template>
        
        <!-- ACTION EDITOR -->
        <template v-if="activeCategory === 'actions'">
          <div v-if="isGroup">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">Route Suffix</label>
              <input 
                type="text" 
                v-model="(editFormState as GroupItem).routeSuffix"
                class="w-full p-2 border border-gray-300 rounded-md font-mono text-sm"
                placeholder="/v1"
              />
            </div>
          </div>
          <template v-else>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Route / Endpoint</label>
                    <div class="relative">
                      <span class="absolute left-3 top-2 text-gray-400 font-mono text-sm">/</span>
                      <input 
                        type="text" 
                        :value="(editFormState as ActionItem).route ? String((editFormState as ActionItem).route).replace(/^\//, '') : ''"
                        @input="(editFormState as ActionItem).route = `/${($event.target as HTMLInputElement).value}`"
                        class="w-full pl-6 p-2 border border-gray-300 rounded-md font-mono text-sm"
                        placeholder="users/:id"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Response Format</label>
                    <select 
                      v-model="(editFormState as ActionItem).responseFormat"
                      class="w-full p-2 border border-gray-300 rounded-md bg-white"
                    >
                      <option value="json">JSON</option>
                      <option value="xml">XML</option>
                      <option value="html">HTML</option>
                      <option value="text">Text</option>
                    </select>
                  </div>
                </div>
              </div>

              <CollapsibleSection title="Parameters" :defaultOpen="true">
                <div class="space-y-3">
                  <div v-for="param in (editFormState as ActionItem).parameters" :key="param.name" class="flex gap-2 items-center p-3 bg-gray-50 border rounded text-sm">
                      <span class="font-bold text-gray-700 w-1/4">{{param.name}}</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">{{param.in}}</span>
                      <span v-if="param.required" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Required</span>
                      <span class="text-gray-400 ml-auto text-xs">{{param.description}}</span>
                  </div>
                  <button class="text-sm text-blue-600 hover:underline px-2">+ Add Parameter (Mock)</button>
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="View" :defaultOpen="true">
                <div class="p-4 bg-gray-50 border rounded text-sm text-center">
                  <p v-if="(editFormState as ActionItem).view" class="mb-2">This action has a view associated with it.</p>
                  <p v-else class="mb-2">No view associated with this action.</p>
                  <button @click="store.openViewBuilder" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {{ (editFormState as ActionItem).view ? 'Design View' : 'Create View' }}
                  </button>
                </div>
              </CollapsibleSection>
          </template>
        </template>

        <!-- SERVICE EDITOR -->
        <template v-if="activeCategory === 'services'">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Service Title <span class="text-red-500">*</span></label>
              <input 
                  type="text"
                  v-model="(editFormState as ServiceItem).title"
                  @input="editFormState.name = ($event.target as HTMLInputElement).value"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description (Prompt)</label>
              <textarea 
                  v-model="(editFormState.description as any)"
                  rows="8"
                  class="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Describe what the service does..."
              />
            </div>
          </div>
        </template>

        <!-- DATA SOURCE EDITOR -->
        <template v-if="activeCategory === 'dataSources'">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select 
                  v-model="(editFormState as DataSourceItem).type"
                  class="w-full p-2 border border-gray-300 rounded-md bg-white"
              >
                  <option value="database">Database</option>
                  <option value="api">API</option>
                  <option value="queue">Queue</option>
                  <option value="file">File</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Configuration (JSON)</label>
              <textarea 
                  :value="JSON.stringify((editFormState as DataSourceItem).config || {}, null, 2)"
                  @input="parseJsonConfig"
                  class="w-full p-2 border border-gray-300 rounded-md font-mono text-xs h-32 bg-gray-50"
              />
            </div>
          </div>
        </template>

        <!-- ENVIRONMENT EDITOR -->
        <template v-if="activeCategory === 'environment'">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    v-model="editFormState.name"
                    class="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="API_KEY"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Default Value</label>
                  <input 
                    type="text"
                    v-model="(editFormState as EnvironmentItem).default"
                    class="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Optional default value..."
                  />
                </div>
            </div>
            <div class="flex items-center gap-4 mt-4">
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    v-model="(editFormState as EnvironmentItem).required"
                    class="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-sm font-medium text-gray-700">Required Variable</span>
                </label>
            </div>
          </div>
        </template>

        <!-- ACCESS CONTROL EDITOR -->
        <template v-if="activeCategory === 'accessControl'">
          <CollapsibleSection title="Permissions" :defaultOpen="true">
            <div class="space-y-2">
              <div v-for="(perm, idx) in (editFormState as RoleItem).permissions" :key="idx" class="flex items-center gap-2 p-2 bg-gray-50 border rounded-md">
                <Key :size="14" class="text-gray-400"/>
                <span class="text-sm font-mono text-gray-700">{{perm}}</span>
                <button 
                  @click="removePermission(idx)"
                  class="ml-auto text-gray-400 hover:text-red-500"
                >
                  <X :size="14"/>
                </button>
              </div>
              <div class="flex gap-2 mt-2">
                <input 
                  type="text" 
                  id="newPermInput"
                  placeholder="permission_name" 
                  class="flex-1 text-sm p-1.5 border border-gray-300 rounded"
                  @keydown.enter.prevent="addPermission"
                />
                <button @click="addPermission" class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded border hover:bg-gray-200">Add</button>
              </div>
            </div>
          </CollapsibleSection>
        </template>

      </div>
    </div>
  </div>
</template>