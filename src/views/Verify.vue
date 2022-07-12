
<template>
   <v-app >
      <v-main>
         <v-container fluid fill-height>
                  <v-card class="elevation-12 col-md-6">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Verify Account</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                       <div style="text-align: center;color:red;display: block;margin:30px;"> {{errorMessage}}</div>
                     <form ref="form" @submit.prevent="verifyaccount()">
                     <p>We have sent an verification link to your Email, please click on the link verify your account </p>
                     <v-btn type="submit" class="mt-4" color="primary" value="verifyaccount">Re Send Email Verification Link</v-btn>
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
  name: "verifyaccount",
  data() {
    return {
      errorMessage: ""
    };
  },
  methods: {
    verifyaccount() {
      let self = this;
      this.errorMessage = "";
      var data = JSON.stringify({
  "email": self.$route.query.email
});

var config = {
  method: 'post',
  url: 'http://localhost:3000/api/admins/sendemail-verification',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then(function (response) {
    if(response){
      self.errorMessage = "Verification Link sent on Your email " + self.$route.query.email;
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