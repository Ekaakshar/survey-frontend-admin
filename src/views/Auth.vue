<template>
   <v-app >
      <v-main>
         <v-container fill-height>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>{{isRegister ? stateObj.register.name : stateObj.login.name}} form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                     <form ref="form" @submit.prevent="isRegister ? register() : login()">
                            <v-text-field v-if="isRegister"
                              v-model="name"
                              name="name"
                              label="name"
                              type="text"
                              placeholder="name"
                              required
                           ></v-text-field>

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

                           <v-text-field v-if="isRegister"
                              v-model="confirmPassword"
                              name="confirmPassword"
                              label="Confirm Password"
                              type="password"
                              placeholder="cocnfirm password"
                              required
                           ></v-text-field>
                           <div class="red--text"> {{errorMessage}}</div>
                           <v-btn type="submit" class="mt-4" color="primary" value="log in">{{isRegister ? stateObj.register.name : stateObj.login.name}}</v-btn>
                           <div class="grey--text mt-4" v-on:click="isRegister = !isRegister;">
                              {{toggleMessage}}  
                           </div>
                      </form>
                     </v-card-text>
                  </v-card>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: "App",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isRegister : false,
      errorMessage: "",
      stateObj: {
         register :{
            name: 'Register',
            message: 'Aleady have an Acoount? login.'
         },
         login : {
            name: 'Login',
            message: 'Register'
         }
      }
    };
  },
  methods: {
    login() {
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
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
    },
    register() {
       if(this.password == this.confirmPassword){
          this.isRegister = false;
          this.errorMessage = "";
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
          this.$refs.form.reset();
       }
       else {
         this.errorMessage = "password did not match"
       }
    }
  },
      computed: {
       toggleMessage : function() { 
          return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message }
    }
};
</script>