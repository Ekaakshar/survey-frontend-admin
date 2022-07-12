<template>
    <v-row >
        
        <v-col col="12" sm="9">
    <h1>User List</h1>
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
            @click="addUser"
          >
            New User
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
      <UserDisplay
        v-for="user in users"
        :key="user.id"
        :user="user"
        @deleteUser="goDelete(user)"
        @updateUser="goEdit(user)"
    />
 
  <v-btn  @click="removeAllUsers" color = "red">
    Remove All
  </v-btn>
</template>
<script>
import UserDataService from "../services/UserDataService";
import UserDisplay from '@/components/UserDisplay.vue';
export default {
  name: "users-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      email: "",
      message : "Create, Search, Edit or Delete Users"
    };
  },
  components: {
        UserDisplay
    },
  methods: {
    goDashboard() {
      this.$router.push({ name: 'home'});
    },
    goEdit(user) {
      this.$router.push({ name: 'useredit', params: { id: user.id } });
    },
    addUser() {
      this.$router.push({ name: 'useradd'});
    },
    goView(user) {
      this.$router.push({ name: 'userview', params: { id: user.id } });
    },
    goDelete(user) {
      UserDataService.delete(user.id)
        .then( () => {
    
          this.retrieveUsers()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveUsers() {
      UserDataService.getAll()
        .then(response => {
          this.users = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },
    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = user ? index : -1;
    },
    removeAllUsers() {
      UserDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchEmail() {
      UserDataService.findByEmail(this.email)
        .then(response => {
          this.users = response.data;
          this.setActiveUser(null);
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveUsers();
  }
};
</script>
<style>

</style>