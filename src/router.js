
import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios'


const routes =  [
  {
    path: "/",
    name: "home",
    component: () => import("./views/Home.vue"),
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login.vue")
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: (to, from, next) => {
      logout();
    }
  },
  {
    path: '/forgot-password',
    name:"forgotpassword",
    component:() => import("./views/ForgotPassword.vue")

  },
  {
    path: '/verify',
    name:"verify",
    component:() => import("./views/Verify.vue")

  },
  {
    path: '/verify-email',
    name:"verifyemail",
    beforeEnter: [verifyEmail]

  },
  {
    path: '/reset-password',
    name:"resetPassword",
    component:() => import("./views/ResetPassword.vue")

  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/Register.vue")
  },
  {
    path: "/tutorials",
    name: "tutorials",
    component: () => import("./views/TutorialsList.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./views/EditTutorial.vue"),
    props: true
  },  
  {
    path: "/admins",
    name: "admins",
    component: () => import("./views/AdminsList.vue"),
    beforeEnter: (to, from, next) => {
      adminGuard(to, from, next);
    }
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddTutorial.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewTutorial.vue"),
    props: true
  },
  {
    path: "/admin/edit/:id",
    name: "adminedit",
    component: () => import("./views/EditAdmin.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      adminGuard(to, from, next);
    }
  },
  {
    path: "/admin/add",
    name: "adminadd",
    component: () => import("./views/AddAdmin.vue"),
    beforeEnter: (to, from, next) => {
      adminGuard(to, from, next);
    }
  },  
  {
    path: "/users",
    name: "users",
    component: () => import("./views/usersList.vue"),
    beforeEnter: (to, from, next) => {
      adminGuard(to, from, next);
    }
  },
  {
    path: "/user/edit/:id",
    name: "useredit",
    component: () => import("./views/EditUser.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      adminGuard(to, from, next);
    }
  },
  {
    path: "/user/add",
    name: "useradd",
    component: () => import("./views/AddUser.vue"),
    beforeEnter: (to, from, next) => {
      adminGuard(to, from, next);
    }
  },
  {
    path: "/surveys",
    name: "surveys",
    component: () => import("./views/SurveysList.vue"),
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: "/survey/edit/:id",
    name: "surveyedit",
    component: () => import("./views/EditSurvey.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: "/survey/completed/:id",
    name: "surveycompleted",
    component: () => import("./views/CompletedSurveysList.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: "/survey/compltedview/:id",
    name: "surveyview",
    component: () => import("./views/CompletedSurveyView.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: "/survey/add",
    name: "surveyadd",
    component: () => import("./views/AddSurvey.vue"),
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: "/addLesson",
    name: "addLesson",
    component: () => import("./views/AddLesson.vue"),
    props: true
  },
  {
    path: "/editLesson",
    name: "editLesson",
    component: () => import("./views/EditLesson.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
const guard = function(to, from, next) {  
var sessiontoken = localStorage.getItem('ADMN_SESSION');
if(!sessiontoken){  
  window.location.href = "/login";
}
var data = JSON.stringify({
    "token": sessiontoken.replace(/['"]+/g, '')
  }); 
  
  var config = {
    method: 'post',
    url: 'http://localhost:3000/api/admins/session',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  axios(config)
  .then(function (response) {    
    var token = response.data.token;
    localStorage.setItem('ADMN_SESSION', JSON.stringify(token));
    if(response.data.admin.email_verified == false){      
  window.location.href = "/verify?email=" + response.data.admin.email;
    }
    
  window.user = response.data.admin;
    next();
   return;
  })
  .catch(function (error) {
    console.log(error);
    window.location.href = "/login";
  });
}
const adminGuard = function(to, from, next) {  
  var sessiontoken = localStorage.getItem('ADMN_SESSION');
  if(!sessiontoken){  
    window.location.href = "/login";
  }
  var data = JSON.stringify({
      "token": sessiontoken.replace(/['"]+/g, '')
    }); 
    
    var config = {
      method: 'post',
      url: 'http://localhost:3000/api/admins/session',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
    .then(function (response) {    
      var token = response.data.token;
      localStorage.setItem('ADMN_SESSION', JSON.stringify(token));
      if(response.data.admin.email_verified == false){      
    window.location.href = "/verify?email=" + response.data.admin.email;
      }
      if(response.data.admin.isAdmin == false){      
        window.location.href = "/";
          }
      
    window.user = response.data.admin;
      next();
     return;
    })
    .catch(function (error) {
      console.log(error);
      window.location.href = "/login";
    });
  }
const logout = function() {  
  localStorage.setItem('ADMN_SESSION', '');
  window.location.href = "/login";
  }

function verifyEmail(to){

  var data = JSON.stringify({
    "email": to.query.email
  }); 
  var config = { 
    method: 'post',
    url: 'http://localhost:3000/api/admins/verify-email?code=' + to.query.code,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {        
    window.location.href = "/";
  })
  .catch(function (error) {
    alert('invalid verification code');
  });
  
}



export default router;