(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-554b2e65"],{"1f8b":function(a,s,t){a.exports=t.p+"img/login.d814adb7.png"},"73ca2":function(a,s,t){},"8b48":function(a,s,t){"use strict";t.r(s);var e=function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("div",{staticClass:"h-screen flex w-full bg-img vx-row no-gutter items-center justify-center",attrs:{id:"page-login"}},[e("div",{staticClass:"vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4"},[e("vx-card",[e("div",{staticClass:"full-page-bg-color",attrs:{slot:"no-body"},slot:"no-body"},[e("div",{staticClass:"vx-row no-gutter justify-center items-center"},[e("div",{staticClass:"vx-col hidden lg:block lg:w-1/2"},[e("img",{staticClass:"mx-auto",attrs:{src:t("1f8b"),alt:"login"}})]),e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg"},[e("div",{staticClass:"p-8"},[e("div",{staticClass:"vx-card__title mb-8"},[e("h4",{staticClass:"mb-4"},[a._v("Login")]),e("p",[a._v("Welcome back, please login to your account.")])]),e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full no-icon-border",attrs:{"data-vv-validate-on":"blur",name:"username",icon:"icon icon-user","icon-pack":"feather","label-placeholder":"username"},model:{value:a.username,callback:function(s){a.username=s},expression:"username"}}),e("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("username")))]),e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full mt-6 no-icon-border",attrs:{"data-vv-validate-on":"blur",type:"password",name:"password",icon:"icon icon-lock","icon-pack":"feather","label-placeholder":"Password"},model:{value:a.password,callback:function(s){a.password=s},expression:"password"}}),e("span",{staticClass:"text-danger text-sm"},[a._v(a._s(a.errors.first("password")))]),e("br"),e("vs-button",{staticClass:"vs-con-loading__container right",attrs:{id:"button-with-loading",disabled:!a.validateForm},on:{click:a.login}},[a._v("Login")]),e("br")],1)])])])])],1)])},o=[],n=t("67cf"),i={data:function(){return{username:"",password:"",checkbox_remember_me:!1}},computed:{validateForm:function(){return!this.errors.any()&&""!=this.email&&""!=this.password}},methods:{login:function(){var a=this;this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:"#button-with-loading",scale:.45}),n["a"].postData("login",{username:this.username,password:this.password}).then(function(s){console.log(s),n["a"].setToken(s.token),a.$vs.loading.close("#button-with-loading > .con-vs-loading");var t=n["a"].getUser().user.role_name;a.$store.dispatch("updateUserRole",t),a.$acl.change(t),a.$router.push("/home")},function(s){a.$vs.loading.close("#button-with-loading > .con-vs-loading")})}}},r=i,l=(t("f499"),t("2877")),c=Object(l["a"])(r,e,o,!1,null,null,null);s["default"]=c.exports},f499:function(a,s,t){"use strict";var e=t("73ca2"),o=t.n(e);o.a}}]);
//# sourceMappingURL=chunk-554b2e65.df3deb9e.js.map