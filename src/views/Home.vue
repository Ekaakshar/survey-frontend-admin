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
          <router-view />
        </v-container>
      </v-main>  
    </v-app>
</template>

<script>
import logo from '../assets/oc-logo-white.png'
export default {
  name: 'App',
  data: () => ({
    user:user,
    logo,
  }),
  methods: {
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
}
</script>