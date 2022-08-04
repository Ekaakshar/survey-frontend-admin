<template>
    <v-row >
        
        <v-col col="12" sm="9">
    <h1>Survey List</h1>
    <h4>{{ message }}</h4>

        </v-col>
        <v-col col="12" sm="3" align="right">
          <v-btn color = "black"
            @click="goDashboard"
          >
           Back to<br> Dashboard
          </v-btn></v-col>
        </v-row>
  
      <v-row >
        
        <v-col col="12" sm="2">
          <v-btn color = "primary"
            @click="addSurvey"
          >
            New Survey
          </v-btn></v-col>
        <v-col col="12" sm="3"></v-col>
        <v-col col="12" sm="5">
            <v-text-field density="compact" clearable
              v-model="email"/>
        </v-col>
        <v-col  cols="12"
        sm="2">
          <v-btn color = "success"
            @click="searchEmail"
          >
            Search
          </v-btn>
        </v-col>
         
      </v-row>
      <v-row>
        <v-col  cols="9"
              sm="4">
            <span class="text-h6">Name</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Duration</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Share</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">View</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <SurveyDisplay
        v-for="survey in surveys"
        :key="survey.id"
        :survey="survey"
        @deleteSurvey="goDelete(survey)"
        @updateSurvey="goEdit(survey)"        
        @viewSurvey="goView(survey)"               
        @copySurvey="goCopy(survey)"
    />
 
  <v-btn  @click="removeAllSurveys" color = "red">
    Remove All
  </v-btn>
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";
import SurveyDisplay from '@/components/SurveyDisplay.vue';
export default {
  name: "surveys-list",
  data() {
    return {
      surveys: [],
      currentSurvey: null,
      currentIndex: -1,
      email: "",
      message : "Create, Search, Edit or Delete Surveys"
    };
  },
  components: {
        SurveyDisplay
    },
  methods: {
    goCopy(survey){
      navigator.clipboard.writeText('http://localhost:3002/survey/complete/' + survey.id);
      alert("Link Copied");
    },
    goDashboard() {
      this.$router.push({ name: 'home'});
    },
    goEdit(survey) {
      this.$router.push({ name: 'surveyedit', params: { id: survey.id } });
    },
    addSurvey() {s
      this.$router.push({ name: 'surveyadd'});
    },
    goView(survey) {
      this.$router.push({ name: 'surveycompleted', params: { id: survey.id } });
    },
    goDelete(survey) {
      SurveyDataService.delete(survey.id)
        .then( () => {
    
          this.retrieveSurveys()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveSurveys() {
      SurveyDataService.getAll()
        .then(response => {
          this.surveys = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveSurveys();
      this.currentSurvey = null;
      this.currentIndex = -1;
    },
    setActiveSurvey(survey, index) {
      this.currentSurvey = survey;
      this.currentIndex = survey ? index : -1;
    },
    removeAllSurveys() {
      SurveyDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchEmail() {
      SurveyDataService.findByEmail(this.email)
        .then(response => {
          this.surveys = response.data;
          this.setActiveSurvey(null);
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveSurveys();
  }
};
</script>
<style>

</style>