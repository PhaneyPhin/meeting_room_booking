(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33e55c3f"],{"2d3c":function(t,e,n){"use strict";var o=n("53e5"),a=n.n(o);a.a},"53e5":function(t,e,n){},b7c4:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.renderComponent?n("div",{staticClass:"vx-col w-full mb-base"},[n("vx-card",[n("vs-table",{attrs:{pagination:"","max-items":"10",search:"",data:t.bookings},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.data;return t._l(o,function(e,o){return n("vs-tr",{key:o,attrs:{data:e}},[n("vs-td",{attrs:{data:e.booking_id}},[t._v("\n                        "+t._s(e.booking_id)+"\n                      ")]),n("vs-td",{attrs:{data:e.first_name+e.last_name,width:"200px"}},[t._v("\n                        "+t._s(e.first_name+" "+e.last_name)+"\n                      ")]),n("vs-td",{attrs:{data:e.room_name}},[t._v("\n                        "+t._s(e.room_name)+"\n                      ")]),n("vs-td",{attrs:{data:e.booking_description}},[t._v("\n                        "+t._s(e.booking_description)+"\n                      ")]),n("vs-td",{attrs:{data:e.start_date}},[t._v("\n                        "+t._s(t._f("formatDate")(e.start_date))+"\n                      ")]),n("vs-td",{attrs:{data:e.end_date}},[t._v("\n                        "+t._s(t._f("formatDate")(e.end_date))+"\n                      ")]),n("vs-td",[n("feather-icon",{staticClass:"cursor-pointer w-6 h-6 text-danger",attrs:{icon:"Trash2Icon",size:"small"},on:{click:function(n){return t.delete_booking(e)}}})],1)],1)})}}],null,!1,25458042)},[n("template",{slot:"thead"},[n("vs-th",{attrs:{"sort-key":"booking_id"}},[t._v(t._s(t.$t("booking_id")))]),n("vs-th",{attrs:{"sort-key":"first_name+last_name"}},[t._v(t._s(t.$t("first_surname")))]),n("vs-th",{attrs:{"sort-key":"room_name"}},[t._v(t._s(t.$t("room_name")))]),n("vs-th",{attrs:{"sort-key":"booking_description"}},[t._v(t._s(t.$t("booking_description")))]),n("vs-th",{attrs:{"sort-key":"start_date"}},[t._v(t._s(t.$t("start_date")))]),n("vs-th",{attrs:{"sort-key":"end_date"}},[t._v(t._s(t.$t("end_date")))]),n("vs-th",[t._v(t._s(t.$t("delete")))])],1)],2)],1)],1):t._e()},a=[],i=n("fa33"),s=n("67cf"),r=n("fbea"),c=(n("c1df"),{components:{EditUser:r["a"],Datepicker:i["a"]},data:function(){return{change_password:!1,renderComponent:!0,popupActive:!1,bookings:[],roles:[],submitted:!1,editObj:{}}},computed:{invalid:function(){var t=this,e=function(e){return t.submitted&&""==t.editObj[e]};return{room_name:e("room_name"),num_chair:e("num_chair"),num_table:e("num_table")}},isInvald:function(){return this.invalid.room_name||this.invalid.num_chair||this.invalid.num_table}},created:function(){this.getdata(),this.initVal()},methods:{initVal:function(){this.submitted=!1,this.change_password=!1,popupActive=!1,this.editObj={room_name:"",num_chair:"",num_table:""}},delete_booking:function(t){var e=this;this.$swal({title:this.$t("delete_booking_title"),text:this.$t("delete_text"),type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:this.$t("cancel"),confirmButtonText:this.$t("confirm_delete"),showLoaderOnConfirm:!0,preConfirm:function(){return s["a"].postData("/delete_booking",{booking_id:t.booking_id}).then(function(t){return t})}}).then(function(t){t.value&&(t.value.code?e.$swal(e.$t("deleted_title"),"","success").then(function(t){e.getdata(),e.forceRerender(),e.initVal()}):e.$swal(t.value.message,"","error"))})},reject:function(t){var e=this;this.$swal({title:this.$t("reject_booking_title"),text:this.$t("reject_text"),type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:this.$t("cancel"),confirmButtonText:this.$t("confirm_delete"),showLoaderOnConfirm:!0,preConfirm:function(){return s["a"].postData("/reject",{booking_id:t.booking_id}).then(function(t){return t})}}).then(function(t){t.value&&(t.value.code?e.$swal(e.$t("rejected_title"),"","success").then(function(t){e.getdata(),e.forceRerender(),e.initVal()}):e.$swal(t.value.message,"","error"))})},approve:function(t){var e=this;this.$swal({title:this.$t("approve_booking_title"),text:this.$t("approve_text"),type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:this.$t("cancel"),confirmButtonText:this.$t("confirm_delete"),showLoaderOnConfirm:!0,preConfirm:function(){return s["a"].postData("/approve",{booking_id:t.booking_id}).then(function(t){return t})}}).then(function(t){t.value&&(t.value.code?e.$swal(e.$t("approved_title"),"","success").then(function(t){e.getdata(),e.forceRerender(),e.initVal()}):e.$swal(t.value.message,"","error"))})},getdata:function(){var t=this,e=s["a"].getUser().user.username;s["a"].postData("/get_user_booked",{username:e}).then(function(e){t.bookings=e.data})},forceRerender:function(){var t=this;this.renderComponent=!1,this.$nextTick(function(){t.renderComponent=!0})},save:function(){var t=this;this.submitted=!0,this.isInvald||(this.popupActive?this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:"#button-with-loading1",scale:.45}):this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:"#button-with-loading",scale:.45}),s["a"].postData("/upsert_room",this.editObj).then(function(e){t.popupActive?t.$vs.loading.close("#button-with-loading1 > .con-vs-loading"):t.$vs.loading.close("#button-with-loading > .con-vs-loading"),t.popupActive=!1,t.$swal(t.$t("success_title"),"","success").then(function(e){t.getdata(),t.forceRerender()})},function(e){t.popupActive=!1}))}},watch:{popupActive:function(t){t||(this.editObj={room_name:"",num_chair:"",num_table:""})}}}),d=c,u=(n("2d3c"),n("2877")),l=Object(u["a"])(d,o,a,!1,null,"7f462621",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-33e55c3f.17a7d72b.js.map