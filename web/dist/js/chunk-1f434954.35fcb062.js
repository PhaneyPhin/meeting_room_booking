(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f434954"],{a547:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return t.renderComponent?a("div",{staticClass:"vx-col w-full mb-base"},[a("vx-card",[a("vs-tabs",[a("vs-tab",{attrs:{label:t.$t("user_data")}},[a("div",{staticClass:"mt-3"},[a("vs-table",{attrs:{pagination:"","max-items":"10",search:"",data:t.users},scopedSlots:t._u([{key:"default",fn:function(s){var e=s.data;return t._l(e,function(s,e){return a("vs-tr",{key:e,attrs:{data:s}},[a("vs-td",{attrs:{data:s.username}},[t._v("\n                        "+t._s(s.username)+"\n                      ")]),a("vs-td",{attrs:{data:s.first_name}},[t._v("\n                        "+t._s(s.first_name)+"\n                      ")]),a("vs-td",{attrs:{data:s.last_name}},[t._v(t._s(s.last_name))]),a("vs-td",{attrs:{data:s.last_name}},[t._v("\n                        "+t._s(s.email)+"\n                      ")]),a("vs-td",{attrs:{data:s.role_name}},[t._v("\n                        "+t._s(t.$t(s.role_name))+"\n                      ")]),a("vs-td",[a("feather-icon",{staticClass:"cursor-pointer w-6 h-6 text-warning",attrs:{icon:"EditIcon",size:"small"},on:{click:function(a){t.editObj=s,t.popupActive=!0}}})],1),a("vs-td",[a("feather-icon",{staticClass:"cursor-pointer w-6 h-6 text-danger",attrs:{icon:"Trash2Icon",size:"small"},on:{click:function(a){return t.delete_user(s)}}})],1)],1)})}}],null,!1,3420960257)},[a("template",{slot:"thead"},[a("vs-th",{attrs:{"sort-key":"index"}},[t._v(t._s(t.$t("username")))]),a("vs-th",{attrs:{"sort-key":"first_name"}},[t._v(t._s(t.$t("first_name")))]),a("vs-th",{attrs:{"sort-key":"last_name"}},[t._v(t._s(t.$t("last_name")))]),a("vs-th",{attrs:{"sort-key":"email"}},[t._v(t._s(t.$t("email")))]),a("vs-th",{attrs:{"sort-key":"role_name"}},[t._v(t._s(t.$t("role")))]),a("vs-th",[t._v(t._s(t.$t("edit")))]),a("vs-th",[t._v(t._s(t.$t("delete")))])],1)],2)],1)]),a("vs-tab",{attrs:{label:t.$t("add_user")}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col md:w-1/3 mt-5"},[a("label",[t._v(t._s(t.$t("first_name"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.first_name},model:{value:t.editObj.first_name,callback:function(s){t.$set(t.editObj,"first_name",s)},expression:"editObj.first_name"}}),t.invalid.first_name?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_first_name"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-1/3 mt-5"},[a("label",[t._v(t._s(t.$t("last_name"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.last_name},model:{value:t.editObj.last_name,callback:function(s){t.$set(t.editObj,"last_name",s)},expression:"editObj.last_name"}}),t.invalid.last_name?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_last_name"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-1/3 mt-5"},[a("label",[t._v(t._s(t.$t("email"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.email},model:{value:t.editObj.email,callback:function(s){t.$set(t.editObj,"email",s)},expression:"editObj.email"}}),t.invalid.email?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_email"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-1/2 mt-5"},[a("label",[t._v(t._s(t.$t("username"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.username},model:{value:t.editObj.username,callback:function(s){t.$set(t.editObj,"username",s)},expression:"editObj.username"}}),t.invalid.username?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_username"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-1/2 mt-5"},[a("label",[t._v(t._s(t.$t("password"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.password},model:{value:t.editObj.password,callback:function(s){t.$set(t.editObj,"password",s)},expression:"editObj.password"}}),t.invalid.password?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_password"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-1/2 mt-5"},[a("label",[t._v(t._s(t.$t("confirm_password"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.confirm_password},model:{value:t.editObj.confirm_password,callback:function(s){t.$set(t.editObj,"confirm_password",s)},expression:"editObj.confirm_password"}}),t.invalid.confirm_password?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_confirm_password"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-1/2 mt-5"},[a("label",[t._v(t._s(t.$t("role"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-select",{staticClass:"w-full",attrs:{danger:t.invalid.role},model:{value:t.editObj.role,callback:function(s){t.$set(t.editObj,"role",s)},expression:"editObj.role"}},t._l(t.roles,function(s,e){return a("vs-select-item",{key:e,attrs:{value:s.role_id,text:t.$t(s.role_name)}})}),1),t.invalid.role?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_role"))+"\n                  ")]):t._e()],1)]),a("div",[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full mt-5"},[a("vs-button",{staticClass:"right",attrs:{color:"danger",type:"border"},on:{click:function(s){return t.forceRerender()}}},[t._v(t._s(t.$t("cancel")))]),a("vs-button",{ref:"loadableButton",staticClass:"vs-con-loading__container right",attrs:{id:"button-with-loading",vslor:"primary"},on:{click:t.save}},[t._v(t._s(t.$t("save")))])],1)])])])],1),a("vs-popup",{staticClass:"holamundo",attrs:{title:t.$t("edit_title"),active:t.popupActive},on:{"update:active":function(s){t.popupActive=s}}},[t.change_password?t._e():a("v-template",[a("div",{staticClass:"vx-col md:w-full mt-3"},[a("label",[t._v(t._s(t.$t("first_name"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.first_name},model:{value:t.editObj.first_name,callback:function(s){t.$set(t.editObj,"first_name",s)},expression:"editObj.first_name"}}),t.invalid.first_name?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_first_name"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-full mt-3"},[a("label",[t._v(t._s(t.$t("last_name"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.last_name},model:{value:t.editObj.last_name,callback:function(s){t.$set(t.editObj,"last_name",s)},expression:"editObj.last_name"}}),t.invalid.last_name?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_last_name"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-full mt-3"},[a("label",[t._v(t._s(t.$t("email"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.email},model:{value:t.editObj.email,callback:function(s){t.$set(t.editObj,"email",s)},expression:"editObj.email"}}),t.invalid.email?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_email"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-full mt-3"},[a("label",[t._v(t._s(t.$t("username"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.username,disabled:""},model:{value:t.editObj.username,callback:function(s){t.$set(t.editObj,"username",s)},expression:"editObj.username"}}),t.invalid.username?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_username"))+"\n                  ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-full mt-3"},[a("label",[t._v(t._s(t.$t("role"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-select",{staticClass:"w-full",attrs:{danger:t.invalid.role},model:{value:t.editObj.role,callback:function(s){t.$set(t.editObj,"role",s)},expression:"editObj.role"}},t._l(t.roles,function(s,e){return a("vs-select-item",{key:e,attrs:{value:s.role_id,text:t.$t(s.role_name)}})}),1),t.invalid.role?a("div",{staticClass:"errors"},[t._v("\n                    "+t._s(t.$t("alert_role"))+"\n                  ")]):t._e()],1)]),t.change_password?a("v-template",[a("div",{staticClass:"vx-col md:w-full mt-3"},[a("label",[t._v(t._s(t.$t("new_password"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.password},model:{value:t.editObj.password,callback:function(s){t.$set(t.editObj,"password",s)},expression:"editObj.password"}}),t.invalid.password?a("div",{staticClass:"errors"},[t._v("\n                        "+t._s(t.$t("alert_password"))+"\n                      ")]):t._e()],1),a("div",{staticClass:"vx-col md:w-full mt-3"},[a("label",[t._v(t._s(t.$t("confirm_password"))),a("span",{staticClass:"require"},[t._v("*")])]),a("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.confirm_password},model:{value:t.editObj.confirm_password,callback:function(s){t.$set(t.editObj,"confirm_password",s)},expression:"editObj.confirm_password"}}),t.invalid.confirm_password?a("div",{staticClass:"errors"},[t._v("\n                        "+t._s(t.$t("alert_confirm_password"))+"\n                      ")]):t._e()],1)]):t._e(),a("div",{staticClass:"vx-col md:w-full mt-5"},[a("vs-button",{attrs:{color:"primary"},on:{click:function(s){t.change_password=!t.change_password}}},[t._v(t._s(t.change_password?t.$t("edit_user"):t.$t("change_password")))]),a("vs-button",{staticClass:"right",attrs:{color:"danger",type:"border"},on:{click:function(s){t.popupActive=!1}}},[t._v(t._s(t.$t("cancel")))]),a("vs-button",{ref:"loadableButton",staticClass:"vs-con-loading__container right",attrs:{id:"button-with-loading",vslor:"primary"},on:{click:function(s){return t.edit()}}},[t._v(t._s(t.$t("save")))])],1)],1)],1)],1):t._e()},i=[],n=a("fa33"),r=a("67cf"),l=a("fbea"),o=(a("c1df"),{components:{EditUser:l["a"],Datepicker:n["a"]},data:function(){return{change_password:!1,renderComponent:!0,sideBarActive:!1,popupActive:!1,users:[],roles:[],submitted:!1,editObj:{}}},computed:{invalid:function(){var t=this,s=function(s){return t.submitted&&""==t.editObj[s]};return{first_name:s("first_name"),last_name:s("last_name"),email:s("email"),username:s("username"),password:(!this.popupActive||this.change_password)&&s("password"),confirm_password:this.submitted&&this.editObj.password!=this.editObj.confirm_password,role:s("role"),old_password:this.change_password&&s("old_password")}},isInvald:function(){return this.invalid.first_name||this.invalid.last_name||this.invalid.email||this.invalid.username||this.invalid.password||this.invalid.confirm_password||this.invalid.role||this.old_password}},created:function(){this.getdata(),this.initVal()},methods:{initVal:function(){this.submitted=!1,this.change_password=!1,this.popupActive=!1,this.editObj={old_password:"",first_name:"",last_name:"",email:"",username:"",password:"",confirm_password:"",role:""}},edit:function(){var t,s=this;(this.submitted=!0,this.isInvald)||(t=this.change_password?"admin_change_password":"update_user",this.popupActive=!1,r["a"].postData(t,this.editObj).then(function(t){s.$swal(s.$t("success_title"),"","success").then(function(t){s.getdata(),s.forceRerender(),s.initVal()})}))},delete_user:function(t){var s=this;this.$swal({title:this.$t("delete_user_title"),text:this.$t("delete_text"),type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:this.$t("cancel"),confirmButtonText:this.$t("confirm_delete"),showLoaderOnConfirm:!0,preConfirm:function(){return r["a"].postData("/delete_user",{username:t.username}).then(function(t){return t})}}).then(function(t){t.value&&(t.value.code?s.$swal(s.$t("deleted_title"),"","success").then(function(t){s.getdata(),s.forceRerender(),s.initVal()}):s.$swal(t.value.message,"","error"))})},getdata:function(){var t=this;r["a"].postData("/get_user",{}).then(function(s){t.users=s.data.map(function(t){return t.password="",t.confirm_password="",t})}),r["a"].postData("/get_role",{}).then(function(s){t.roles=s.data},function(t){})},forceRerender:function(){var t=this;this.renderComponent=!1,this.$nextTick(function(){t.renderComponent=!0})},save:function(){var t=this;this.submitted=!0,this.isInvald||r["a"].postData("/add_user",this.editObj).then(function(s){t.$swal(t.$t("success_title"),"","success").then(function(s){t.getdata(),t.forceRerender(),t.initVal()})})}},watch:{popupActive:function(t){t||this.initVal()}}}),d=o,c=(a("a906"),a("2877")),_=Object(c["a"])(d,e,i,!1,null,"3334354e",null);s["default"]=_.exports},a906:function(t,s,a){"use strict";var e=a("b075"),i=a.n(e);i.a},b075:function(t,s,a){}}]);
//# sourceMappingURL=chunk-1f434954.35fcb062.js.map