import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// --- TYPES & INTERFACES ---

export type Category = 'entities' | 'actions' | 'dataSources' | 'services' | 'environment' | 'accessControl';

export interface Example {
  input?: any;
  output?: any;
  expected?: any;
  explanation?: string;
  scenario?: string;
}

export interface AdvancedDescription {
  intent: string;  // Descripción del propósito (obligatorio)
  examples?: Example[];  // Casos de uso concretos
  context?: string;  // Información de contexto
  constraints?: string[];  // Límites y reglas importantes
}

export interface BaseItem {
  id: string; 
  name: string;
  description?: string | AdvancedDescription;
}

// Validation Schema
export interface ValidationRules {
  required?: boolean;
  unique?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  email?: boolean;
  url?: boolean;
  enum?: (string | number)[];
}

export interface FieldItem {
  name: string; 
  type: 'string' | 'text' | 'integer' | 'bigInteger' | 'float' | 'decimal' | 'boolean' | 'date' | 'datetime' | 'timestamp' | 'uuid' | 'json' | 'binary';
  primaryKey?: boolean;
  unique?: boolean;
  required?: boolean;
  default?: string | number | boolean | null;
  index?: boolean;
  validation?: ValidationRules;
}

// Relation Schema
export interface RelationItem {
  type: 'hasOne' | 'hasMany';
  targetEntity: string;
  sourceField: string;
  targetField: string;
  onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
  onUpdate?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
  viaTable?: {
    name: string;
    sourceField: string;
    targetField: string;
  };
}

export interface Hooks {
  beforeCreate?: string;
  afterCreate?: string;
  beforeUpdate?: string;
  afterUpdate?: string;
  beforeDelete?: string;
  afterDelete?: string;
  beforeValidate?: string;
  afterValidate?: string;
}

export interface EntityItem extends BaseItem {
  tableName: string;
  fields: FieldItem[];
  relations: RelationItem[];
  timestamps: boolean;
  softDeletes: boolean;
  hooks?: Hooks;
}

export interface ParameterItem {
  name: string;
  in: 'query' | 'path' | 'header' | 'cookie';
  description?: string;
  required: boolean;
  schema?: any; 
}

export interface ActionItem extends BaseItem {
  route?: string;
  parameters?: ParameterItem[];
  useServices?: string[]; 
  responseFormat?: 'json' | 'xml' | 'html' | 'text';
  access?: any[]; 
  view?: ViewItem;
}

export interface GroupItem {
  id: string;
  name: string;
  description?: string;
  routeSuffix: string;
  actions: (ActionItem | GroupItem)[];
}

export type ActionOrGroup = ActionItem | GroupItem;

export interface DataSourceItem extends BaseItem {
  type: 'database' | 'api' | 'queue' | 'file';
  config: Record<string, any>; 
}

export interface ServiceItem extends BaseItem {
  title: string;
  // description inherited
}

export interface EnvironmentItem extends BaseItem {
  required: boolean;
  default?: string;
}

export interface RoleItem extends BaseItem {
  permissions: string[]; 
}

// View related interfaces
export interface ComponentItem {
  id: string;
  type: 'table' | 'list' | 'card' | 'cardWithIcon' | 'menuHorizontal' | 'menuVertical';
  // other component properties
}

export interface ColumnItem {
  id: string;
  width: number;
  components: ComponentItem[];
}

export interface RowItem {
  id: string;
  columns: ColumnItem[];
}

export interface ViewItem extends BaseItem {
  rows: RowItem[];
}

export type SchemaItem = EntityItem | ActionItem | DataSourceItem | EnvironmentItem | RoleItem | ServiceItem | ViewItem | GroupItem;

export interface AppState {
  entities: EntityItem[];
  actions: (ActionItem | GroupItem)[];
  dataSources: DataSourceItem[];
  services: ServiceItem[]; 
  environment: EnvironmentItem[];
  accessControl: RoleItem[];
}

// --- MOCK DATA ---

