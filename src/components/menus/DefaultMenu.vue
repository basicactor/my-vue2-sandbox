<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon dark v-bind="attrs" v-on="on">
          <v-icon><slot name="iconName"> mdi-menu</slot></v-icon>
        </v-btn>
      </template>
      <v-list>
        <slot name="list" />
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
