<template>
    <h1>User Edit</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Name"
            v-model="user.name"
        />
        <v-text-field
            label="Email"
            v-model="user.email"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="updateUser()"
                    >Save</v-btn
                >
            </v-col>
            <v-col col="2">
                <v-btn color="info" @click="cancel()">Cancel</v-btn>
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
</template>
<script>
import UserDataService from "../services/UserDataService";
export default {
  name: "edit-user",
  props: ['id'],
  data() {
    return {
      user: {},
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveUser() {
      UserDataService.get(this.id)
        .then(response => {
          this.user= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateUser() {
      var data = {
        name: this.user.name,
        email: this.user.email,        
        password: this.user.password,        

      };
      UserDataService.update(this.id,data)
        .then(response => {
          this.user.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'users' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'users' });
    }
  },
    mounted() {
    this.retrieveUser();
  }
}

</script>
<style>

</style>