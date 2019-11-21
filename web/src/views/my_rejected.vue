<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">

    <!-- <edit-user :isSidebarActive="sideBarActive" :operator="edit_operator" @closeSidebar="sideBarActive = false" /> -->

    <vx-card>
        <!-- <pre>{{x}}</pre> -->

        <vs-table pagination max-items="10" search :data="bookings">

                    <template slot="thead">
                      <vs-th sort-key="booking_id">{{$t('booking_id')}}</vs-th>

                      <vs-th sort-key="first_name+last_name">{{$t("first_surname")}}</vs-th>
                      <vs-th sort-key="room_name">{{$t('room_name')}}</vs-th>
                      <vs-th sort-key="booking_description">{{$t('booking_description')}}</vs-th>
                      <vs-th sort-key="start_date">{{$t('start_date')}}</vs-th>
                      <vs-th sort-key="end_date">{{$t('end_date')}}</vs-th>

                      <vs-th>{{$t("delete")}}</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
                        <vs-td :data="tr.booking_id">
                          {{ tr.booking_id}}
                        </vs-td>
                        <vs-td :data="tr.first_name+tr.last_name" width="200px">
                          {{tr.first_name+' '+tr.last_name}}
                        </vs-td>


                        <vs-td :data="tr.room_name">
                          {{ tr.room_name}}
                        </vs-td>
                        <vs-td :data="tr.booking_description">
                          {{ tr.booking_description}}
                        </vs-td>
                        <vs-td :data="tr.start_date">
                          {{ tr.start_date | formatDate}}
                        </vs-td>
                        <vs-td :data="tr.end_date">
                          {{ tr.end_date | formatDate}}
                        </vs-td>


                        <vs-td>
                          <feather-icon icon="Trash2Icon" class="cursor-pointer w-6 h-6 text-danger" size="small" @click="delete_booking(tr)"></feather-icon>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
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
        bookings:[],
        roles:[],
        submitted:false,
        editObj:{}
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

     delete_booking(booking){
       this.$swal({
          title:this.$t('delete_booking_title'),
          text: this.$t('delete_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return  service.postData("/delete_booking",{booking_id:booking.booking_id}).then((result)=>{
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
     reject(booking){
       this.$swal({
          title:this.$t('reject_booking_title'),
          text: this.$t('reject_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return  service.postData("/reject",{booking_id:booking.booking_id}).then((result)=>{
               return result;
            })

          }
        }).then((result) => {
          if(result.value){
            if(result.value.code){
                this.$swal(this.$t("rejected_title"),"","success").then((result)=>{
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
     approve(booking){
       this.$swal({
          title:this.$t('approve_booking_title'),
          text: this.$t('approve_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return  service.postData("/approve",{booking_id:booking.booking_id}).then((result)=>{
               return result;
            })

          }
        }).then((result) => {
          if(result.value){
            if(result.value.code){
                this.$swal(this.$t("approved_title"),"","success").then((result)=>{
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
       var {username}=service.getUser().user
       service.postData("/get_user_rejected",{
          username
          }).then((result)=>{
            this.bookings=result.data;
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

