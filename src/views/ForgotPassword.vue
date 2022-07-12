
<template>
   <v-app >
      <v-main>
         <v-container fluid fill-height>
                  <v-card class="elevation-12 col-md-6">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Forgot Password</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                       <div style="text-align: center;color:red;display: block;margin:30px;"> {{errorMessage}}</div>
                     <form ref="form" @submit.prevent="forgotpassword()">
                            <v-text-field
                              v-model="email"
                              name="email"
                              label="Email"
                              type="email"
                              placeholder="email"
                              required
                           ></v-text-field>
                           <v-btn type="submit" class="mt-4" color="primary" value="forgotpassword">Send Password Reset Link</v-btn>
                      </form>
                      <a style="text-align: center;display: block;" class="mt-4 btn btn-secondary" href="/login">GO back to Login</a>
                     </v-card-text>
                  </v-card>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: "forgotpassword",
  data() {
    return {
      email: "",
      password: "",
      registerurl: "",
      errorMessage: ""
    };
  },
  methods: {
    forgotpassword() {
      let self = this;
      this.errorMessage = "";
      var data = JSON.stringify({
  "email": this.email
});

var config = {
  method: 'post',
  url: 'http://localhost:3000/api/admins/forgot-password',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then(function (response) {
    if(response){
      self.errorMessage = "Password Reset Link sent on Your email " + self.email;
    }
})
.catch(function (error) {
  if(error.response.status == 403 || error.response.status == 401){
   self.errorMessage = error.response.data.message;
  }
});
    },
  },
};
</script>