
<template>
  <button @click='onClick' class="flex gap-2 items-center" :class="disabled ? disabledClass : activeClass">
    <Loader v-if="Boolean(loading)"/>
    {{ !loading ? label : '' }}
  </button>
</template>

<script>
import Loader from './Loader.vue'

export default {
  name: 'loadingButton',
  emits: ['clicked'],
  data() {
    return {
      activeClass: 'bg-green p-2 px-6 rounded text-white',
      disabledClass: 'bg-green p-2 px-6 rounded text-white opacity-50'
    }
  },
  methods: {
    onClick() {
      if (!this?.disabled) {
        this.$emit('clicked')
      }
    },
  },
  props: {
    loading: Boolean,
    label: String,
    disabled: Boolean,
  },
  components: { Loader }
}
</script>