const INITIAL_DATA: AppState = {
  entities: [
    { 
      id: 'e1', 
      name: 'User', 
      description: 'System users', 
      tableName: 'users',
      timestamps: true,
      softDeletes: false,
      fields: [
        { name: 'id', type: 'uuid', primaryKey: true, required: true },
        { name: 'email', type: 'string', unique: true, required: true, validation: { email: true } },
        { name: 'password_hash', type: 'string', required: true }
      ],
      relations: [
        { type: 'hasMany', targetEntity: 'Post', sourceField: 'id', targetField: 'user_id', onDelete: 'CASCADE' }
      ]
    },
    { 
      id: 'e2', 
      name: 'Product', 
      description: 'Inventory items', 
      tableName: 'products',
      timestamps: true,
      softDeletes: true,
      fields: [
        { name: 'sku', type: 'string', unique: true, required: true, validation: { pattern: '^[A-Z0-9-]{5,10}$' } },
        { name: 'price', type: 'decimal', required: true, default: 0, validation: { minValue: 0 } }
      ],
      relations: []
    }
  ],
  actions: [
    {
      id: 'g1',
      name: 'auth',
      routeSuffix: '/auth',
      actions: [
        { 
          id: 'a1', 
          name: 'registerUser', 
          description: 'Registers a new user', 
          route: '/register',
          responseFormat: 'json',
          useServices: ['EmailSender'],
          parameters: [
            { name: 'email', in: 'query', required: true, description: 'User email' }
          ]
        }
      ]
    }
  ],
  dataSources: [
    { id: 'd1', name: 'MainDB', description: 'Primary DB', type: 'database', config: { host: 'localhost', port: 5432 } }
  ],
  services: [
    { id: 's1', name: 'EmailSender', title: 'Email Service', description: 'Handles SMTP email delivery' }
  ],
  environment: [
    { id: 'v1', name: 'API_KEY', description: 'Stripe Secret Key', required: true, default: '' }
  ],
  accessControl: [
    { id: 'r1', name: 'Admin', description: 'Full access', permissions: ['create_user', 'delete_product'] }
  ],
};

const LOCAL_STORAGE_KEY = 'blueschema_app_state';

const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return INITIAL_DATA;
    }
    return JSON.parse(serializedState) as AppState;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return INITIAL_DATA;
  }
};

const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

