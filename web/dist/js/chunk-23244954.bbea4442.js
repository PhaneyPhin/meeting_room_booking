(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23244954"],{"6c6f":function(t,e,a){"use strict";var i=a("d6a6"),s=a.n(i);s.a},d6a6:function(t,e,a){},e103:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.renderComponent?a("div",{staticClass:"vx-col w-full mb-base"},[t.booking?t._e():a("div",{staticClass:"w-full"},[a("vx-card",[a("h6",[t._v(t._s(t.$t("search_free_room")))]),a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col md:w-1/3 sm:w-1/2 w-full mt-6"},[a("label",[t._v(t._s(t.$t("Building")))]),a("vs-select",{staticClass:"w-full",model:{value:t.editObj.building_id,callback:function(e){t.$set(t.editObj,"building_id",e)},expression:"editObj.building_id"}},[a("vs-select-item",{attrs:{value:"",text:t.$t("all")}}),t._l(t.buildings,function(e,i){return a("vs-select-item",{key:i,attrs:{value:e.building_id,text:t.$t(e.building_name)}})})],2)],1),a("div",{staticClass:"vx-col md:w-1/3 sm:w-1/2 w-full mt-6"},[a("label",[t._v(t._s(t.$t("room")))]),a("vs-select",{staticClass:"w-full",model:{value:t.editObj.room_id,callback:function(e){t.$set(t.editObj,"room_id",e)},expression:"editObj.room_id"}},[a("vs-select-item",{attrs:{value:"",text:t.$t("all")}}),t._l(t.rooms,function(e,i){return a("vs-select-item",{key:i,attrs:{value:e.room_id,text:t.$t(e.room_name)}})})],2)],1)]),a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col md:w-1/3 sm:w-1/2 w-full mt-6"},[a("label",[t._v(t._s(t.$t("date")))]),a("flat-pickr",{staticClass:"w-full",attrs:{config:t.configdateTimePicker,placeholder:"Choose time"},model:{value:t.editObj.date,callback:function(e){t.$set(t.editObj,"date",e)},expression:"editObj.date"}})],1),a("div",{staticClass:"vx-col md:w-1/3 sm:w-1/2 w-full mt-6"},[a("div",{staticStyle:{width:"45%",float:"left"}},[a("label",[t._v(t._s(t.$t("time")))]),a("flat-pickr",{staticClass:"w-full",attrs:{config:t.configTime,placeholder:"Choose time"},model:{value:t.editObj.start_time,callback:function(e){t.$set(t.editObj,"start_time",e)},expression:"editObj.start_time"}})],1),a("div",{staticStyle:{width:"10%",float:"left","text-align":"center","padding-top":"30px"}},[t._v(t._s(t.$t("to")))]),a("div",{staticStyle:{width:"45%","padding-top":"20px",float:"left"}},[a("flat-pickr",{staticClass:"w-full",attrs:{config:t.configTime,placeholder:"Choose time"},model:{value:t.editObj.end_time,callback:function(e){t.$set(t.editObj,"end_time",e)},expression:"editObj.end_time"}})],1)]),a("div",{staticClass:"vx-col md:w-1/6 sm:w-1/2 w-full mt-6",staticStyle:{"padding-top":"20px"}},[a("vs-button",{ref:"loadableButton",staticClass:"vs-con-loading__container right",attrs:{id:"button-with-loading",vslor:"primary"},on:{click:function(e){return t.search()}}},[t._v(t._s(t.$t("search")))])],1)])]),0==t.room_lists.length&&t.searched?a("div",{staticClass:"mt-6 text-center"},[t._v(t._s(t.$t("no_data")))]):t._e(),a("div",{staticClass:"vx-row"},t._l(t.room_lists,function(e,i){return a("div",{key:i,staticClass:"vx-col lg:w-1/3 md:w-1/2 w-full mt-5",staticStyle:{padding:"10px"}},[a("vx-card",{staticClass:"w-full"},[a("table",{staticStyle:{width:"100%"}},[a("tr",[a("td",[t._v(t._s(t.$t("room_id")))]),a("td",[t._v(t._s(e.room_id))])]),a("tr",[a("td",[t._v(t._s(t.$t("room_name")))]),a("td",[t._v(t._s(e.room_name))])]),a("tr",[a("td",[t._v(t._s(t.$t("num_table")))]),a("td",[t._v(t._s(e.num_table))])]),a("tr",[a("td",[t._v(t._s(t.$t("num_chair")))]),a("td",[t._v(t._s(e.num_chair))])]),a("tr",[a("td",[t._v(t._s(t.$t("status")))]),a("td",{style:{color:"1"==e.status?"green":"red"}},[t._v(t._s("1"==e.status?t.$t("Available"):t.$t("Not Available")))])]),a("tr",[a("td",{attrs:{colspan:"2"}},[a("vs-button",{ref:"loadableButton",refInFor:!0,staticClass:"vs-con-loading__container",attrs:{id:"button-with-loading1",vslor:"primary",disabled:"0"==e.status},on:{click:function(a){return t.book(e)}}},[t._v(t._s(t.$t("book_this_room")))])],1)])])])],1)}),0)],1),t.booking?a("div",{staticClass:"w-full"},[a("vx-card",[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col full"},[a("h6",[t._v(t._s(t.$t("booking_room")))])])]),a("div",{staticClass:"mt-6 vx-row lg:ml-10 lg:mr-10"},[a("div",{staticClass:"vx-col lg:w-1/2 w-full"},[a("table",{staticStyle:{width:"100%"}},[a("tr",[a("td",{staticStyle:{padding:"5px"}},[t._v(t._s(t.$t("username")))]),a("td",{staticClass:"text-primary"},[t._v(t._s(t.booking_data.first_name+" "+t.booking_data.last_name))])]),a("tr"),a("tr",{},[a("td",{staticStyle:{padding:"5px"}},[t._v(t._s(t.$t("start_date")))]),a("td",{staticClass:"text-primary"},[t._v(t._s(t.booking_data.start_date))])]),a("tr",{},[a("td",{staticStyle:{padding:"5px"}},[t._v(t._s(t.$t("email")))]),a("td",{staticClass:"text-primary"},[t._v(t._s(t.booking_data.email))])])])]),a("div",{staticClass:"vx-col lg:w-1/2 w-full"},[a("table",{staticStyle:{width:"100%"}},[a("tr",[a("td",[t._v(t._s(t.$t("room_name")))]),a("td",{staticClass:"text-primary"},[t._v(t._s(t.booking_data.room_name))])]),a("tr"),a("tr",[a("td",[t._v(t._s(t.$t("end_date")))]),a("td",{staticClass:"text-primary"},[t._v(t._s(t.booking_data.end_date))])])])])]),a("vs-divider",{attrs:{position:"left"}},[t._v(t._s(t.$t("detail_input")))]),a("div",{staticClass:"container"},[a("div",{staticClass:"vx-row mt-10"},[a("div",{staticClass:"vx-col md:w-1/4 sm:w-1/3 w-full"},[t._v("\n            "+t._s(t.$t("detail"))+"\n            "),a("span",{staticClass:"require"},[t._v("*")]),t._v(":\n          ")]),a("div",{staticClass:"vx-col md:w-3/4 sm:w-2/3 w-full"},[a("vs-input",{staticClass:"w-full",attrs:{danger:t.submitted&&""==t.detail},model:{value:t.detail,callback:function(e){t.detail=e},expression:"detail"}}),t.submitted&&""==t.detail?a("div",{staticClass:"errors"},[t._v(t._s(t.$t("Please input subject")))]):t._e()],1)]),a("div",{staticClass:"vx-row mt-5 mb-10"},[a("div",{staticClass:"vx-col md:w-1/4 sm:w-1/3 w-full"},[t._v("\n            "+t._s(t.$t("importance"))+" :\n            "),a("span",{staticClass:"require"},[t._v("*")])]),a("div",{staticClass:"vx-col md:w-3/4 sm:w-2/3 w-full"},[a("vs-select",{staticClass:"w-full",attrs:{danger:""==t.important&&t.submitted},model:{value:t.important,callback:function(e){t.important=e},expression:"important"}},t._l(t.important_lists,function(e,i){return a("vs-select-item",{key:i,attrs:{value:e,text:t.$t(e)}})}),1),t.submitted&&""==t.important?a("div",{staticClass:"errors"},[t._v(t._s(t.$t("Please select important")))]):t._e()],1)]),a("div",{staticClass:"vx-row mt-5 mb-10"},[a("div",{staticClass:"vx-col md:w-1/4 sm:w-1/3 w-full"},[t._v("\n            "+t._s(t.$t("Number of Member"))+" :\n            "),a("span",{staticClass:"require"},[t._v("*")])]),a("div",{staticClass:"vx-col md:w-3/4 sm:w-2/3 w-full"},[a("vs-input",{staticClass:"w-full",attrs:{danger:t.submitted&&""==t.member},on:{keypress:t.checkNumber},model:{value:t.member,callback:function(e){t.member=e},expression:"member"}}),t.submitted&&""==t.member?a("div",{staticClass:"errors"},[t._v(t._s(t.$t("Please input number of member")))]):t._e()],1)]),a("div",{staticClass:"vx-row mt-5 mb-10"},[a("div",{staticClass:"vx-col md:w-1/4 sm:w-1/3 w-full"},[t._v("\n            "+t._s(t.$t("Remark"))+" :\n            "),a("span",{staticClass:"require"},[t._v("*")])]),a("div",{staticClass:"vx-col md:w-3/4 sm:w-2/3 w-full"},[a("vs-input",{staticClass:"w-full",attrs:{danger:t.submitted&&""==t.remark},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}}),t.submitted&&""==t.remark?a("div",{staticClass:"errors"},[t._v(t._s(t.$t("Please input remark")))]):t._e()],1)]),a("div",{staticClass:"vx-row mt-5 mb-10"},[a("div",{staticClass:"vx-col md:w-1/4 sm:w-1/3 w-full"},[t._v("\n            "+t._s(t.$t("Tel"))+" :\n            "),a("span",{staticClass:"require"},[t._v("*")])]),a("div",{staticClass:"vx-col md:w-3/4 sm:w-2/3 w-full"},[a("vs-input",{staticClass:"w-full",attrs:{danger:t.submitted&&""==t.tel,maxlength:"10"},on:{keypress:t.checkNumber},model:{value:t.tel,callback:function(e){t.tel=e},expression:"tel"}}),t.submitted&&""==t.tel?a("div",{staticClass:"errors"},[t._v(t._s(t.$t("Please input remark")))]):t._e()],1)])]),a("vs-divider",{attrs:{position:"left"}},[t._v(t._s(t.$t("material_using")))]),a("div",{staticClass:"container"},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full mt-5"},[a("vs-button",{attrs:{color:"primary","icon-pack":"feather",icon:"icon-plus"},on:{click:function(e){return t.add()}}},[t._v(t._s(t.$t("add")))])],1)]),t._l(t.material_lists,function(e,i){return a("div",{key:i,staticClass:"vx-row"},[a("div",{staticClass:"vx-col md:w-1/3 sm:w-1/2 w-full mt-5"},[t._v("\n            "+t._s(t.$t("material"))+" ("+t._s(t.$t("material_price"))+")\n            "),a("vs-select",{staticClass:"w-full",attrs:{danger:""==e.material_id&&t.submitted},model:{value:e.material_id,callback:function(a){t.$set(e,"material_id",a)},expression:"item.material_id"}},t._l(t.materials,function(e,i){return a("vs-select-item",{key:i,attrs:{value:e.material_id,text:t.$t(e.material_name+" ("+e.material_price+")")}})}),1),""==e.material_id&&t.submitted?a("div",{staticClass:"errors"},[t._v(t._s(t.$t("please select material")))]):t._e()],1),a("div",{staticClass:"vx-col md:w-1/3 sm:w-1/2 w-full mt-5"},[t._v("\n            "+t._s(t.$t("material_number"))+"\n            "),a("vs-input",{staticClass:"w-full",attrs:{danger:""==e.material_number&&t.submitted},on:{keypress:t.checkNumber},model:{value:e.material_number,callback:function(a){t.$set(e,"material_number",a)},expression:"item.material_number"}}),""==e.material_number&&t.submitted?a("div",{staticClass:"errors"},[t._v(t._s(t.$t("please input the number of material")))]):t._e()],1),a("div",{staticClass:"vx-col md:w-1/3 sm:w-1/2 w-full mt-10"},[a("vs-button",{ref:"loadableButton",refInFor:!0,attrs:{color:"danger"},on:{click:function(e){return t.material_lists.splice(i,1)}}},[t._v(t._s(t.$t("remove")))])],1)])})],2),a("div",{staticClass:"container"},[a("div",{staticClass:"vx-row mt-10"},[a("div",{staticClass:"w-full"},[a("vs-button",{staticClass:"mr-4",on:{click:function(e){return t.save()}}},[t._v(t._s(t.$t("save")))]),a("vs-button",{attrs:{color:"danger",type:"border"},on:{click:function(e){t.booking=!1,t.booking_data={}}}},[t._v(t._s(t.$t("cancel")))])],1)])])],1)],1):t._e()]):t._e()},s=[],r=(a("96cf"),a("3040")),l=a("fa33"),n=a("67cf"),o=a("c1df"),d=a.n(o),c=a("c38f"),m=a.n(c),u=(a("0952"),a("4be7"),{components:{Datepicker:l["a"],flatPickr:m.a},data:function(){return{submitted:!1,renderComponent:!0,editObj:{},booking:!1,detail:"",buildings:[],important:"",remark:"",tel:"",member:"",searched:!1,rooms:[],materials:[],booking_data:{},material:{},material_lists:[],configdateTimePicker:{enableTime:!1,enableSeconds:!1,noCalendar:!1},configTime:{enableTime:!0,enableSeconds:!0,noCalendar:!0},room_lists:[],important_lists:["normal","important"]}},computed:{body:function(){return{room_id:this.editObj.room_id,start_date:this.editObj.date+" "+this.editObj.start_time,end_date:this.editObj.date+" "+this.editObj.end_time,building_id:this.editObj.building_id}}},created:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.material={material_id:"",material_number:""},this.initVal(),t.prev=2,t.next=5,n["a"].postData("material/get",{});case 5:return e=t.sent,this.materials=e.data,t.next=9,n["a"].postData("building/getBuilding",{});case 9:e=t.sent,this.buildings=e.data,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](2),this.$swal(this.$t("error"),t.t0.message,"error");case 16:case"end":return t.stop()}},t,this,[[2,13]])}));return function(){return t.apply(this,arguments)}}(),methods:{checkNumber:function(t){var e=window.checkNumber(t);e||t.preventDefault()},initVal:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.editObj={building_id:"",room_id:"",date:d()().format("YYYY-MM-DD"),start_time:d()().format("HH:mm:ss"),end_time:"17:30:00"},this.booking=!1,this.detail="",this.buildings=[],this.important="",this.remark="",this.tel="",this.member="";case 8:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),search:function(){var t=this;this.searched=!0,console.log("searching"),d()(this.body.start_date).isBefore(d()(this.body.end_date))?(this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:"#button-with-loading",scale:.45}),n["a"].postData("get_room_with_status",this.body).then(function(e){t.$vs.loading.close("#button-with-loading > .con-vs-loading"),t.room_lists=e.data},function(e){t.$vs.loading.close("#button-with-loading > .con-vs-loading")})):this.$swal(this.$t("start_date_canot_more_than_end_date"),"","error")},add:function(){this.material_lists.push({material_id:"",material_number:""})},book:function(t){this.booking=!0;var e=n["a"].getUser().user,a=e.username,i=e.first_name,s=e.last_name,r=e.email;this.booking_data={room_id:t.room_id,start_date:this.body.start_date,end_date:this.body.end_date,username:a,first_name:i,last_name:s,room_name:t.room_name,email:r}},checkMaterial:function(){var t=this.material_lists.filter(function(t){return""==t.material_id||""==t.material_number});return console.log(t),0==t.length},save:function(){var t=this;this.submitted=!0;var e=[];if(""!=this.detail&&""!=this.important&&""!=this.member&&""!=this.remark&&""!=this.tel&&this.checkMaterial()){var a=this.material_lists.map(function(t){return t});a.filter(function(t){return""!=t.material_number}).reduce(function(t,a){return t[a.material_id]||(t[a.material_id]={Id:a.material_id,material_number:0},e.push(t[a.material_id])),t[a.material_id].material_number=parseInt(t[a.material_id].material_number)+parseInt(a.material_number),t},{});var i=e.filter(function(t){return t.material_number>0});this.$swal({title:this.$t("booking_room_title"),type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:this.$t("cancel"),confirmButtonText:this.$t("book"),showLoaderOnConfirm:!0,preConfirm:function(){var e=t.booking_data,a=e.username,s=e.room_id,r=e.start_date,l=e.end_date;return n["a"].postData("/booking_room",{booking_description:t.detail,username:a,room_id:s,start_date:r,end_date:l,material_lists:i,important:t.important,member:t.member,remark:t.remark,tel:t.tel}).then(function(t){return t})}}).then(function(e){e.value&&(e.value.code?t.$swal(t.$t("success_title"),"","success").then(function(e){t.booking=!1,n["a"].postData("get_room_with_status",t.body).then(function(e){t.room_lists=e.data,t.material_lists=[],t.detail="",t.important="",t.submitted=!1,t.initVal()},function(t){})}):t.$swal(t.$t("error"),e.value.message,"error"))})}}},watch:{"editObj.building_id":function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.editObj.room_id="",t.next=3,n["a"].postData("getRoomByBuilding",{building_id:this.editObj.building_id});case 3:a=t.sent,this.rooms=a.data;case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}}),_=u,v=(a("6c6f"),a("2877")),b=Object(v["a"])(_,i,s,!1,null,"11da73c6",null);e["default"]=b.exports}}]);
//# sourceMappingURL=chunk-23244954.bbea4442.js.map