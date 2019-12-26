<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row">

      <!-- CARD 1: CONGRATS -->
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
                    <img src="../assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
                    <img src="../assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
          <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
          <h1 class="mb-6 text-white">{{$t("Welcome")+' '+user.first_name+' '+user.last_name}}</h1>
          <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">{{$t("Welcome to Meeting Room Booking System")}}</p>
        </vx-card>
      </div>

      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2  mb-base pointer" @click="goto('/user_data')">
        <statistics-card-line icon="UsersIcon" :statistic="data.user_count" :statisticTitle="$t('users')" :chartData="analyticsData.subscribersGained" type='area' ></statistics-card-line>
      </div>

      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 mb-base pointer" @click="goto('/room_data')">
        <statistics-card-line icon="LayoutIcon" :statistic="data.room_count" :statisticTitle="$t('rooms')" :chartData="analyticsData.ordersRecevied" color='warning' type='area'></statistics-card-line>
      </div>
      <div class="vx-col w-full sm:w-1/4 md:w-1/4 mb-base pointer" @click="goto('/user_booking')">
        <statistics-card-line icon="BellIcon" :statistic="data.wait_for_approve" :statisticTitle="$t('wait_for_approve')" :chartData="analyticsData.ordersRecevied" color='warning' type='area'></statistics-card-line>
      </div>
       <div class="vx-col w-full sm:w-1/4 md:w-1/4  mb-base pointer" @click="goto('/booking_history')">
        <statistics-card-line icon="ApertureIcon" :statistic="data.all_booked" :statisticTitle="$t('All of Booked Data')" :chartData="analyticsData.subscribersGained" type='area' ></statistics-card-line>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2  mb-base pointer" @click="goto('/all_booking')">
        <statistics-card-line icon="CheckSquareIcon" :statistic="data.approved" :statisticTitle="$t('approved_data')" :chartData="analyticsData.subscribersGained" type='area' ></statistics-card-line>
      </div>
       <div class="vx-col w-full sm:w-1/2 md:w-1/2 mb-base pointer" @click="goto('/my_booking')">
        <statistics-card-line icon="BellIcon" :statistic="data.your_wait_for_approve" :statisticTitle="$t('your_wait_for_approve')" :chartData="analyticsData.ordersRecevied"  type='area'></statistics-card-line>
      </div>
       <div class="vx-col w-full sm:w-1/2 md:w-1/2  mb-base pointer" @click="goto('/all_my_booking')">
        <statistics-card-line icon="CheckSquareIcon" :statistic="data.your_approved" :statisticTitle="$t('your_approved_data')" :chartData="analyticsData.subscribersGained" color="warning" type='area' ></statistics-card-line>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2  mb-base pointer" @click="goto('/my_booking_history')">
        <statistics-card-line icon="ApertureIcon" :statistic="data.your_all_data" :statisticTitle="$t('All of Your Booking')" :chartData="analyticsData.subscribersGained" color="warning" type='area' ></statistics-card-line>
      </div>
    </div>


    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from './ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import service from '@/service/service';
export default {
    data() {
        return {
            analyticsData: analyticsData,
            isImp: false,
            navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
            show: false,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            user:service.getUser().user,
            data:{},
            nextNum: 10,
            'tableList': [
                'vs-th: Component',
                'vs-tr: Component',
                'vs-td: Component',
                'thread: Slot',
                'tbody: Slot',
                'header: Slot'
            ],
            users: [{
                    "orderNo": 879985,
                    "status": "Moving",
                    "statusColor": "success",
                    "operator": "Cinar Knowles",
                    "operatorImg": "avatar-s-2.png",
                    usersLiked: [
                        { name: 'Vennie Mostowy', img: 'avatar-s-5.png' },
                        { name: 'Elicia Rieske', img: 'avatar-s-7.png' },
                        { name: 'Julee Rossignol', img: 'avatar-s-10.png' },
                        { name: 'Darcey Nooner', img: 'avatar-s-8.png' }
                    ],
                    "location": "Anniston, Alabama",
                    "distance": "130 km",
                    "distPercent": 80,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                },
                {
                    "orderNo": 156897,
                    "status": "Pending",
                    "statusColor": "warning",
                    "operator": "Britany Ryder",
                    "operatorImg": "avatar-s-4.png",
                    usersLiked: [
                        { name: 'Trina Lynes', img: 'avatar-s-1.png' },
                        { name: 'Lilian Nenez', img: 'avatar-s-2.png' },
                        { name: 'Alberto Glotzbach', img: 'avatar-s-3.png' }
                    ],
                    "location": "Cordova, Alaska",
                    "distance": "234 km",
                    "distPercent": 60,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                },
                {
                    "orderNo": 568975,
                    "status": "Moving",
                    "statusColor": "success",
                    "operator": "Kishan Ashton",
                    "operatorImg": "avatar-s-1.png",
                    usersLiked: [
                        { name: 'Lai Lewandowski', img: 'avatar-s-6.png' },
                        { name: 'Elicia Rieske', img: 'avatar-s-7.png' },
                        { name: 'Darcey Nooner', img: 'avatar-s-8.png' },
                        { name: 'Julee Rossignol', img: 'avatar-s-10.png' },
                        { name: 'Jeffrey Gerondale', img: 'avatar-s-9.png' },
                    ],
                    "location": "Florence, Alabama",
                    "distance": "168 km",
                    "distPercent": 70,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                },
                {
                    "orderNo": 245689,
                    "status": "Canceled",
                    "statusColor": "danger",
                    "operator": "Anabella Elliott",
                    "operatorImg": "avatar-s-6.png",
                    usersLiked: [
                        { name: 'Vennie Mostowy', img: 'avatar-s-5.png' },
                        { name: 'Elicia Rieske', img: 'avatar-s-7.png' }
                    ],
                    "location": "Clifton, Arizona",
                    "distance": "125 km",
                    "distPercent": 95,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                }

            ]
        }
    },
    created(){
      service.postData("/get_dashboard",{username:this.user.username}).then((result)=>{
        this.data=result.data[0];
      })
    },
    methods:{
      goto(url){
        this.$router.push(url);
      }
    },
    components: {
        VueApexCharts,
        StatisticsCardLine,
        ChangeTimeDurationDropdown
    },
}
</script>

<style lang="scss">
#dashboard-analytics {
  .greet-user{
    position: relative;
    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
</style>