export const useSchemaStore = defineStore('schema', () => {
  const data = ref<AppState>(loadState());
  const activeCategory = ref<Category>('entities');
  const searchQuery = ref('');
  const selectedItemId = ref<string | null>(null);
  const isEditing = ref(false);
  const isJsonView = ref(false);
  const isViewBuilderOpen = ref(false);
  const editFormState = ref<SchemaItem | null>(null);
  const generatedJson = ref('');
  const actionPath = ref<string[]>([]);

  const currentActions = computed(() => {
    if (activeCategory.value !== 'actions') {
      return [];
    }
    let currentLevel = data.value.actions;
    for (const groupId of actionPath.value) {
      const group = currentLevel.find(item => 'actions' in item && item.id === groupId) as GroupItem | undefined;
      if (group) {
        currentLevel = group.actions;
      } else {
        return [];
      }
    }
    return currentLevel;
  });

  const getDescriptionText = (description?: string | AdvancedDescription): string => {
    if (!description) return '';
    if (typeof description === 'string') return description;
    return description.intent || '';
  };

  const filteredItems = computed(() => {
    let items: SchemaItem[] = [];
    if (activeCategory.value === 'actions') {
      items = currentActions.value;
    } else {
      items = (data.value[activeCategory.value as keyof typeof data.value] || []) as SchemaItem[];
    }
    
    if (!searchQuery.value) return items;

    return items.filter(item => 
      (getDisplayName(item)).toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      getDescriptionText(item.description).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const getDisplayName = (item: SchemaItem) => {
    // @ts-ignore
    return item.title || item.name || 'Unnamed';
  };

  function createNewItem(type: 'action' | 'group' = 'action') {
    isJsonView.value = false;
    isViewBuilderOpen.value = false;
    const newItemBase = {
      id: `new_${Date.now()}`,
      name: 'NewItem',
      description: '',
    };
    
    let newItem: SchemaItem;

    if (activeCategory.value === 'entities') {
      newItem = { ...newItemBase, tableName: 'new_table', fields: [], relations: [], timestamps: true, softDeletes: false, hooks: {} } as EntityItem;
    } else if (activeCategory.value === 'actions') {
      if (type === 'group') {
        newItem = { ...newItemBase, routeSuffix: '/new_group', actions: [] } as GroupItem;
      } else {
        newItem = { ...newItemBase, parameters: [], useServices: [], route: '', responseFormat: 'json' } as ActionItem;
      }
    } else if (activeCategory.value === 'dataSources') {
      newItem = { ...newItemBase, type: 'database', config: {} } as DataSourceItem;
    } else if (activeCategory.value === 'services') {
      newItem = { ...newItemBase, title: 'New Service', description: 'Service description...' } as ServiceItem;
    } else if (activeCategory.value === 'environment') {
      newItem = { ...newItemBase, required: true, default: '' } as EnvironmentItem;
    } else if (activeCategory.value === 'accessControl') {
      newItem = { ...newItemBase, permissions: [] } as RoleItem;
    } else {
      newItem = { ...newItemBase };
    }

    editFormState.value = newItem;
    selectedItemId.value = null;
    isEditing.value = true;
  }

  function saveItem() {
    if (!editFormState.value) return;

    let list: (SchemaItem | ActionOrGroup)[];
    if (activeCategory.value === 'actions') {
      list = currentActions.value;
    } else {
      list = data.value[activeCategory.value as keyof typeof data.value] as SchemaItem[];
    }
    
    const existingIndex = list.findIndex(i => i.id === editFormState.value!.id);
    
    if (existingIndex >= 0) {
      list[existingIndex] = editFormState.value;
    } else {
      list.push(editFormState.value);
    }
    
    isEditing.value = false;
    isViewBuilderOpen.value = false;
    selectedItemId.value = editFormState.value.id;
    editFormState.value = null;

    saveState(data.value);
  }

  function deleteItem(id: string) {
    let list: (SchemaItem | ActionOrGroup)[];
    if (activeCategory.value === 'actions') {
      list = currentActions.value;
    } else {
      list = data.value[activeCategory.value as keyof typeof data.value] as SchemaItem[];
    }

    const index = list.findIndex(i => i.id === id);
    if (index > -1) {
      list.splice(index, 1);
    }
    
    if (selectedItemId.value === id) {
      selectedItemId.value = null;
      isEditing.value = false;
    }
    saveState(data.value);
  }
  
  function duplicateItem(item: SchemaItem) {
    const newItem = { ...JSON.parse(JSON.stringify(item)), id: `copy_${Date.now()}`, name: `${item.name}Copy` };
    // @ts-ignore
    if(item.title) newItem.title = `${item.title} Copy`;

    let list: (SchemaItem | ActionOrGroup)[];
    if (activeCategory.value === 'actions') {
      list = currentActions.value;
    } else {
      list = data.value[activeCategory.value as keyof typeof data.value] as SchemaItem[];
    }
    list.push(newItem);
    saveState(data.value);
  }

  function showJsonView() {
    isEditing.value = false;
    isViewBuilderOpen.value = false;
    const exportData = {
      $schema: "https://example.com/schemas/application.json",
      id: "app_" + Date.now(),
      name: "MyBlueSchemaApp",
      version: "1.0.0",
      description: "Generated by BlueSchema Designer",
      entities: data.value.entities,
      actions: data.value.actions,
      dataSources: data.value.dataSources,
      services: data.value.services,
      environment: data.value.environment,
      accessControl: {
        roles: data.value.accessControl 
      }
    };
    generatedJson.value = JSON.stringify(exportData, null, 2);
    isJsonView.value = true;
  }

  function downloadJson() {
    const blob = new Blob([generatedJson.value], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "application.json";
    document.body.appendChild(link);
    document.body.removeChild(link);
  }
  
  function openViewBuilder() {
    const action = editFormState.value as ActionItem;
    if (!action.view) {
      action.view = {
        id: `view_${Date.now()}`,
        name: `${action.name}View`,
        rows: []
      };
    }
    isViewBuilderOpen.value = true;
  }

  function navigateToGroup(groupId: string) {
    actionPath.value.push(groupId);
  }

  return { 
    data, 
    activeCategory,
    actionPath,
    currentActions,
    searchQuery, 
    selectedItemId, 
    isEditing,
    isJsonView,
    isViewBuilderOpen,
    editFormState,
    generatedJson,
    filteredItems,
    getDisplayName,
    createNewItem,
    saveItem,
    deleteItem,
    duplicateItem,
    showJsonView,
    downloadJson,
    openViewBuilder,
    navigateToGroup
  }
})