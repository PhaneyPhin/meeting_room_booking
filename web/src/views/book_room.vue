<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">
    <div class="w-full" v-if="!booking">
      <vx-card>
        <h6>{{$t("search_free_room")}}</h6>
        <div class="vx-row">
          <div class="vx-col md:w-1/3 mt-6">
            <label>{{$t("Building")}}</label>
            <vs-select class="w-full" v-model="editObj.building_id">
              <vs-select-item value :text="$t('all')" />
              <vs-select-item
                :key="index"
                :value="item.building_id"
                :text="$t(item.building_name)"
                v-for="(item,index) in buildings"
              />
            </vs-select>
          </div>
          <div class="vx-col md:w-1/3 mt-6">
            <label>{{$t("room")}}</label>
            <vs-select class="w-full" v-model="editObj.room_id">
              <vs-select-item value :text="$t('all')" />
              <vs-select-item
                :key="index"
                :value="item.room_id"
                :text="$t(item.room_name)"
                v-for="(item,index) in rooms"
              />
            </vs-select>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/3 mt-6">
            <label>{{$t("date")}}</label>
            <flat-pickr
              :config="configdateTimePicker"
              class="w-full"
              v-model="editObj.date"
              placeholder="Choose time"
            />
          </div>

          <div class="vx-col md:w-1/3 mt-6">
            <div style="width:45%;float:left">
              <label>{{$t("time")}}</label>
              <flat-pickr
                :config="configTime"
                class="w-full"
                v-model="editObj.start_time"
                placeholder="Choose time"
              />
            </div>

            <div style="width:10%;float:left;text-align:center;padding-top:30px">{{$t('to')}}</div>
            <div style="width:45%;padding-top:20px;float:left">
              <flat-pickr
                :config="configTime"
                class="w-full"
                v-model="editObj.end_time"
                placeholder="Choose time"
              />
            </div>
          </div>
          <div class="vx-col md:w-1/6 mt-6" style="padding-top:20px;">
            <vs-button
              ref="loadableButton"
              id="button-with-loading"
              class="vs-con-loading__container right"
              vslor="primary"
              @click="search()"
            >{{$t('search')}}</vs-button>
          </div>
        </div>
      </vx-card>
      <div class="mt-6 text-center" v-if="room_lists.length==0&&searched">{{$t("no_data")}}</div>
      <div class="vx-row">
        <div
          v-for="(item,index) in room_lists"
          :key="index"
          class="vx-col md:w-1/3 mt-5"
          style="padding:10px"
        >
          <vx-card class="w-full">
            <table style="width:100%">
              <tr>
                <td>{{$t("room_id")}}</td>
                <td>{{item.room_id}}</td>
              </tr>
              <tr>
                <td>{{$t("room_name")}}</td>
                <td>{{item.room_name}}</td>
              </tr>
              <tr>
                <td>{{$t("num_table")}}</td>
                <td>{{item.num_table}}</td>
              </tr>
              <tr>
                <td>{{$t("num_chair")}}</td>
                <td>{{item.num_chair}}</td>
              </tr>
              <tr>
                <td>{{$t("status")}}</td>
                <td
                  :style="{color:item.status=='1'?'green':'red'}"
                >{{item.status=='1'?$t('Available'):$t('Not Available')}}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <vs-button
                    ref="loadableButton"
                    id="button-with-loading1"
                    class="vs-con-loading__container"
                    vslor="primary"
                    @click="book(item)"
                    :disabled="item.status=='0'"
                  >{{$t('book_this_room')}}</vs-button>
                </td>
              </tr>
            </table>
          </vx-card>
        </div>
      </div>
    </div>
    <div class="w-full" v-if="booking">
      <vx-card>
        <div class="vx-row">
          <div class="vx-col full">
            <h6>{{$t('booking_room')}}</h6>
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
              <tr style>
                <td style="padding:5px">{{$t('start_date')}}</td>
                <td class="text-primary">{{booking_data.start_date}}</td>
              </tr>
              <tr style>
                <td style="padding:5px">{{$t('email')}}</td>
                <td class="text-primary">{{booking_data.email}}</td>
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
              <tr style>
                <td>{{$t('end_date')}}</td>
                <td class="text-primary">{{booking_data.end_date}}</td>
              </tr>
            </table>
          </div>
        </div>
        <vs-divider position="left">{{$t("detail_input")}}</vs-divider>
        <div class="vx-row mt-10">
          <div class="vx-col md:w-1/4" style="text-align:right">
            {{$t("detail")}}
            <span class="require">*</span>:
          </div>
          <div class="vx-col md:w-1/2">
            <vs-input class="w-full" v-model="detail" :danger="submitted&&detail==''" />
            <div class="errors" v-if="submitted&&detail==''">{{$t("Please input subject")}}</div>
          </div>
        </div>
        <div class="vx-row mt-10">
          <div class="vx-col md:w-1/4" style="text-align:right">
            {{$t("Officer")}}
            <span class="require">*</span>:
          </div>
          <div class="vx-col md:w-1/2">
            <vs-select
              class="w-full"
              v-model="department_id"
              :danger="department_id==''&&submitted"
            >
              <vs-select-item
                :key="index"
                :value="item.department_id"
                :text="item['department_name_'+$i18n.locale]"
                v-for="(item,index) in departments"
              />
            </vs-select>
            <div class="errors" v-if="submitted&&department_id==''">{{$t("Please select officer")}}</div>
          </div>
        </div>
        <div class="vx-row mt-10">
          <div class="vx-col md:w-1/4" style="text-align:right">
            {{$t("Department")}}
            <span class="require">*</span>:
          </div>
          <div class="vx-col md:w-1/2">
            <vs-select
              class="w-full"
              v-model="sub_department_id"
              :danger="sub_department_id==''&&submitted"
            >
              <vs-select-item
                :key="index"
                :value="item.sub_department_id"
                :text="item['sub_department_name_'+$i18n.locale]"
                v-for="(item,index) in subdepartments"
              />
            </vs-select>
            <div
              class="errors"
              v-if="submitted&&sub_department_id==''"
            >{{$t("Please select department")}}</div>
          </div>
        </div>
        <div class="vx-row mt-5 mb-10">
          <div class="vx-col md:w-1/4" style="text-align:right">
            {{$t("importance")}} :
            <span class="require">*</span>
          </div>
          <div class="vx-col md:w-1/2">
            <vs-select class="w-full" v-model="important" :danger="important==''&&submitted">
              <vs-select-item
                :key="index"
                :value="item"
                :text="$t(item)"
                v-for="(item,index) in important_lists"
              />
            </vs-select>

            <div class="errors" v-if="submitted&&important==''">{{$t("Please select important")}}</div>
          </div>
        </div>
        <div class="vx-row mt-5 mb-10">
          <div class="vx-col md:w-1/4" style="text-align:right">
            {{$t("Number of Member")}} :
            <span class="require">*</span>
          </div>
          <div class="vx-col md:w-1/2">
            <vs-input
              class="w-full"
              v-model="member"
              :danger="submitted&&member==''"
              @keypress="checkNumber"
            />
            <div class="errors" v-if="submitted&&member==''">{{$t("Please input number of member")}}</div>
          </div>
        </div>
        <div class="vx-row mt-5 mb-10">
          <div class="vx-col md:w-1/4" style="text-align:right">
            {{$t("Remark")}} :
            <span class="require">*</span>
          </div>
          <div class="vx-col md:w-1/2">
            <vs-input class="w-full" v-model="remark" :danger="submitted&&remark==''" />
            <div class="errors" v-if="submitted&&remark==''">{{$t("Please input remark")}}</div>
          </div>
        </div>
        <div class="vx-row mt-5 mb-10">
          <div class="vx-col md:w-1/4" style="text-align:right">
            {{$t("Tel")}} :
            <span class="require">*</span>
          </div>
          <div class="vx-col md:w-1/2">
            <vs-input
              class="w-full"
              v-model="tel"
              :danger="submitted&&tel==''"
              maxlength="10"
              @keypress="checkNumber"
            />
            <div class="errors" v-if="submitted&&tel==''">{{$t("Please input remark")}}</div>
          </div>
        </div>
        <vs-divider position="left">{{$t("material_using")}}</vs-divider>
        <div class="vx-row">
          <div class="vx-col md:w-1/4" style="text-align:right"></div>
          <div class="vx-col md:w-1/4 mt-5">
            <vs-button
              color="primary"
              icon-pack="feather"
              icon="icon-plus"
              @click="add()"
            >{{$t('add')}}</vs-button>
          </div>
        </div>
        <div class="vx-row" v-for="(item,index) in material_lists" :key="index">
          <div class="vx-col md:w-1/4" style="text-align:right"></div>
          <div class="vx-col md:w-1/4 mt-5">
            {{$t("material")}} ({{$t('material_price')}})
            <vs-select
              class="w-full"
              v-model="item.material_id"
              :danger="item.material_id==''&&submitted"
            >
              <vs-select-item
                :key="index"
                :value="material.material_id"
                :text="$t(material.material_name+' ('+material.material_price+')')"
                v-for="(material,index) in materials"
              />
            </vs-select>
            <div
              class="errors"
              v-if="item.material_id==''&&submitted"
            >{{$t('please select material')}}</div>
          </div>
          <div class="vx-col md:w-1/4 mt-5">
            {{$t("material_number")}}
            <vs-input
              class="w-full"
              v-model="item.material_number"
              @keypress="checkNumber"
              :danger="item.material_number==''&&submitted"
            />
            <div
              class="errors"
              v-if="item.material_number==''&&submitted"
            >{{$t('please input the number of material')}}</div>
          </div>
          <div class="vx-col md:w-1/4 mt-10">
            <vs-button
              ref="loadableButton"
              color="danger"
              @click="material_lists.splice(index,1)"
            >{{$t('remove')}}</vs-button>
          </div>
        </div>

        <!-- <div class="vx-row">
          <div class="vx-col md:w-1/4" style="text-align:right"></div>
          <div class="vx-col md:w-1/4 mt-5">
            {{$t("material")}} ({{$t('material_price')}})
            <vs-select class="w-full" v-model="material.material_id">
              <vs-select-item
                :key="index"
                :value="item.material_id"
                :text="$t(item.material_name+ '('+item.material_price+')')"
                v-for="(item,index) in materials"
              />
            </vs-select>
          </div>
          <div class="vx-col md:w-1/4 mt-5">
            {{$t("material_number")}}
            <vs-input class="w-full" v-model="material.material_number" @keypress="checkNumber" />
          </div>
        </div>-->
        <div class="vx-row mt-10">
          <div class="w-full">
            <vs-button
              class="right"
              color="danger"
              type="border"
              @click="booking=false;booking_data={}"
            >{{$t('cancel')}}</vs-button>
            <vs-button class="right" @click="save()">{{$t('save')}}</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
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
td {
  width: 50%;
  padding: 10px;
}
tr td:first-child {
  padding-left: 30px;
}
</style>


