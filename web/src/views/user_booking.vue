<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">
    <!-- <edit-user :isSidebarActive="sideBarActive" :operator="edit_operator" @closeSidebar="sideBarActive = false" /> -->

    <vx-card>
      <!-- <pre>{{x}}</pre> -->

      <vs-table stripe pagination max-items="10" search :data="bookings">
        <template slot="thead">
          <vs-th sort-key="booking_id">{{$t('booking_id')}}</vs-th>

          <vs-th sort-key="first_name+last_name">{{$t("first_surname")}}</vs-th>
          <vs-th sort-key="room_name">{{$t('room_name')}}</vs-th>
          <vs-th sort-key="booking_description">{{$t('booking_description')}}</vs-th>
          <vs-th sort-key="start_date">{{$t('start_date')}}</vs-th>
          <vs-th sort-key="end_date">{{$t('end_date')}}</vs-th>
          <vs-th>{{$t("view")}}</vs-th>
          <vs-th>{{$t("approve")}}</vs-th>
          <vs-th>{{$t("reject")}}</vs-th>
          <vs-th>{{$t("delete")}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
            <vs-td :data="tr.booking_id">{{ tr.booking_id}}</vs-td>
            <vs-td
              :data="tr.first_name+tr.last_name"
              width="200px"
            >{{tr.first_name+' '+tr.last_name}}</vs-td>

            <vs-td :data="tr.room_name">{{ tr.room_name}}</vs-td>
            <vs-td :data="tr.booking_description">{{ tr.booking_description}}</vs-td>
            <vs-td :data="tr.start_date">{{ tr.start_date | formatDate}}</vs-td>
            <vs-td :data="tr.end_date">{{ tr.end_date | formatDate}}</vs-td>
            <vs-td>
              <feather-icon
                icon="MaximizeIcon"
                class="cursor-pointer w-6 h-6 text-primary"
                size="small"
                @click="views(tr)"
              ></feather-icon>
            </vs-td>
            <vs-td>
              <feather-icon
                icon="ArrowRightCircleIcon"
                class="cursor-pointer w-6 h-6 text-primary"
                size="small"
                @click="approve(tr)"
              ></feather-icon>
            </vs-td>
            <vs-td>
              <feather-icon
                icon="XCircleIcon"
                class="cursor-pointer w-6 h-6 text-warning"
                size="small"
                @click="reject(tr)"
              ></feather-icon>
            </vs-td>
            <vs-td>
              <feather-icon
                icon="Trash2Icon"
                class="cursor-pointer w-6 h-6 text-danger"
                size="small"
                @click="delete_booking(tr)"
              ></feather-icon>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
    <vs-popup class="holamundo" :title="$t('view')" :active.sync="popupActive">
      <div class="vx-row mt-5">
        <div class="vx-col md:w-1/4" align="right">{{$t('Officer')}}:</div>
        <div class="vx-col md:w-3/4 value">{{view['department_name_'+$i18n.locale]}}</div>
      </div>
      <div class="vx-row mt-5">
        <div class="vx-col md:w-1/4" align="right">{{$t('Department')}}:</div>
        <div class="vx-col md:w-3/4 value">{{view['sub_department_name_'+$i18n.locale]}}</div>
      </div>
      <div class="vx-row mt-5">
        <div class="vx-col md:w-1/4" align="right">{{$t('booking_description')}}:</div>
        <div class="vx-col md:w-3/4 value">{{view.booking_description}}</div>
      </div>
      <div class="vx-row mt-5">
        <div class="vx-col md:w-1/4" align="right">{{$t('booking_id')}}:</div>
        <div class="vx-col md:w-1/4 value">{{view.booking_id}}</div>
        <div class="vx-col md:w-1/4" align="right">{{$t('first_surname')}}:</div>
        <div class="vx-col md:w-1/4 value">{{view.first_name+' '+view.last_name}}</div>
      </div>

      <div class="vx-row mt-5">
        <div class="vx-col md:w-1/4" align="right">{{$t('room_name')}}:</div>
        <div class="vx-col md:w-1/4 value">{{view.room_name}}</div>
        <div class="vx-col md:w-1/4" align="right">{{$t('important')}}:</div>
        <div class="vx-col md:w-1/4 value">{{view.important}}</div>
      </div>

      <div class="vx-row mt-5">
        <div class="vx-col md:w-1/4" align="right">{{$t('Remark')}}:</div>
        <div class="vx-col md:w-1/4 value">{{view.remark}}</div>
        <div class="vx-col md:w-1/4" align="right">{{$t('Tel')}}:</div>
        <div class="vx-col md:w-1/4 value">{{view.tel}}</div>
      </div>
      <div class="vx-row mt-5">
        <div class="vx-col md:w-1/4" align="right">{{$t('Member')}}:</div>
        <div class="vx-col md:w-1/4 value">{{view.member}}</div>
        <div class="vx-col md:w-1/4" align="right">{{$t('booking_date')}}:</div>
        <div class="vx-col md:w-1/4 value">{{view.booking_date | onlyDate}}</div>
      </div>
      <div class="vx-row mt-5">
        <div class="vx-col md:w-1/4" align="right">{{$t('date')}}:</div>
        <div class="vx-col md:w-1/4 value">{{view.start_date | onlyDate}}</div>
        <div class="vx-col md:w-1/4" align="right">{{$t('time')}}:</div>
        <div
          class="vx-col md:w-1/4 value"
        >{{view.start_date | onlyTime}}-{{view.end_date | onlyTime}}</div>
      </div>
      <v-template v-if="materials.length>0">
        <div class="vx-row mt-5 ml-5">
          <strong>{{$t('Material Detail')}}</strong>
        </div>
        <vs-table stripe pagination max-items="10" search :data="materials">
          <template slot="thead">
            <vs-th sort-key="material_id">{{$t('material_id')}}</vs-th>

            <vs-th sort-key="material_name">{{$t("material_name")}}</vs-th>
            <vs-th sort-key="material_price">{{$t('material_price')}}</vs-th>
            <vs-th sort-key="number">{{$t('material_number')}}</vs-th>
            <vs-th sort-key="total_price">{{$t('total_price')}}</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
              <vs-td :data="tr.material_id">{{ tr.material_id}}</vs-td>
              <vs-td :data="tr.material_name" width="200px">{{tr.material_name}}</vs-td>

              <vs-td :data="tr.material_price">{{ tr.material_price}}</vs-td>
              <vs-td :data="tr.number">{{ tr.number}}</vs-td>
              <vs-td :data="tr.total_price">{{ tr.total_price}}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </v-template>
    </vs-popup>
  </div>
  <!-- <button>click</button> -->
</template>
<style lang="scss" scoped>
.right {
  float: right;
  margin-right: 10px;
}
.require {
  color: red;
}
.value {
  color: green;
}
.danger input {
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid red;
  color: #626262;
  width: 100%;
}
.error {
  color: red;
  font-size: 80%;
}
</style>


<script>
import Datepicker from "vuejs-datepicker";
import service from "@/service/service";
import EditUser from "./extra-components/edit-user.vue";
// import ViewData from './view/ViewData.vue';
import moment from "moment";
// import firebase from 'firebase/app'ว
// import * as firebase from 'firebase/app';

// import '@firebase/messaging';
export default {
  components: {
    EditUser,
    Datepicker
  },
  data() {
    return {
      popupActive: false,
      change_password: false,
      renderComponent: true,
      popupActive: false,
      bookings: [],
      roles: [],
      view: {},
      materials: [],
      submitted: false,
      editObj: {}
    };
  },

  computed: {
    invalid() {
      var require = type => this.submitted && this.editObj[type] == "";
      return {
        room_name: require("room_name"),
        num_chair: require("num_chair"),
        num_table: require("num_table")
      };
    },
    isInvald() {
      return (
        this.invalid.room_name ||
        this.invalid.num_chair ||
        this.invalid.num_table
      );
    }
  },
  created() {
    this.getdata();
    this.initVal();
  },
  methods: {
    initVal() {
      this.submitted = false;
      this.change_password = false;
      (popupActive = false),
        (this.editObj = {
          room_name: "",
          num_chair: "",
          num_table: ""
        });
    },
    views(tr) {
      this.popupActive = true;
      this.view = tr;
      service
        .postData("/get_booked_material", { booking_id: tr.booking_id })
        .then(result => {
          this.materials = result.data;
        });
    },
    delete_booking(booking) {
      this.$swal({
        title: this.$t("delete_booking_title"),
        text: this.$t("delete_text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("cancel"),
        confirmButtonText: this.$t("confirm_delete"),
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return service
            .postData("/delete_booking", { booking_id: booking.booking_id })
            .then(result => {
              return result;
            });
        }
      }).then(result => {
        if (result.value) {
          if (result.value.code) {
            this.$swal(this.$t("deleted_title"), "", "success").then(result => {
              this.getdata();
              this.forceRerender();
              this.initVal();
            });
          } else {
            this.$swal(result.value.message, "", "error");
          }
        }
      });
    },
    reject(booking) {
      this.$swal({
        title: this.$t("reject_booking_title"),
        text: this.$t("reject_text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("cancel"),
        confirmButtonText: this.$t("reject"),
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return service
            .postData("/reject", { booking_id: booking.booking_id })
            .then(result => {
              return result;
            });
        }
      }).then(result => {
        if (result.value) {
          if (result.value.code) {
            this.$swal(this.$t("rejected_title"), "", "success").then(
              result => {
                this.getdata();
                this.forceRerender();
                this.initVal();
              }
            );
          } else {
            this.$swal(result.value.message, "", "error");
          }
        }
      });
    },
    approve(booking) {
      this.$swal({
        title: this.$t("approve_booking_title"),
        text: this.$t("approve_text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("cancel"),
        confirmButtonText: this.$t("approve"),
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return service
            .postData("/approve", { booking_id: booking.booking_id })
            .then(result => {
              return result;
            });
        }
      }).then(result => {
        if (result.value) {
          if (result.value.code) {
            this.$swal(this.$t("approved_title"), "", "success").then(
              result => {
                this.getdata();
                this.forceRerender();
                this.initVal();
              }
            );
          } else {
            this.$swal(result.value.message, "", "error");
          }
        }
      });
    },
    getdata() {
      service.postData("/get_booking", {}).then(result => {
        this.bookings = result.data;
      });
    },
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    save() {
      this.submitted = true;
      if (!this.isInvald) {
        if (this.popupActive) {
          this.$vs.loading({
            background: this.backgroundLoading,
            color: this.colorLoading,
            container: "#button-with-loading1",
            scale: 0.45
          });
        } else {
          this.$vs.loading({
            background: this.backgroundLoading,
            color: this.colorLoading,
            container: "#button-with-loading",
            scale: 0.45
          });
        }

        service.postData("/upsert_room", this.editObj).then(
          result => {
            if (this.popupActive)
              this.$vs.loading.close("#button-with-loading1 > .con-vs-loading");
            else
              this.$vs.loading.close("#button-with-loading > .con-vs-loading");
            this.popupActive = false;
            this.$swal(this.$t("success_title"), "", "success").then(result => {
              this.getdata();
              this.forceRerender();
            });
          },
          err => {
            this.popupActive = false;
          }
        );
      }
    }
  },
  watch: {
    popupActive(val) {
      if (!val) {
        this.editObj = {
          room_name: "",
          num_chair: "",
          num_table: ""
        };
      }
    }
  }
};
</script>

