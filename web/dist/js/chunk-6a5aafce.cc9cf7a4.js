(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a5aafce"],{"7d10":function(t,a,e){"use strict";var i=e("bb31"),s=e.n(i);s.a},a06a:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.renderComponent?e("div",{staticClass:"vx-col w-full mb-base"},[e("vx-card",[e("vs-tabs",[e("vs-tab",{attrs:{label:t.$t("Material Data")}},[e("div",{staticClass:"mt-3"},[e("vs-table",{attrs:{stripe:"",pagination:"","max-items":"10",search:"",data:t.materials},scopedSlots:t._u([{key:"default",fn:function(a){var i=a.data;return t._l(i,function(a,i){return e("vs-tr",{key:i,attrs:{data:a}},[e("vs-td",{attrs:{data:a.material_id}},[t._v(t._s(a.material_id))]),e("vs-td",{attrs:{data:a.material_name}},[t._v(t._s(a.material_name))]),e("vs-td",{attrs:{data:a.material_price}},[t._v(t._s(a.material_price))]),e("vs-td",[e("feather-icon",{staticClass:"cursor-pointer w-6 h-6 text-warning",attrs:{icon:"EditIcon",size:"small"},on:{click:function(e){t.editObj=a,t.popupActive=!0}}})],1),e("vs-td",[e("feather-icon",{staticClass:"cursor-pointer w-6 h-6 text-danger",attrs:{icon:"Trash2Icon",size:"small"},on:{click:function(e){return t.delete_material(a)}}})],1)],1)})}}],null,!1,1598662740)},[e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"material_id"}},[t._v(t._s(t.$t("material_id")))]),e("vs-th",{attrs:{"sort-key":"material_name"}},[t._v(t._s(t.$t("material_name")))]),e("vs-th",{attrs:{"sort-key":"material_price"}},[t._v(t._s(t.$t("material_price")))]),e("vs-th",[t._v(t._s(t.$t("edit")))]),e("vs-th",[t._v(t._s(t.$t("delete")))])],1)],2)],1)]),e("vs-tab",{attrs:{label:t.$t("Add Material")}},[e("div",{staticClass:"container"},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col md:w-1/2 w-full mt-5"},[e("label",[t._v("\n                "+t._s(t.$t("material_name"))+"\n                "),e("span",{staticClass:"require"},[t._v("*")])]),e("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.material_name},model:{value:t.editObj.material_name,callback:function(a){t.$set(t.editObj,"material_name",a)},expression:"editObj.material_name"}}),t.invalid.material_name?e("div",{staticClass:"errors"},[t._v(t._s(t.$t("alert_material_name")))]):t._e()],1),e("div",{staticClass:"vx-col md:w-1/2 w-full mt-5"},[e("label",[t._v("\n                "+t._s(t.$t("material_price"))+"\n                "),e("span",{staticClass:"require"},[t._v("*")])]),e("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.material_price},model:{value:t.editObj.material_price,callback:function(a){t.$set(t.editObj,"material_price",a)},expression:"editObj.material_price"}}),t.invalid.material_price?e("div",{staticClass:"errors"},[t._v(t._s(t.$t("alert_material_price")))]):t._e()],1)]),e("div",[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col w-full mt-5"},[e("vs-button",{ref:"loadableButton",staticClass:"vs-con-loading__container",staticStyle:{"margin-right":"10px"},attrs:{id:"button-with-loading",vslor:"primary"},on:{click:t.save}},[t._v(t._s(t.$t("save")))]),e("vs-button",{attrs:{color:"danger",type:"border"},on:{click:function(a){return t.forceRerender()}}},[t._v(t._s(t.$t("cancel")))])],1)])])])])],1),e("vs-popup",{staticClass:"holamundo",attrs:{title:t.$t("edit_title"),active:t.popupActive},on:{"update:active":function(a){t.popupActive=a}}},[e("div",{staticClass:"vx-col md:w-full mt-3"},[e("label",[t._v("\n          "+t._s(t.$t("material_id"))+"\n          "),e("span",{staticClass:"require"},[t._v("*")])]),e("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.material_id,disabled:!0},model:{value:t.editObj.material_id,callback:function(a){t.$set(t.editObj,"material_id",a)},expression:"editObj.material_id"}}),t.invalid.material_id?e("div",{staticClass:"errors"},[t._v(t._s(t.$t("alert_material_id")))]):t._e()],1),e("div",{staticClass:"vx-col md:w-full mt-3"},[e("label",[t._v("\n          "+t._s(t.$t("material_name"))+"\n          "),e("span",{staticClass:"require"},[t._v("*")])]),e("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.material_name},model:{value:t.editObj.material_name,callback:function(a){t.$set(t.editObj,"material_name",a)},expression:"editObj.material_name"}}),t.invalid.material_name?e("div",{staticClass:"errors"},[t._v(t._s(t.$t("alert_material_name")))]):t._e()],1),e("div",{staticClass:"vx-col md:w-full mt-3"},[e("label",[t._v("\n          "+t._s(t.$t("material_price"))+"\n          "),e("span",{staticClass:"require"},[t._v("*")])]),e("vs-input",{staticClass:"w-full",attrs:{danger:t.invalid.material_price},model:{value:t.editObj.material_price,callback:function(a){t.$set(t.editObj,"material_price",a)},expression:"editObj.material_price"}}),t.invalid.material_price?e("div",{staticClass:"errors"},[t._v(t._s(t.$t("alert_material_price")))]):t._e()],1),e("div",{staticClass:"vx-col md:w-full mt-5"},[e("vs-button",{staticClass:"right",attrs:{color:"danger",type:"border"},on:{click:function(a){t.popupActive=!1}}},[t._v(t._s(t.$t("cancel")))]),e("vs-button",{ref:"loadableButton",staticClass:"vs-con-loading__container right",attrs:{id:"button-with-loading",vslor:"primary"},on:{click:function(a){return t.edit()}}},[t._v(t._s(t.$t("save")))])],1)])],1)],1):t._e()},s=[],r=(e("551c"),e("fa33")),n=e("67cf"),l=e("fbea"),c=(e("c1df"),{components:{EditUser:l["a"],Datepicker:r["a"]},data:function(){return{change_password:!1,renderComponent:!0,sideBarActive:!1,popupActive:!1,materials:[],roles:[],submitted:!1,editObj:{}}},computed:{invalid:function(){var t=this,a=function(a){return t.submitted&&""==t.editObj[a]};return{material_name:a("material_name"),material_price:a("material_price")}},isInvald:function(){var t=this.invalid;return t.material_name||t.material_price}},created:function(){this.getdata(),this.initVal()},methods:{checkEnglish:function(t){var a=window.checkEnglish(t);a||t.preventDefault()},initVal:function(){this.submitted=!1,this.change_password=!1,this.popupActive=!1,this.editObj={material_id:"",material_name:"",material_price:""}},edit:function(){var t=this;this.submitted=!0,this.isInvald||(this.popupActive=!1,n["a"].postData("material/update",this.editObj).then(function(a){t.$swal(t.$t("success_title"),"","success").then(function(a){t.getdata(),t.forceRerender(),t.initVal()})}))},delete_material:function(t){var a=this;this.$swal({title:this.$t("delete_material_title"),text:this.$t("delete_text"),type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:this.$t("cancel"),confirmButtonText:this.$t("confirm_delete"),showLoaderOnConfirm:!0,preConfirm:function(){return n["a"].postData("/material/delete",{material_id:t.material_id}).then(function(t){return t})}}).then(function(t){t.value&&(t.value.code?a.$swal(a.$t("deleted_title"),"","success").then(function(t){a.getdata(),a.forceRerender(),a.initVal()}):a.$swal(t.value.message,"","error"))})},getdata:function(){var t=this;n["a"].postData("/material/get",{}).then(function(a){t.materials=a.data})},forceRerender:function(){var t=this;this.renderComponent=!1,this.$nextTick(function(){t.renderComponent=!0})},save:function(){var t=this;this.submitted=!0,this.isInvald||n["a"].postData("/material/create",this.editObj).then(function(a){t.$swal(t.$t("success_title"),"","success").then(function(a){t.getdata(),t.forceRerender(),t.initVal()})})}},watch:{popupActive:function(t){t||this.initVal()}}}),o=c,d=(e("7d10"),e("2877")),m=Object(d["a"])(o,i,s,!1,null,"72422083",null);a["default"]=m.exports},bb31:function(t,a,e){}}]);
//# sourceMappingURL=chunk-6a5aafce.cc9cf7a4.js.map