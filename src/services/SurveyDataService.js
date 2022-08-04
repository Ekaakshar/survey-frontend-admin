import http from "../http-common";
class SurveyDataService {
  getAll() {
    if(user.isAdmin){
    return http.get("/surveys");
    } else {
      return http.get(`surveys/byuser/${user.id}`);
    }
  }
  getAllCompletedSurveys(){
    return http.get(`/completedsurveys/`);
  }
  getAllCompleted(id){
    return http.get(`/completedsurveys/byQuestion/${id}`);
  }
  getCompleted(id) {
    return http.get(`/completedsurveys/${id}`);
  }
  get(id) {
    return http.get(`/surveys/${id}`);
  }
  create(data) {
    return http.post("/surveys", data);
  }
  update(id, data) {
    return http.put(`/surveys/${id}`, data);
  }
  delete(id) {
    return http.delete(`/surveys/${id}`);
  }
  deleteAll() {
    return http.delete(`/surveys`);
  }
  findByName(name) {
    return http.get(`/surveys?name=${name}`);
  }
}
export default new SurveyDataService();