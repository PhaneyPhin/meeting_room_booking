<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">

    <!-- <edit-user :isSidebarActive="sideBarActive" :operator="edit_operator" @closeSidebar="sideBarActive = false" /> -->

    <vx-card>
        <!-- <pre>{{x}}</pre> -->
        <vs-tabs >
            <vs-tab :label="$t('room_data')">
               <div class="mt-3">
                 <vs-table pagination max-items="10" search :data="rooms">

                    <template slot="thead">
                      <vs-th sort-key="room_id">{{$t('room_id')}}</vs-th>
                      <vs-th sort-key="room_name">{{$t('room_name')}}</vs-th>
                      <vs-th sort-key="num_chair">{{$t('num_chair')}}</vs-th>
                      <vs-th sort-key="num_table">{{$t('num_table')}}</vs-th>

                      <vs-th>{{$t("edit")}}</vs-th>
                      <vs-th>{{$t("delete")}}</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

                        <vs-td :data="tr.room_id">
                          {{tr.room_id}}
                        </vs-td>

                        <vs-td :data="tr.room_name">
                          {{ tr.room_name}}
                        </vs-td>
                        <vs-td :data="tr.num_chair">{{tr.num_chair}}</vs-td>
                        <vs-td :data="tr.num_table">
                          {{ tr.num_table }}
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="EditIcon" class="cursor-pointer w-6 h-6 text-warning" size="small" @click="editObj=tr;popupActive=true"></feather-icon>
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="Trash2Icon" class="cursor-pointer w-6 h-6 text-danger" size="small" @click="delete_room(tr)"></feather-icon>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
               </div>
            </vs-tab>
            <vs-tab :label="$t('add_room')">
              <div class="vx-row">
                <div class="vx-col md:w-1/2 mt-5">
                    <label>{{$t('room_name')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.room_name" class="w-full" :danger="invalid.room_name" />
                    <div class="errors" v-if="invalid.room_name">
                      {{$t("alert_room_name")}}
                    </div>
                </div>
                <div class="vx-col md:w-1/2 mt-5">
                    <label>{{$t('num_chair')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.num_chair" class="w-full" :danger="invalid.num_chair" />
                    <div class="errors" v-if="invalid.num_chair">
                      {{$t("alert_num_chair")}}
                    </div>
                </div>
                <div class="vx-col md:w-1/2 mt-5">
                    <label>{{$t('num_table')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.num_table" class="w-full" :danger="invalid.num_table" />
                    <div class="errors" v-if="invalid.num_table">
                      {{$t("alert_num_table")}}
                    </div>
                </div>
              </div>
                <div class="vx-row">
                    <div class="vx-col w-full mt-5">

                       <vs-button color="danger" class="right" type="border" @click="forceRerender()">{{$t('cancel')}}</vs-button>
                      <vs-button ref="loadableButton" id="button-with-loading" class="vs-con-loading__container right" vslor="primary" @click="save">{{$t('save')}}</vs-button>
                    </div>
                </div>

            </vs-tab>

        </vs-tabs>
         <vs-popup class="holamundo"  :title="$t('edit_title')" :active.sync="popupActive">
              <div class="vx-row">
                <div class="vx-col md:w-full mt-5">
                    <label>{{$t('room_name')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.room_name" class="w-full" :danger="invalid.room_name" disabled />
                    <div class="errors" v-if="invalid.room_name">
                      {{$t("alert_room_name")}}
                    </div>
                </div>
                <div class="vx-col md:w-full mt-5">
                    <label>{{$t('num_chair')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.num_chair" class="w-full" :danger="invalid.num_chair" />
                    <div class="errors" v-if="invalid.num_chair">
                      {{$t("alert_num_chair")}}
                    </div>
                </div>
                <div class="vx-col md:w-full mt-5">
                    <label>{{$t('num_table')}}<span class="require">*</span></label>
                    <vs-input v-model="editObj.num_table" class="w-full" :danger="invalid.num_table" />
                    <div class="errors" v-if="invalid.num_table">
                      {{$t("alert_num_table")}}
                    </div>
                </div>
              </div>
                <div class="vx-row">
                    <div class="vx-col w-full mt-5">

                       <vs-button color="danger" class="right" type="border" @click="popupActive=false">{{$t('cancel')}}</vs-button>
                      <vs-button ref="loadableButton" id="button-with-loading1" class="vs-con-loading__container right" vslor="primary" @click="save">{{$t('save')}}</vs-button>
                    </div>
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
   .error{
    color:red;
     font-size:80%;
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
        popupActive:false,
        rooms:[],
        roles:[],
        submitted:false,
        editObj:{
          room_name:"",
          num_chair:"",
          num_table:""
        }
      }
   },

   computed:{
     invalid(){
       var require=type=>this.submitted&&this.editObj[type]=='';
       return {
              room_name:require("room_name"),
              num_chair:require("num_chair"),
              num_table:require("num_table")
         }
     },
     isInvald(){
        return this.invalid.room_name||this.invalid.num_chair||this.invalid.num_table
      }
   },
   created(){
      this.getdata();
      this.initVal();
   },
   methods: {
     initVal(){
       this.submitted=false;
       this.change_password=false;
       popupActive=false,
       this.editObj={
          room_name:"",
          num_chair:"",
          num_table:""
        }
     },

     delete_room(room){
       this.$swal({
          title:this.$t('delete_room_title'),
          text: this.$t('delete_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return  service.postData("/delete_room",{room_id:room.room_id}).then((result)=>{
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

       service.postData("/get_room",{

          }).then((result)=>{
            this.rooms=result.data;
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
         if(this.popupActive){
           this.$vs.loading({
            background: this.backgroundLoading,
            color: this.colorLoading,
            container: "#button-with-loading1",
            scale: 0.45
          })

         }else{
           this.$vs.loading({
            background: this.backgroundLoading,
            color: this.colorLoading,
            container: "#button-with-loading",
            scale: 0.45
          })

         }

       service.postData('/upsert_room',this.editObj).then((result)=>{
            if(this.popupActive) this.$vs.loading.close("#button-with-loading1 > .con-vs-loading")
            else this.$vs.loading.close("#button-with-loading > .con-vs-loading")
            this.popupActive=false;
            this.$swal(this.$t("success_title"),"","success").then((result)=>{


              this.getdata();
              this.forceRerender();

           });
          },err=>{
             this.popupActive=false;
          })
       }
     }
    },
  watch: {
      popupActive (val){
        if(!val){
          this.editObj={
          room_name:"",
          num_chair:"",
          num_table:""
        }
        }
    }
  }
}
</script>

