<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">

    <div class="w-full" v-if="!booking">
      <vx-card>
      <h6>{{$t("search_free_room")}}</h6>

      <div class="mt-6 vx-row mb-6">
        <div class="vx-col md:w-1/6" style="text-align:right;padding-top:3px">
          <label>{{$t("start_datetime")}}</label>

        </div>
        <div class="vx-col md:w-1/5">
          <flat-pickr :config="configdateTimePicker" class="w-full" v-model="editObj.start_date" placeholder="Choose time" />
        </div>
        <div class="vx-col md:w-1/6" style="text-align:right;padding-top:3px">
          <label>{{$t("end_datetime")}}</label>

        </div>
        <div class="vx-col md:w-1/5">
          <flat-pickr :config="configdateTimePicker" class="w-full" v-model="editObj.end_date" placeholder="Choose time" />
        </div>
        <div class="vx-col md:w-1/6">
          <vs-button ref="loadableButton" id="button-with-loading" class="vs-con-loading__container right" vslor="primary" @click="search()">{{$t('search')}}</vs-button>
        </div>

        <!-- <div class="vx-col md:w-1/2">
          <label>{{$t("start_date")}}</label>
          <datepicker format="yyyy-MM-dd" v-model="editObj.start_date" style="width:100%" class="w-full"></datepicker>
        </div>
        <div class="vx-col md:w-1/2">
          <label>{{$t("start_date")}}</label>
          <datepicker format="yyyy-MM-dd" v-model="editObj.start_date" style="width:100%" class="w-full"></datepicker>
        </div>
        <div class="vx-col md:w-1/4">
          <label>{{$t("start_date")}}</label>
          <datepicker format="yyyy-MM-dd" v-model="editObj.start_date" style="width:100%" class="w-full"></datepicker>
        </div>
        <div class="vx-col md:w-1/4">
          <label>{{$t("start_date")}}</label>
          <datepicker format="yyyy-MM-dd" v-model="editObj.start_date" style="width:100%" class="w-full"></datepicker>
        </div> -->
      </div>

    </vx-card>
    <div class="mt-6 text-center" v-if="room_lists.length==0&&searched">
        {{$t("no_data")}}
    </div>
   <vx-card v-for="(item,index) in room_lists" :key="index" class="mt-5">
      <div class="vx-row">
        <div class="vx-col md:w-4/5">
            <div class="vx-row">
               <div class="vx-col md:w-1/4">
                {{$t("room_id")}} {{item.room_id}}
                </div>
                <div class="vx-col md:w-1/4">
                  {{$t("room_name")}} {{item.room_name}}
                </div>
                <div class="vx-col md:w-1/4">
                  {{$t("num_table")}} {{item.num_table}}
                </div>
                <div class="vx-col md:w-1/4">
                  {{$t("num_chair")}} {{item.num_chair}}
                </div>
            </div>
        </div>
        <div class="vx-col md:w-1/5">
            <vs-button ref="loadableButton" id="button-with-loading1" class="vs-con-loading__container right" vslor="primary" @click="book(item)">{{$t('book_this_room')}}</vs-button>
        </div>
      </div>
    </vx-card>
    </div>
    <div class="w-full" v-if="booking">
      <vx-card>
          <div class="vx-row">
            <div class="vx-col md:w-1/2">
              <h6>{{$t('booking_room')}}</h6>
            </div>
            <div class="vx-col md:w-1/2">
              <vs-button ref="loadableButton" class="right" type="border" vslor="warning" @click="booking=false;booking_data={}">{{$t('back')}}</vs-button>
            </div>
          </div>
          <div class="mt-6 vx-row ml-10 mr-10">
              <div class="vx-col md:w-1/2">
                  <table style="width:100%">
                    <tr>
                      <td style="padding:5px">{{$t("username")}}</td>
                      <td class="text-primary">{{booking_data.first_name+' '+booking_data.last_name}}</td>

                    </tr>
                    <tr></tr>
                    <tr style="">
                      <td style="padding:5px">{{$t('start_date')}}</td>
                      <td class="text-primary">{{booking_data.start_date}}</td>

                    </tr>
                  </table>
              </div>
              <div class="vx-col md:w-1/2">
                  <table style="width:100%">
                    <tr>

                      <td>{{$t("room_name")}}</td>
                      <td class="text-primary">{{booking_data.room_name}}</td>
                    </tr>
                    <tr></tr>
                    <tr style="">

                      <td >{{$t('end_date')}}</td>
                      <td class="text-primary">{{booking_data.end_date}}</td>
                    </tr>
                  </table>
              </div>
          </div>
          <vs-divider position="left"> {{$t("detail_input")}} </vs-divider>
          <div class="vx-row">
            <div class="vx-col md:w-1/4" style="text-align:right">
              {{$t("detail")}}
            </div>
            <div class="vx-col md:w-1/2">
              <vs-textarea class="w-full" v-model="detail" />
            </div>
            <div class="vx-col md:w-1/4 mt-5">
              <vs-button ref="loadableButton"  vslor="primary" @click="save()">{{$t('save')}}</vs-button>
            </div>
          </div>

      </vx-card>
    </div>
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
// import ViewData from './view/ViewData.vue';
import moment from 'moment';
// import firebase from 'firebase/app'ว
// import * as firebase from 'firebase/app';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
// import '@firebase/messaging';
export default {
  components: {
    Datepicker,
    flatPickr
  },
   data(){
      return {
        renderComponent:true,
        editObj:{},
        booking:false,
        detail:"",
        searched:false,
        booking_data:{},
        configdateTimePicker: {
              enableTime: true,
              enableSeconds: true,
              noCalendar: false
            },
        room_lists:[]
      }
   },

   computed:{

   },
   created(){
     this.initVal();
   },
   methods: {
     initVal(){
       this.editObj={
         start_date:moment().format("YYYY-MM-DD HH:mm:ss"),
         end_date:moment().format("YYYY-MM-DD HH:mm:ss")
       }
     },
     search(){
       this.searched=true;


       if(!moment(this.editObj.start_date).isBefore(moment(this.editObj.end_date))){
         this.$swal(this.$t("start_date_canot_more_than_end_date"),'','error');
       }else{
         this.$vs.loading({
            background: this.backgroundLoading,
            color: this.colorLoading,
            container: "#button-with-loading",
            scale: 0.45
          })
         service.postData("get_free_room",this.editObj).then((result)=>{
           this.$vs.loading.close("#button-with-loading > .con-vs-loading")
           this.room_lists=result.data;
         })
       }
     },
     book(item){
       this.booking=true;
       var {username,first_name,last_name}=service.getUser().user;
       this.booking_data={
         room_id:item.room_id,
         start_date:this.editObj.start_date,
         end_date:this.editObj.end_date,
         username:username,
         first_name:first_name,
         last_name:last_name,
         room_name:item.room_name
       }

     },
     save(){
        this.$swal({
          title:this.$t('booking_room_title'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('book'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            var {username,room_id,start_date,end_date}=this.booking_data;
            return  service.postData("/booking_room",{
              booking_description:this.detail,
              username,room_id,start_date,end_date
            }).then((result)=>{
               return result;
            })

          }
        }).then((result) => {
          if(result.value){
            if(result.value.code){
                this.$swal(this.$t("success_title"),"","success").then((result)=>{
                    this.booking=false;
                    this.search();
                });
              }else{
                 this.$swal(result.value.message,'','error')
              }

          }
        })
     }
   },
  watch: {

  }
}
</script>

