
<template>
   <v-app >
      <v-main>
         <v-container fluid fill-height>
                  <v-card class="elevation-12 col-md-6">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Reset Password</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                       <div style="text-align: center;color:red;display: block;margin:30px;"> {{errorMessage}}</div>
                     <form ref="form" @submit.prevent="resetpassword()">                           
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
                           <v-btn type="submit" class="mt-4" color="primary" value="resetpassword">Reset Password</v-btn>
                      </form>
                      <a style="text-align: center;display: block;" class="mt-4 btn btn-secondary" href="/login">Click to Login</a>
                     </v-card-text>
                  </v-card>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: "resetPassword",
  data() {
    return {
      password: "",
      errorMessage: "",
      confirmpassword: "",
    };
  },
  methods: {
    resetpassword() {
        let self = this;
      if(this.password == this.confirmpassword){
      var data = JSON.stringify({
  "password": this.password
});

var config = {
  method: 'post',
  url: 'http://localhost:3000/api/admins/reset-password?code=' + this.$route.query.code,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
    self.errorMessage = "Password Successfully Updated";
  window.location.href = '\login';
})
.catch(function (error) {
    if(error.response.status == 401){
    self.errorMessage = error.response.data.message;
    }
});
      } else {
         self.errorMessage = "password did not match"
       }
    },
  },
  
};
</script>