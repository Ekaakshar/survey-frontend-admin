<template>
<v-row>
  <v-col  cols="9"
        sm="3">
      <span >{{ admin.name }}</span>
  </v-col>
  <v-col  cols="9"
        sm="4">
      <span> {{ admin.email }}</span>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateAdmin"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteAdmin"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    admin: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteAdmin() {
      this.$emit("deleteAdmin");
    },
    updateAdmin() {
      this.$emit("updateAdmin");
    },
    viewAdmin() {
      this.$emit("viewAdmin");
    }
  }
};
</script>

<style></style>
