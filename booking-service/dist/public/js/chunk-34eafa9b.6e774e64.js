(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34eafa9b"],{3706:function(t,a,s){"use strict";var e=s("3f00"),i=s.n(e);i.a},"3f00":function(t,a,s){},"40a4":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return t.renderComponent?s("div",{staticClass:"vx-col w-full mb-base"},[s("vx-card",[s("h6",[t._v(t._s(t.$t("search_booking_history")))]),s("div",{staticClass:"mt-6 vx-row mb-6"},[s("div",{staticClass:"vx-col lg:w-5/12 md:w-1/2 w-full"},[s("div",{staticClass:"vx-row"},[s("div",{staticClass:"vx-col lg:w-1/3 w-full mt-5",staticStyle:{"padding-top":"3px"}},[s("label",[t._v(t._s(t.$t("start_datetime")))])]),s("div",{staticClass:"vx-col lg:w-2/3 w-full lg:mt-5 mt-0 sm:pr-10 lg:pr-0 md:pr-20"},[s("flat-pickr",{staticClass:"w-full flatpickr-input",class:{" danger":t.invalid.start_date},attrs:{config:t.configdateTimePicker,placeholder:""},model:{value:t.editObj.start_date,callback:function(a){t.$set(t.editObj,"start_date",a)},expression:"editObj.start_date"}})],1)])]),s("div",{staticClass:"vx-col lg:w-5/12 md:w-1/2 w-full"},[s("div",{staticClass:"vx-row"},[s("div",{staticClass:"vx-col lg:w-1/3 w-full mt-5",staticStyle:{"padding-top":"3px"}},[s("label",[t._v(t._s(t.$t("end_datetime")))])]),s("div",{staticClass:"vx-col lg:w-2/3 w-full lg:mt-5 mt-0 sm:pr-10 lg:pr-0 md:pr-20"},[s("flat-pickr",{staticClass:"w-full flatpickr-input",class:{"w-full flatpickr-input danger":t.invalid.end_date},attrs:{config:t.configdateTimePicker,placeholder:""},model:{value:t.editObj.end_date,callback:function(a){t.$set(t.editObj,"end_date",a)},expression:"editObj.end_date"}})],1)])]),s("div",{staticClass:"vx-col sm:pr-10 md:pr-20 lg:w-1/6 md:w-1/2 w-full mt-5"},[s("div",{staticClass:"vx-row pr-4 pl-4"},[s("vs-button",{ref:"loadableButton",staticClass:"vs-con-loading__container vx-col w-full",attrs:{id:"button-with-loading",vslor:"primary"},on:{click:function(a){return t.search()}}},[t._v(t._s(t.$t("search")))])],1)])])]),t.searched?s("vx-card",{staticClass:"mt-5"},[s("vs-table",{attrs:{stripe:"",pagination:"","max-items":"10",search:"",data:t.bookings},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.data;return t._l(e,function(a,e){return s("vs-tr",{key:e,attrs:{data:a}},[s("vs-td",{attrs:{data:a.booking_id}},[t._v(t._s(a.booking_id))]),s("vs-td",{attrs:{data:a.first_name+a.last_name,width:"200px"}},[t._v(t._s(a.first_name+" "+a.last_name))]),s("vs-td",{attrs:{data:a.room_name}},[t._v(t._s(a.room_name))]),s("vs-td",{attrs:{data:a.booking_description}},[t._v(t._s(a.booking_description))]),s("vs-td",{attrs:{data:a.start_date}},[t._v(t._s(t._f("formatDate")(a.start_date)))]),s("vs-td",{attrs:{data:a.end_date}},[t._v(t._s(t._f("formatDate")(a.end_date)))]),s("vs-td",{class:"A"+a.status_id,attrs:{data:a.status_name}},[t._v(t._s(t.$t(a.status_name)))]),s("vs-td",[s("feather-icon",{staticClass:"cursor-pointer w-6 h-6 text-primary",attrs:{icon:"MaximizeIcon",size:"small"},on:{click:function(s){return t.views(a)}}})],1)],1)})}}],null,!1,2392648579)},[s("template",{slot:"thead"},[s("vs-th",{attrs:{"sort-key":"booking_id"}},[t._v(t._s(t.$t("booking_id")))]),s("vs-th",{attrs:{"sort-key":"first_name+last_name"}},[t._v(t._s(t.$t("first_surname")))]),s("vs-th",{attrs:{"sort-key":"room_name"}},[t._v(t._s(t.$t("room_name")))]),s("vs-th",{attrs:{"sort-key":"booking_description"}},[t._v(t._s(t.$t("booking_description")))]),s("vs-th",{attrs:{"sort-key":"start_date"}},[t._v(t._s(t.$t("start_date")))]),s("vs-th",{attrs:{"sort-key":"end_date"}},[t._v(t._s(t.$t("end_date")))]),s("vs-th",{attrs:{"sort-key":"status_name"}},[t._v(t._s(t.$t("status_name")))]),s("vs-th",[t._v(t._s(t.$t("view")))])],1)],2)],1):t._e(),s("vs-popup",{staticClass:"holamundo",attrs:{title:t.$t("view"),active:t.popupActive},on:{"update:active":function(a){t.popupActive=a}}},[s("div",{staticClass:"vx-row mt-5"},[s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("Officer"))+":")]),s("div",{staticClass:"vx-col md:w-3/4 w-1/2 pl-5 value"},[t._v(t._s(t.view["department_name_"+t.$i18n.locale]))])]),s("div",{staticClass:"vx-row mt-5"},[s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("Department"))+":")]),s("div",{staticClass:"vx-col md:w-3/4 w-1/2 pl-5 value"},[t._v(t._s(t.view["sub_department_name_"+t.$i18n.locale]))])]),s("div",{staticClass:"vx-row mt-5"},[s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("booking_description"))+":")]),s("div",{staticClass:"vx-col md:w-3/4 w-1/2 pl-5 value"},[t._v(t._s(t.view.booking_description))])]),s("div",{staticClass:"vx-row mt-5"},[s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("booking_id"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t.view.booking_id))]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("first_surname"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t.view.first_name+" "+t.view.last_name))])]),s("div",{staticClass:"vx-row mt-5"},[s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("room_name"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t.view.room_name))]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("importance"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t.$t(t.view.important)))])]),s("div",{staticClass:"vx-row mt-5"},[s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("Remark"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t.view.remark))]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("Tel"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t.view.tel))])]),s("div",{staticClass:"vx-row mt-5"},[s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("Member"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t.view.member))]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("booking_date"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t._f("onlyDate")(t.view.booking_date)))])]),s("div",{staticClass:"vx-row mt-5"},[s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("date"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t._f("onlyDate")(t.view.start_date)))]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5"},[t._v(t._s(t.$t("time"))+":")]),s("div",{staticClass:"vx-col md:w-1/4 w-1/2 pl-5 value"},[t._v(t._s(t._f("onlyTime")(t.view.start_date))+"-"+t._s(t._f("onlyTime")(t.view.end_date)))])]),t.materials.length>0?s("v-template",[s("div",{staticClass:"vx-row mt-5 ml-5"},[s("strong",[t._v(t._s(t.$t("Material Detail")))])]),s("vs-table",{attrs:{stripe:"",pagination:"","max-items":"10",search:"",data:t.materials},scopedSlots:t._u([{key:"default",fn:function(a){var e=a.data;return t._l(e,function(a,e){return s("vs-tr",{key:e,attrs:{data:a}},[s("vs-td",{attrs:{data:a.material_id}},[t._v(t._s(a.material_id))]),s("vs-td",{attrs:{data:a.material_name,width:"200px"}},[t._v(t._s(a.material_name))]),s("vs-td",{attrs:{data:a.material_price}},[t._v(t._s(a.material_price))]),s("vs-td",{attrs:{data:a.number}},[t._v(t._s(a.number))]),s("vs-td",{attrs:{data:a.total_price}},[t._v(t._s(a.total_price))])],1)})}}],null,!1,2323768395)},[s("template",{slot:"thead"},[s("vs-th",{attrs:{"sort-key":"material_id"}},[t._v(t._s(t.$t("material_id")))]),s("vs-th",{attrs:{"sort-key":"material_name"}},[t._v(t._s(t.$t("material_name")))]),s("vs-th",{attrs:{"sort-key":"material_price"}},[t._v(t._s(t.$t("material_price")))]),s("vs-th",{attrs:{"sort-key":"number"}},[t._v(t._s(t.$t("material_number")))]),s("vs-th",{attrs:{"sort-key":"total_price"}},[t._v(t._s(t.$t("total_price")))])],1)],2)],1):t._e()],1)],1):t._e()},i=[],o=(s("551c"),s("fa33")),n=s("67cf"),l=s("fbea"),r=s("c1df"),d=s.n(r),c=s("c38f"),v=s.n(c),_=(s("0952"),{components:{EditUser:l["a"],Datepicker:o["a"],flatPickr:v.a},data:function(){return{change_password:!1,renderComponent:!0,popupActive:!1,bookings:[],roles:[],view:{},materials:[],searched:!1,submitted:!1,configdateTimePicker:{enableTime:!1,enableSeconds:!1,noCalendar:!1},editObj:{start_date:d()().format("YYYY-MM-DD"),end_date:d()().format("YYYY-MM-DD")}}},computed:{invalid:function(){var t=this,a=function(a){return t.submitted&&""==t.editObj[a]};return{start_date:a("start_date"),end_date:a("end_date")}},isInvald:function(){return this.invalid.start_date||this.invalid.end_date}},created:function(){this.getdata(),this.initVal()},methods:{initVal:function(){this.submitted=!1,this.change_password=!1},views:function(t){var a=this;this.popupActive=!0,this.view=t,n["a"].postData("/get_booked_material",{booking_id:t.booking_id}).then(function(t){a.materials=t.data})},delete_booking:function(t){var a=this;this.$swal({title:this.$t("delete_booking_title"),text:this.$t("delete_text"),type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:this.$t("cancel"),confirmButtonText:this.$t("confirm_delete"),showLoaderOnConfirm:!0,preConfirm:function(){return n["a"].postData("/delete_booking",{booking_id:t.booking_id}).then(function(t){return t})}}).then(function(t){t.value&&(t.value.code?a.$swal(a.$t("deleted_title"),"","success").then(function(t){a.getdata(),a.forceRerender(),a.initVal()}):a.$swal(t.value.message,"","error"))})},reject:function(t){var a=this;this.$swal({title:this.$t("reject_booking_title"),text:this.$t("reject_text"),type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:this.$t("cancel"),confirmButtonText:this.$t("confirm_delete"),showLoaderOnConfirm:!0,preConfirm:function(){return n["a"].postData("/reject",{booking_id:t.booking_id}).then(function(t){return t})}}).then(function(t){t.value&&(t.value.code?a.$swal(a.$t("rejected_title"),"","success").then(function(t){a.getdata(),a.forceRerender(),a.initVal()}):a.$swal(t.value.message,"","error"))})},approve:function(t){var a=this;this.$swal({title:this.$t("approve_booking_title"),text:this.$t("approve_text"),type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:this.$t("cancel"),confirmButtonText:this.$t("confirm_delete"),showLoaderOnConfirm:!0,preConfirm:function(){return n["a"].postData("/approve",{booking_id:t.booking_id}).then(function(t){return t})}}).then(function(t){t.value&&(t.value.code?a.$swal(a.$t("approved_title"),"","success").then(function(t){a.getdata(),a.forceRerender(),a.initVal()}):a.$swal(t.value.message,"","error"))})},getdata:function(){var t=this;n["a"].postData("/get_booked",{}).then(function(a){t.bookings=a.data})},search:function(){var t=this;this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:"#button-with-loading",scale:.45}),this.searched=!1;var a=this.editObj,s=a.start_date,e=a.end_date;s+=" 00:00:00",e+=" 23:59:59";var i=n["a"].getUser().user.username;n["a"].postData("get_user_booking_history",{start_date:s,end_date:e,username:i}).then(function(a){t.bookings=a.data,t.searched=!0,t.$vs.loading.close("#button-with-loading > .con-vs-loading")},function(a){t.$vs.loading.close("#button-with-loading > .con-vs-loading"),t.searched=!0})},forceRerender:function(){var t=this;this.renderComponent=!1,this.$nextTick(function(){t.renderComponent=!0})},save:function(){var t=this;this.submitted=!0,this.isInvald||(this.popupActive?this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:"#button-with-loading1",scale:.45}):this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:"#button-with-loading",scale:.45}),n["a"].postData("/upsert_room",this.editObj).then(function(a){t.popupActive?t.$vs.loading.close("#button-with-loading1 > .con-vs-loading"):t.$vs.loading.close("#button-with-loading > .con-vs-loading"),t.popupActive=!1,t.$swal(t.$t("success_title"),"","success").then(function(a){t.getdata(),t.forceRerender()})},function(a){t.popupActive=!1}))}},watch:{}}),u=_,m=(s("3706"),s("2877")),p=Object(m["a"])(u,e,i,!1,null,"7236fc1f",null);a["default"]=p.exports}}]);
//# sourceMappingURL=chunk-34eafa9b.6e774e64.js.map