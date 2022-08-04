<template>
    <v-app>
      <v-app-bar  >
            <v-img
                class="mx-2"
                :src="logo"
                max-height="40"
                max-width="40"
                contain
            ></v-img>
            <v-app-bar-title  >Dashboard</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn v-if="user.isAdmin" 
                    variant="text"
                    @click="goAdmins"
                    >
                  Admins
                </v-btn>
                <v-btn v-if="user.isAdmin" 
                    variant="text"
                    @click="goUsers"
                    >
                  Users
                </v-btn>
                <v-btn 
                    variant="text"
                    @click="goSurvey"
                    >
                  Survey
                </v-btn>
                <v-btn 
                     color="red"
                    @click="goLogout"
                    >
                   Logout
                </v-btn>
            </v-toolbar-items>
            
      </v-app-bar>
      <v-main >
        <v-container>
          <v-row v-if="user.isAdmin">
            <v-col class="card"  cols="12" sm="4">
                <v-card class="mx-auto" max-width="100%" outlined >
                  <v-card-item>
                    <v-card-title class="text-h5">Users</v-card-title>
                    <v-card-subtitle>
                      Total Registered Users
                    </v-card-subtitle>
                  </v-card-item>
                  <v-card-text class="py-0">
                    <v-row align="center" hide-gutters no-gutters>
                      <v-col class="text-h3 mb-2" cols="6">{{total_users}}</v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
            </v-col>
              <v-col class="card"  cols="12" sm="4">
                <v-card class="mx-auto" max-width="100%" outlined >
                  <v-card-item>
                    <v-card-title class="text-h5">Admins</v-card-title>
                    <v-card-subtitle>
                      Total Registered Admins
                    </v-card-subtitle>
                  </v-card-item>
                  <v-card-text class="py-0">
                    <v-row align="center" hide-gutters no-gutters>
                      <v-col class="text-h3 mb-2" cols="6">{{total_admins}}</v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
            </v-col>
            <v-col class="card"  cols="12" sm="4">
                <v-card class="mx-auto" max-width="100%" outlined >
                  <v-card-item>
                    <v-card-title class="text-h5">Surveys</v-card-title>
                    <v-card-subtitle>
                      Total Surveys
                    </v-card-subtitle>
                  </v-card-item>
                  <v-card-text class="py-0">
                    <v-row align="center" hide-gutters no-gutters>
                      <v-col class="text-h3 mb-2" cols="6">{{total_surveys}}</v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
            </v-col>
            <v-col class="card"  cols="12" sm="4">
                <v-card class="mx-auto" max-width="100%" outlined >
                  <v-card-item>
                    <v-card-title class="text-h5">Completed Surveys</v-card-title>
                    <v-card-subtitle>
                      Total Complted Surveys
                    </v-card-subtitle>
                  </v-card-item>
                  <v-card-text class="py-0">
                    <v-row align="center" hide-gutters no-gutters>
                      <v-col class="text-h3 mb-2" cols="6">{{total_completed_surveys}}</v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
      </v-main>  
    </v-app>
</template>

<script>
import logo from '../assets/oc-logo-white.png';
import SurveyDataService from "../services/SurveyDataService";
import AdminDataService from "../services/AdminDataService";
import UserDataService from "../services/UserDataService";
export default {
  name: 'App',
  data: () => ({
    user:user,
    logo,
    total_surveys:0,
    total_admins:0,
    total_users:0,
    total_completed_surveys:0,
  }),
  methods: {
    retrieveSurveys() {
      SurveyDataService.getAll()
        .then(response => {
          this.total_surveys = response.data.length;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
        SurveyDataService.getAllCompletedSurveys()
        .then(response => {
          this.total_completed_surveys = response.data.length;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

         AdminDataService.getAll()
        .then(response => {
          this.total_admins = response.data.length;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
        UserDataService.getAll()
        .then(response => {
          this.total_users = response.data.length;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
        
    },
    goAdmins() {
      this.$router.push({ name: 'admins' });
    },
    goUsers() {
      this.$router.push({ name: 'users' });
    },
    goSurvey() {
      this.$router.push({ name: 'surveys' });
    },
    goLogout() {
      this.$router.push({ name: 'logout' });
    },
  },
   mounted() {
    this.retrieveSurveys();
  }
}
</script>