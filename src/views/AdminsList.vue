<template>
    <v-row >
        
        <v-col col="12" sm="9">
    <h1>Admin List</h1>
    <h4>{{ message }}</h4>

        </v-col>
        <v-col col="12" sm="3" align="right">
          <v-btn color = "black"
            @click="goDashboard"
          >
           Back to<br> Dashboard
          </v-btn></v-col>
        </v-row>
  
      <v-row >
        
        <v-col col="12" sm="2">
          <v-btn color = "primary"
            @click="addAdmin"
          >
            New Admin
          </v-btn></v-col>
        <v-col col="12" sm="3"></v-col>
        <v-col col="12" sm="5">
            <v-text-field density="compact" clearable
              v-model="email"/>
        </v-col>
        <v-col  cols="12"
        sm="2">
          <v-btn color = "success"
            @click="searchEmail"
          >
            Search
          </v-btn>
        </v-col>
         
      </v-row>
      <v-row>
        <v-col  cols="9"
              sm="3">
            <span class="text-h6">Name</span>
        </v-col>
        <v-col  cols="9"
              sm="4">
            <span class="text-h6">Email</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <AdminDisplay
        v-for="admin in admins"
        :key="admin.id"
        :admin="admin"
        @deleteAdmin="goDelete(admin)"
        @updateAdmin="goEdit(admin)"
    />
 
  <v-btn  @click="removeAllAdmins" color = "red">
    Remove All
  </v-btn>
</template>
<script>
import AdminDataService from "../services/AdminDataService";
import AdminDisplay from '@/components/AdminDisplay.vue';
export default {
  name: "admins-list",
  data() {
    return {
      admins: [],
      currentAdmin: null,
      currentIndex: -1,
      email: "",
      message : "Create, Search, Edit or Delete Admins"
    };
  },
  components: {
        AdminDisplay
    },
  methods: {
    goDashboard() {
      this.$router.push({ name: 'home'});
    },
    goEdit(admin) {
      this.$router.push({ name: 'adminedit', params: { id: admin.id } });
    },
    addAdmin() {
      this.$router.push({ name: 'adminadd'});
    },
    goView(admin) {
      this.$router.push({ name: 'adminview', params: { id: admin.id } });
    },
    goDelete(admin) {
      AdminDataService.delete(admin.id)
        .then( () => {
    
          this.retrieveAdmins()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveAdmins() {
      AdminDataService.getAll()
        .then(response => {
          this.admins = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveAdmins();
      this.currentAdmin = null;
      this.currentIndex = -1;
    },
    setActiveAdmin(admin, index) {
      this.currentAdmin = admin;
      this.currentIndex = admin ? index : -1;
    },
    removeAllAdmins() {
      AdminDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchEmail() {
      AdminDataService.findByEmail(this.email)
        .then(response => {
          this.admins = response.data;
          this.setActiveAdmin(null);
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveAdmins();
  }
};
</script>
<style>

</style>