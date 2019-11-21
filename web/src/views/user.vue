<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">

    <!-- <edit-user :isSidebarActive="sideBarActive" :operator="edit_operator" @closeSidebar="sideBarActive = false" /> -->

    <vx-card>
        <!-- <pre>{{x}}</pre> -->
        <vs-tabs >
            <vs-tab :label="$t('user_data')">
               <div class="mt-3">
                 <vs-table pagination max-items="10" search :data="users">

                    <template slot="thead">
                      <vs-th sort-key="index">{{$t('username')}}</vs-th>
                      <vs-th sort-key="first_name">{{$t('first_name')}}</vs-th>
                      <vs-th sort-key="last_name">{{$t('last_name')}}</vs-th>
                      <vs-th sort-key="email">{{$t('email')}}</vs-th>
                      <vs-th sort-key="role_name">{{$t('role')}}</vs-th>

                      <vs-th>{{$t("edit")}}</vs-th>
                      <vs-th>{{$t("delete")}}</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

                        <vs-td :data="tr.username">
                          {{tr.username}}
                        </vs-td>

                        <vs-td :data="tr.first_name">
                          {{ tr.first_name}}
                        </vs-td>
                        <vs-td :data="tr.last_name">{{tr.last_name}}</vs-td>
                        <vs-td :data="tr.last_name">
                          {{ tr.email }}
                        </vs-td>

                        <vs-td :data="tr.role_name">
                          {{ $t(tr.role_name) }}
                        </vs-td>

                        <vs-td>
                          <feather-icon icon="EditIcon" class="cursor-pointer w-6 h-6 text-warning" size="small" @click="editObj=tr;popupActive=true"></feather-icon>
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="Trash2Icon" class="cursor-pointer w-6 h-6 text-danger" size="small" @click="delete_user(tr)"></feather-icon>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
               </div>
            </vs-tab>
            <vs-tab :label="$t('add_user')">
              <div class="vx-row">
                <div class="vx-col md:w-1/3 mt-5">
                    <label>{{$t('first_name')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.first_name" class="w-full" :danger="invalid.first_name" />
                    <div class="errors" v-if="invalid.first_name">
                      {{$t("alert_first_name")}}
                    </div>
                </div>
                <div class="vx-col md:w-1/3 mt-5">
                    <label>{{$t('last_name')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.last_name" class="w-full" :danger="invalid.last_name" />
                    <div class="errors" v-if="invalid.last_name">
                      {{$t("alert_last_name")}}
                    </div>
                </div>
                <div class="vx-col md:w-1/3 mt-5">
                    <label>{{$t('email')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.email" class="w-full" :danger="invalid.email" />
                    <div class="errors" v-if="invalid.email">
                      {{$t("alert_email")}}
                    </div>
                </div>
                <div class="vx-col md:w-1/2 mt-5">
                    <label>{{$t('username')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.username" class="w-full" :danger="invalid.username" />
                    <div class="errors" v-if="invalid.username">
                      {{$t("alert_username")}}
                    </div>
                </div>
                <div class="vx-col md:w-1/2 mt-5">
                    <label>{{$t('password')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.password" class="w-full" :danger="invalid.password" />
                    <div class="errors" v-if="invalid.password">
                      {{$t("alert_password")}}
                    </div>
                </div>
                <div class="vx-col md:w-1/2 mt-5">
                    <label>{{$t('confirm_password')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.confirm_password" class="w-full" :danger="invalid.confirm_password" />
                    <div class="errors" v-if="invalid.confirm_password">
                      {{$t("alert_confirm_password")}}
                    </div>
                </div>
                <div class="vx-col md:w-1/2 mt-5">
                    <label>{{$t('role')}}<span class="require">*</span></label>
                   <vs-select class="w-full" v-model="editObj.role" :danger="invalid.role">
                          <vs-select-item :key="index" :value="item.role_id" :text="$t(item.role_name)" v-for="(item,index) in roles" />
                    </vs-select>
                    <div class="errors" v-if="invalid.role">
                      {{$t("alert_role")}}
                    </div>
                </div>
              </div>
              <div>
                <div class="vx-row">
                    <div class="vx-col w-full mt-5">

                       <vs-button color="danger" class="right" type="border" @click="forceRerender()">{{$t('cancel')}}</vs-button>
                      <vs-button ref="loadableButton" id="button-with-loading" class="vs-con-loading__container right" vslor="primary" @click="save">{{$t('save')}}</vs-button>
                    </div>
                </div>
              </div>
            </vs-tab>

        </vs-tabs>
         <vs-popup class="holamundo"  :title="$t('edit_title')" :active.sync="popupActive">
                 <v-template v-if="!change_password">
                   <div class="vx-col md:w-full mt-3">
                    <label>{{$t('first_name')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.first_name" class="w-full" :danger="invalid.first_name" />
                    <div class="errors" v-if="invalid.first_name">
                      {{$t("alert_first_name")}}
                    </div>
                </div>
                <div class="vx-col md:w-full mt-3">
                    <label>{{$t('last_name')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.last_name" class="w-full" :danger="invalid.last_name" />
                    <div class="errors" v-if="invalid.last_name">
                      {{$t("alert_last_name")}}
                    </div>
                </div>
                <div class="vx-col md:w-full mt-3">
                    <label>{{$t('email')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.email" class="w-full" :danger="invalid.email" />
                    <div class="errors" v-if="invalid.email">
                      {{$t("alert_email")}}
                    </div>
                </div>
                <div class="vx-col md:w-full mt-3">
                    <label>{{$t('username')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.username" class="w-full" :danger="invalid.username" disabled/>
                    <div class="errors" v-if="invalid.username">
                      {{$t("alert_username")}}
                    </div>
                </div>
                <div class="vx-col md:w-full mt-3">
                    <label>{{$t('role')}}<span class="require">*</span></label>
                    <vs-select class="w-full" v-model="editObj.role" :danger="invalid.role">
                          <vs-select-item :key="index" :value="item.role_id" :text="$t(item.role_name)" v-for="(item,index) in roles" />
                    </vs-select>
                    <div class="errors" v-if="invalid.role">
                      {{$t("alert_role")}}
                    </div>
                </div>

                 </v-template>
                 <v-template v-if="change_password">

                    <div class="vx-col md:w-full mt-3">
                        <label>{{$t('new_password')}}<span class="require">*</span></label>
                        <vs-input v-model="editObj.password" class="w-full" :danger="invalid.password" />
                        <div class="errors" v-if="invalid.password">
                          {{$t("alert_password")}}
                        </div>
                    </div>
                    <div class="vx-col md:w-full mt-3">
                        <label>{{$t('confirm_password')}}<span class="require">*</span></label>
                        <vs-input v-model="editObj.confirm_password" class="w-full" :danger="invalid.confirm_password"/>
                        <div class="errors" v-if="invalid.confirm_password">
                          {{$t("alert_confirm_password")}}
                        </div>
                    </div>
                 </v-template>
                  <div class="vx-col md:w-full mt-5">
                      <vs-button color="primary" @click="change_password=!change_password">{{change_password?$t('edit_user'):$t('change_password')}}</vs-button>
                      <vs-button class="right" color="danger" type="border" @click="popupActive=false">{{$t('cancel')}}</vs-button>
                      <vs-button ref="loadableButton" id="button-with-loading" class="vs-con-loading__container right" vslor="primary" @click="edit()">{{$t('save')}}</vs-button>
                </div>
          </vs-popup>
    </vx-card>
  </div>
  <!-- <button>click</button> -->
</template>
<style lang="scss" scoped>
  .right{
    float:right;
    margin-right:10px;
  }
  .require{
    color: red;
  }

  .danger input {
    padding: .7rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid red;
    color: #626262;
    width: 100%;
  }

</style>


<script>
import Datepicker from 'vuejs-datepicker';
import service from '@/service/service';
import EditUser from './extra-components/edit-user.vue';
// import ViewData from './view/ViewData.vue';
import moment from 'moment';
// import firebase from 'firebase/app'ว
// import * as firebase from 'firebase/app';

// import '@firebase/messaging';
export default {
  components: {
    EditUser,
    Datepicker
  },
   data(){
      return {
        change_password:false,
        renderComponent:true,
        sideBarActive:false,
        popupActive:false,
        users:[],
        roles:[],
        submitted:false,
        editObj:{}
      }
   },

   computed:{
     invalid(){
       var require=type=>this.submitted&&this.editObj[type]=='';
       return {
         first_name:require('first_name'),
         last_name:require("last_name"),
         email:require("email"),
         username:require("username"),
         password:(!this.popupActive||this.change_password)&&require("password"),
         confirm_password:this.submitted&&(this.editObj.password!=this.editObj.confirm_password),
         role:require("role"),
         old_password:this.change_password&&require("old_password")
         }
     },
     isInvald(){
       return this.invalid.first_name||this.invalid.last_name||this.invalid.email||this.invalid.username||this.invalid.password||this.invalid.confirm_password||this.invalid.role||this.old_password
     }
   },
   created(){
      this.getdata();
      this.initVal();
   },
   methods: {
     initVal(){
       this.submitted=false;
       this.change_password=false,
       this.popupActive=false;
       this.editObj={
          old_password:"",
          first_name:"",
          last_name:"",
          email:"",
          username:"",
          password:"",
          confirm_password:"",
          role:""
        }
     },
     edit(){
       this.submitted=true;
       if(!this.isInvald){
        var url;
        if(this.change_password){
          url="admin_change_password";
        }else{
          url="update_user";
        }
        this.popupActive=false;
        service.postData(url,this.editObj).then((result)=>{
            this.$swal(this.$t("success_title"),"","success").then((result)=>{
              this.getdata();
              this.forceRerender();
              this.initVal();
           });
          })
       }
     },
     delete_user(user){
       this.$swal({
          title:this.$t('delete_user_title'),
          text: this.$t('delete_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return  service.postData("/delete_user",{username:user.username}).then((result)=>{
               return result;
            })

          }
        }).then((result) => {
          if(result.value){
            if(result.value.code){
                this.$swal(this.$t("deleted_title"),"","success").then((result)=>{
                    this.getdata();
                    this.forceRerender();
                    this.initVal();
                });
              }else{
                 this.$swal(result.value.message,'','error')
              }

          }
        })

     },
     getdata(){

       service.postData("/get_user",{

      }).then((result)=>{
        this.users=result.data.map((item)=>{
          item.password="";
          item.confirm_password="";
          return item;
          });
      })
        service.postData("/get_role",{}).then((result)=>{
          this.roles=result.data;
        },err=>{

        })
     },
     forceRerender(){
       this.renderComponent=false;
       this.$nextTick(() => {
          this.renderComponent = true;
        });
     },
     save(){
       this.submitted=true;
       if(!this.isInvald){
         service.postData("/add_user",this.editObj).then((result)=>{
            this.$swal(this.$t("success_title"),"","success").then((result)=>{
              this.getdata();
              this.forceRerender();
              this.initVal();
           });
         })
       }
     }
    },
  watch: {
      popupActive(val){
        if(!val){
          this.initVal();
        }
      }
    }
}
</script>

