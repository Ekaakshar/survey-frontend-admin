<template>
    <h1>Survey Add</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Name"
            v-model="survey.name"
        />
        <v-text-field
            label="Description"
            v-model="survey.description"
        />
        <v-text-field
            label="Duration"
            v-model="survey.duration"
        />
        <v-text-field
            label="Status"
            v-model="survey.status"
        />
        <div class="test-survey-builder">
    <QuestionsView :questions="questionsList" :readOnly="true" />
    <div v-if="addQuestion">
      <SurveyBuilder :options="sampleQuestion" />
    </div>
    <div class="pt-10">
      <button type="button" class="add_another_btn br-25" @click="addNewQuestion()">Add question</button>
    </div>
  </div>
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveSurvey()"
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
import SurveyBuilder from './SurveyBuilder.vue';
import QuestionsView from './QuestionsView.vue';
import sampleQuestionObj from './survey-builder.json' ;
import SurveyDataService from "../services/SurveyDataService";
export default {
  name: "add-survey",
  data() {
    return {
      survey: {
        id: null,
        name: "",
        description: "",
        duration:"",
        status:"",
      },      
      questionsList: [],
      addQuestion: false,
      message: "Enter data and click save"
    };
  },
  components: { SurveyBuilder, QuestionsView },
  mounted() {
    this.emitter.on('add-update-question', q => {
      this.updateQuestionsList(q);
    });
  },
  methods: {
    saveSurvey() {
      var data = {
        name: this.survey.name,
        description: this.survey.description,
        duration: this.survey.duration,
        content: JSON.stringify(this.questionsList),
        createdBy: user.id,
        status:this.survey.status,
      };
      SurveyDataService.create(data)
        .then(response => {
          this.survey.id = response.data.id;
          console.log("add "+ response.data);
          this.$router.push({ name: 'surveys' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    addNewQuestion() {
      this.sampleQuestion = JSON.parse(JSON.stringify(sampleQuestionObj));
      this.addQuestion = true;
      console.log(this.questionsList.data);
    },
    updateQuestionsList(question) {
      const questionIndex = this.questionsList.findIndex(x => x.id === question.id);
      if (questionIndex >= 0) {
        this.questionsList.splice(questionIndex, 1, question);
      } else {
        this.questionsList.push(JSON.parse(JSON.stringify(question)));
      }
      this.addQuestion = false;
      this.emitter.emit('selected-question', null);
      console.log(question, this.addQuestion, this.questionsList);
    },
    
    cancel(){
        this.$router.push({ name: 'surveys' });
    }
  }
}

</script>
<style>

</style>