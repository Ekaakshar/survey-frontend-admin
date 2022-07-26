<template>
    <h1>Survey Edit</h1>
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
                <v-btn color="success" @click="updateSurvey()"
                    >Update</v-btn
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
  name: "edit-survey",
  props: ['id'],
  data() {
    return {
      survey: {},      
      questionsList: [],
      addQuestion: false,
      message: "Enter data and click save"
    };
  },
  components: { SurveyBuilder, QuestionsView },
  methods: {
    retrieveSurvey() {
      SurveyDataService.get(this.id)
        .then(response => {
          this.survey= response.data;
          console.log(JSON.parse(this.survey.content));
          this.questionsList = JSON.parse(this.survey.content);
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateSurvey() {
      var data = {
        name: this.survey.name,
        description: this.survey.description,
        duration: this.survey.duration,
        content: JSON.stringify(this.questionsList),        

      };
      SurveyDataService.update(this.id,data)
        .then(response => {
          this.survey.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'surveys' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'surveys' });
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
  },
    mounted() {
    this.retrieveSurvey();
    this.emitter.on('add-update-question', q => {
      this.updateQuestionsList(q);
    });
  }
}

</script>
<style>

</style>