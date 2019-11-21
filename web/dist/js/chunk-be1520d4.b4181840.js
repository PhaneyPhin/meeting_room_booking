(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-be1520d4"],{1880:function(e,s,a){e.exports=a.p+"img/register.cfd9ef09.jpg"},aaf8:function(e,s,a){"use strict";a.r(s);var t=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"},[t("div",{staticClass:"vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4"},[t("vx-card",[t("div",{staticClass:"full-page-bg-color",attrs:{slot:"no-body"},slot:"no-body"},[t("div",{staticClass:"vx-row no-gutter"},[t("div",{staticClass:"vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"},[t("img",{staticClass:"mx-auto",attrs:{src:a("1880"),alt:"register"}})]),t("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg"},[t("div",{staticClass:"p-8"},[t("div",{staticClass:"vx-card__title"},[t("h4",{staticClass:"mb-4"},[e._v("Create Account")]),t("p",[e._v("Fill the below form to create a new account.")])]),t("div",{staticClass:"clearfix"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha_dash|min:3",expression:"'required|alpha_dash|min:3'"}],staticClass:"w-full",attrs:{"data-vv-validate-on":"blur","label-placeholder":"Username",name:"username",placeholder:"Username"},model:{value:e.username,callback:function(s){e.username=s},expression:"username"}}),t("span",{staticClass:"text-danger text-sm"},[e._v(e._s(e.errors.first("username")))]),t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"w-full mt-6",attrs:{"data-vv-validate-on":"blur",name:"email",type:"email","label-placeholder":"Email",placeholder:"Email"},model:{value:e.email,callback:function(s){e.email=s},expression:"email"}}),t("span",{staticClass:"text-danger text-sm"},[e._v(e._s(e.errors.first("email")))]),t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:6|max:10",expression:"'required|min:6|max:10'"}],ref:"password",staticClass:"w-full mt-6",attrs:{type:"password","data-vv-validate-on":"blur",name:"password","label-placeholder":"Password",placeholder:"Password"},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}}),t("span",{staticClass:"text-danger text-sm"},[e._v(e._s(e.errors.first("password")))]),t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"min:6|max:10|confirmed:password",expression:"'min:6|max:10|confirmed:password'"}],staticClass:"w-full mt-6",attrs:{type:"password","data-vv-validate-on":"blur","data-vv-as":"password",name:"confirm_password","label-placeholder":"Confirm Password",placeholder:"Confirm Password"},model:{value:e.confirm_password,callback:function(s){e.confirm_password=s},expression:"confirm_password"}}),t("span",{staticClass:"text-danger text-sm"},[e._v(e._s(e.errors.first("confirm_password")))]),t("vs-checkbox",{staticClass:"mt-6",model:{value:e.isTermsConditionAccepted,callback:function(s){e.isTermsConditionAccepted=s},expression:"isTermsConditionAccepted"}},[e._v("I accept the terms & conditions.")]),t("vs-button",{staticClass:"mt-6",attrs:{type:"border",to:"/pages/login"}},[e._v("Login")]),t("vs-button",{staticClass:"float-right mt-6",attrs:{disabled:!e.validateForm},on:{click:e.registerUser}},[e._v("Register")])],1)])])])])])],1)])},i=[],r={data:function(){return{username:"",email:"",password:"",confirm_password:"",isTermsConditionAccepted:!0}},computed:{validateForm:function(){return!this.errors.any()&&""!=this.username&&""!=this.email&&""!=this.password&&""!=this.confirm_password&&!0===this.isTermsConditionAccepted}},methods:{registerUser:function(){if(!this.validateForm)return!1;if(this.$store.state.auth.isUserLoggedIn())this.notifyAlreadyLogedIn();else{var e={userDetails:{email:this.email,password:this.password,username:this.username},notify:this.$vs.notify};this.$store.dispatch("auth/registerUser",e)}},notifyAlreadyLogedIn:function(){this.$vs.notify({title:"Login Attempt",text:"You are already logged in!",iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}}},l=r,o=a("2877"),n=Object(o["a"])(l,t,i,!1,null,null,null);s["default"]=n.exports}}]);
//# sourceMappingURL=chunk-be1520d4.b4181840.js.map