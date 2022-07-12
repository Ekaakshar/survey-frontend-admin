
<template>
   <v-app >
      <v-main>
         <v-container fluid fill-height>
                  <v-card class="elevation-12 col-md-6">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Register</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                       <div style="text-align: center;color:red;display: block;margin:30px;"> {{errorMessage}}</div>
                     <form ref="form" @submit.prevent="register()">
                            <v-text-field
                              v-model="name"
                              name="name"
                              label="Name"
                              type="text"
                              placeholder="Name"
                              required
                           ></v-text-field>
                           <v-text-field
                              v-model="email"
                              name="email"
                              label="Email"
                              type="email"
                              placeholder="Email"
                              required
                           ></v-text-field>
                           
                            <v-text-field
                              v-model="password"
                              name="password"
                              label="Password"
                              type="password"
                              placeholder="password"
                              required
                           ></v-text-field>
                            <v-text-field
                              v-model="confirmpassword"
                              name="confirmpassword"
                              label="Confirm Password"
                              type="password"
                              placeholder="Confirm Password"
                              required
                           ></v-text-field>
                           <v-btn type="submit" class="mt-4" color="primary" value="register">Register</v-btn>
                      </form>
                      <a style="text-align: center;display: block;" class="mt-4 btn btn-secondary" href="/login">Already Have account? Click to Login</a>
                     </v-card-text>
                  </v-card>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: "Register",
  data() {
    return {
        name:"",
      email: "",
      password: "",
      errorMessage: "",
      confirmpassword: "",
    };
  },
  methods: {
    register() {
    
      if(this.password == this.confirmpassword){
      var data = JSON.stringify({
  "name": this.name,
  "email": this.email,
  "password": this.password,
  'isAdmin': true
});

var config = {
  method: 'post',
  url: 'http://localhost:3000/api/admins',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
      } else {
         this.errorMessage = "password did not match"
       }
    },
  },
  
};
</script>