<script>
import Datepicker from "vuejs-datepicker";
import service from "@/service/service";
// import ViewData from './view/ViewData.vue';
import moment from "moment";
// import firebase from 'firebase/app'ว
// import * as firebase from 'firebase/app';
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { async } from "q";
// import '@firebase/messaging';
export default {
  components: {
    Datepicker,
    flatPickr
  },
  data() {
    return {
      submitted: false,
      renderComponent: true,
      editObj: {},
      booking: false,
      detail: "",
      buildings: [],
      important: "",
      remark: "",
      tel: "",
      member: "",
      searched: false,
      rooms: [],
      materials: [],
      booking_data: {},
      material: {},
      material_lists: [],
      departments: [],
      subdepartments: [],
      sub_department_id: "",
      department_id: "",
      configdateTimePicker: {
        enableTime: false,
        enableSeconds: false,
        noCalendar: false
      },
      configTime: {
        enableTime: true,
        enableSeconds: true,
        noCalendar: true
      },
      room_lists: [],
      important_lists: ["normal", "important"]
    };
  },

  computed: {
    body() {
      return {
        room_id: this.editObj.room_id,
        start_date: this.editObj.date + " " + this.editObj.start_time,
        end_date: this.editObj.date + " " + this.editObj.end_time,
        building_id: this.editObj.building_id
      };
    }
  },
  async created() {
    this.material = { material_id: "", material_number: "" };
    this.initVal();

    try {
      var result = await service.postData("material/get", {});

      this.materials = result.data;

      result = await service.postData("building/getBuilding", {});
      this.buildings = result.data;
    } catch (e) {
      this.$swal(this.$t("error"), e.message, "error");
    }
  },

  methods: {
    checkNumber(e) {
      var checkNumber = window.checkNumber(e);
      if (!checkNumber) {
        e.preventDefault();
      }
    },
    async initVal() {
      this.editObj = {
        building_id: "",
        room_id: "",
        date: moment().format("YYYY-MM-DD"),
        start_time: moment().format("HH:mm:ss"),
        end_time: "17:30:00"
      };
      var response = await service.postData("department/getDepartment", {});
      this.departments = response.data;
    },
    search() {
      this.searched = true;
      console.log("searching");

      if (!moment(this.body.start_date).isBefore(moment(this.body.end_date))) {
        this.$swal(this.$t("start_date_canot_more_than_end_date"), "", "error");
      } else {
        this.$vs.loading({
          background: this.backgroundLoading,
          color: this.colorLoading,
          container: "#button-with-loading",
          scale: 0.45
        });
        service.postData("get_room_with_status", this.body).then(
          result => {
            this.$vs.loading.close("#button-with-loading > .con-vs-loading");
            this.room_lists = result.data;
          },
          err => {
            this.$vs.loading.close("#button-with-loading > .con-vs-loading");
          }
        );
      }
    },
    add() {
      this.material_lists.push({ material_id: "", material_number: "" });
    },
    book(item) {
      this.booking = true;
      var { username, first_name, last_name, email } = service.getUser().user;
      this.booking_data = {
        room_id: item.room_id,
        start_date: this.body.start_date,
        end_date: this.body.end_date,
        username: username,
        first_name: first_name,
        last_name: last_name,
        room_name: item.room_name,
        email: email
      };
    },
    checkMaterial() {
      var x = this.material_lists.filter(item => {
        return item.material_id == "" || item.material_number == "";
      });
      console.log(x);
      return x.length == 0;
    },
    save() {
      this.submitted = true;
      var result = [];

      if (
        this.detail != "" &&
        this.important != "" &&
        this.member != "" &&
        this.remark != "" &&
        this.tel != "" &&
        this.sub_department_id != "" &&
        this.checkMaterial()
      ) {
        var materials = this.material_lists.map(item => item);
        materials
          .filter(item => item.material_number != "")
          .reduce(function(res, value) {
            if (!res[value.material_id]) {
              res[value.material_id] = {
                Id: value.material_id,
                material_number: 0
              };
              result.push(res[value.material_id]);
            }
            res[value.material_id].material_number =
              parseInt(res[value.material_id].material_number) +
              parseInt(value.material_number);
            return res;
          }, {});
        var material_lists = result.filter(item => item.material_number > 0);
        this.$swal({
          title: this.$t("booking_room_title"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: this.$t("cancel"),
          confirmButtonText: this.$t("book"),
          showLoaderOnConfirm: true,
          preConfirm: () => {
            var { username, room_id, start_date, end_date } = this.booking_data;
            return service
              .postData("/booking_room", {
                booking_description: this.detail,
                username,
                room_id,
                start_date,
                end_date,
                material_lists,
                important: this.important,
                member: this.member,
                remark: this.remark,
                tel: this.tel,
                sub_department_id: this.sub_department_id
              })
              .then(result => {
                return result;
              });
          }
        }).then(result => {
          if (result.value) {
            if (result.value.code) {
              this.$swal(this.$t("success_title"), "", "success").then(
                result => {
                  this.booking = false;
                  service.postData("get_room_with_status", this.body).then(
                    result => {
                      // this.$vs.loading.close("#button-with-loading > .con-vs-loading")
                      this.room_lists = result.data;
                      this.material_lists = [];
                      this.detail = "";
                      this.important = "";
                      this.submitted = false;
                    },
                    err => {
                      // this.$vs.loading.close("#button-with-loading > .con-vs-loading")
                    }
                  );
                }
              );
            } else {
              this.$swal(this.$t("error"), result.value.message, "error");
            }
          }
        });
      }
    }
  },
  watch: {
    async "editObj.building_id"(val) {
      this.editObj.room_id = "";
      var result = await service.postData("getRoomByBuilding", {
        building_id: this.editObj.building_id
      });
      this.rooms = result.data;
    },
    async department_id(val) {
      if (val != "") {
        try {
          this.sub_department_id = "";
          var response = await service.postData(
            "subDepartment/getSubDepartment",
            { department_id: val }
          );
          this.subdepartments = response.data;
        } catch (e) {}
      }
    }
  }
};
</script>

