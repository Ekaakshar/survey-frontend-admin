<template>
    <h2>Admin View</h2>
    <h4>{{ message }}</h4>
    <h3> {{admin.Name}}</h3>
    <v-btn color="success" @click="goEditAdmin()"
    >Edit</v-btn>

     <v-row>
        <v-col  cols="8"
              sm="2">
            <span class="text-h6">Name</span>
        </v-col>
        <v-col  cols="8"
              sm="4">
            <span class="text-h6">Email</span>
        </v-col>
        <v-col  cols="8"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="8"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      

   
</template>
<script>
export default {
  name: "view-admin",
  props: ['id'],
  data() {
    return {
      admin: {},
      lessons : [],
      message: ""
    };
  },
  methods: {
     goEditAdmin() {
      this.$router.push({ name: 'adminedit', params: { id: this.id } });
    },
    cancel(){
        this.$router.push({ name: 'admins' });
    }
  }
}
</script>

<style>
</style>