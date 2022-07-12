<template>
<v-row>
  <v-col  cols="9"
        sm="3">
      <span >{{ user.name }}</span>
  </v-col>
  <v-col  cols="9"
        sm="4">
      <span> {{ user.email }}</span>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateUser"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteUser"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    user: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteUser() {
      this.$emit("deleteUser");
    },
    updateUser() {
      this.$emit("updateUser");
    },
    viewUser() {
      this.$emit("viewUser");
    }
  }
};
</script>

<style></style>
