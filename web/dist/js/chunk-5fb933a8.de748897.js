(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5fb933a8"],{"5fad":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"data-list-container",attrs:{id:"data-list-list-view"}},[r("add-new-data-sidebar",{attrs:{isSidebarActive:t.addNewDataSidebar},on:{closeSidebar:function(e){t.addNewDataSidebar=!1}}}),r("vs-table",{ref:"table",attrs:{multiple:"",pagination:"","max-items":t.itemsPerPage,search:"",data:t.users},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.data;return[r("tbody",t._l(s,function(e,s){return r("vs-tr",{key:s,attrs:{data:e}},[r("vs-td",[r("p",{staticClass:"product-name font-medium"},[t._v(t._s(e.name))])]),r("vs-td",[r("p",{staticClass:"product-category"},[t._v(t._s(e.category))])]),r("vs-td",[t._v("\n              "+t._s(typeof e.popularity)+"\n              "),r("vs-progress",{staticClass:"shadow-md",attrs:{percent:Number(e.popularity),color:t.getPopularityColor(Number(e.popularity))}})],1),r("vs-td",[r("vs-chip",{staticClass:"product-order-status",attrs:{color:t.getOrderStatusColor(e.order_status)}},[t._v(t._s(e.order_status))])],1),r("vs-td",[r("p",{staticClass:"product-price"},[t._v("$"+t._s(e.price))])])],1)}),1)]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[r("div",{staticClass:"flex flex-wrap-reverse items-center flex-grow justify-between",attrs:{slot:"header"},slot:"header"},[r("div",{staticClass:"flex flex-wrap-reverse items-center"},[r("vs-dropdown",{staticClass:"cursor-pointer mr-4 mb-4",attrs:{"vs-trigger-click":""}},[r("div",{staticClass:"p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32"},[r("span",{staticClass:"mr-2"},[t._v("Actions")]),r("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),r("vs-dropdown-menu",[r("vs-dropdown-item",[r("span",[t._v("Delete")])]),r("vs-dropdown-item",[r("span",[t._v("Archive")])]),r("vs-dropdown-item",[r("span",[t._v("Print")])]),r("vs-dropdown-item",[r("span",[t._v("Another Action")])])],1)],1),r("div",{staticClass:"p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary",on:{click:function(e){t.addNewDataSidebar=!0}}},[r("feather-icon",{attrs:{icon:"PlusIcon",svgClasses:"h-4 w-4"}}),r("span",{staticClass:"ml-2 text-base text-primary"},[t._v("Add New")])],1)],1),r("vs-dropdown",{staticClass:"cursor-pointer mb-4 mr-4",attrs:{"vs-trigger-click":""}},[r("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[r("span",{staticClass:"mr-2"},[t._v(t._s(t.currentPage*t.itemsPerPage-(t.itemsPerPage-1))+" - "+t._s(t.users.length-t.currentPage*t.itemsPerPage>0?t.currentPage*t.itemsPerPage:t.users.length)+" of "+t._s(t.users.length))]),r("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),r("vs-dropdown-menu",[r("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=4}}},[r("span",[t._v("4")])]),r("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=10}}},[r("span",[t._v("10")])]),r("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=15}}},[r("span",[t._v("15")])]),r("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=20}}},[r("span",[t._v("20")])])],1)],1)],1),r("template",{slot:"thead"},[r("vs-th",{attrs:{"sort-key":"name"}},[t._v("Name")]),r("vs-th",{attrs:{"sort-key":"category"}},[t._v("Category")]),r("vs-th",{attrs:{"sort-key":"popularity"}},[t._v("Popularity")]),r("vs-th",{attrs:{"sort-key":"order_status"}},[t._v("Order Status")]),r("vs-th",{attrs:{"sort-key":"price"}},[t._v("Price")])],1)],2)],1)},a=[],o=(r("c5f6"),r("ac6a"),r("cadf"),r("456d"),r("a04c")),n={components:{AddNewDataSidebar:o["a"]},data:function(){return{selected:[],users:[],itemsPerPage:4,isMounted:!1,addNewDataSidebar:!1}},computed:{currentPage:function(){return this.isMounted?this.$refs.table.currentx:0}},methods:{getOrderStatusColor:function(t){return"on hold"==t?"warning":"delivered"==t?"success":"canceled"==t?"danger":"primary"},getPopularityColor:function(t){return t>90?"success":t>70?"primary":t>=50?"warning":t<50?"danger":"primary"},formatData:function(t){var e=t.map(function(t){for(var e=t.fields,r={},s=Object.keys(e),a=0;a<s.length;a++){var o=s[a];r[o]=Number(e[o].integerValue)||Number(e[o].doubleValue)||e[o].stringValue}return r});return e}},created:function(){var t=this;this.$http.get("https://firestore.googleapis.com/v1/projects/vuesax-admin/databases/(default)/documents/products/?pageSize=100").then(function(e){t.users=t.formatData(e.data.documents)}).catch(function(e){t.$vs.notify({title:"Error",text:e,color:"danger",iconPack:"feather",icon:"icon-alert-circle"})})},mounted:function(){this.isMounted=!0}},i=n,c=(r("9153"),r("2877")),d=Object(c["a"])(i,s,a,!1,null,null,null);e["default"]=d.exports},"8eb0":function(t,e,r){},9153:function(t,e,r){"use strict";var s=r("8eb0"),a=r.n(s);a.a}}]);
//# sourceMappingURL=chunk-5fb933a8.de748897.js.map