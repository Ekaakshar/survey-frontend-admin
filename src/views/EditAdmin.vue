<template>
    <h1>Admin Edit</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Name"
            v-model="admin.name"
        />
        <v-text-field
            label="Email"
            v-model="admin.email"
        />
        <v-text-field
            label="Admin"
            v-model="admin.isAdmin"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="updateAdmin()"
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
import AdminDataService from "../services/AdminDataService";
export default {
  name: "edit-admin",
  props: ['id'],
  data() {
    return {
      admin: {},
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveAdmin() {
      AdminDataService.get(this.id)
        .then(response => {
          this.admin= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateAdmin() {
      var data = {
        name: this.admin.name,
        email: this.admin.email,        
        password: this.admin.password,        
        isAdmin: this.admin.isAdmin

      };
      AdminDataService.update(this.id,data)
        .then(response => {
          this.admin.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'admins' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'admins' });
    }
  },
    mounted() {
    this.retrieveAdmin();
  }
}

</script>
<style>

</style>