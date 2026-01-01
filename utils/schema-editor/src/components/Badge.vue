<script setup lang="ts">
defineProps<{
  color?: string
}>()

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-emerald-100 text-emerald-800',
  purple: 'bg-purple-100 text-purple-800',
  orange: 'bg-orange-100 text-orange-800',
  gray: 'bg-gray-100 text-gray-800',
  red: 'bg-red-100 text-red-800',
  yellow: 'bg-yellow-100 text-yellow-800'
};
</script>

<template>
  <span :class="['inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', colorClasses[color || 'gray']]">
    <slot></slot>
  </span>
</template>
