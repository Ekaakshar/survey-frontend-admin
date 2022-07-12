
<template>
   <v-app >
      <v-main>
         <v-container fluid fill-height>
                  <v-card class="elevation-12 col-md-6">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                       <div style="text-align: center;color:red;display: block;margin:30px;"> {{errorMessage}}</div>
                     <form ref="form" @submit.prevent="login()">
                            <v-text-field
                              v-model="email"
                              name="email"
                              label="Email"
                              type="email"
                              placeholder="email"
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
                           
                           <a style="text-align: right;color:#999;display: block;" href="/forgot-password">Forgot Password?</a>
                           <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                  
                      </form>
                      <a style="text-align: center;display: block;" class="mt-4 btn btn-secondary" href="/register">New Here? Create Account</a>
                     </v-card-text>
                  </v-card>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      registerurl: "",
      errorMessage: ""
    };
  },
  methods: {
    login() {
      let self = this;
      this.errorMessage = "";
      var data = JSON.stringify({
  "email": this.email,
  "password": this.password
});

var config = {
  method: 'post',
  url: 'http://localhost:3000/api/admins/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then(function (response) {
  console.log(response);
    var token = response.data.token;
  localStorage.setItem('ADMN_SESSION', JSON.stringify(token));
  window.location.href = '\\';
})
.catch(function (error) {
  console.log(error);
  if(error.response.status == 403){
   self.errorMessage = "Invalid Email or Password";
  }
});
    },
  },
};
</script>