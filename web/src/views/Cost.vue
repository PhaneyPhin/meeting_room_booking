<template>
  <div class="w-full">
    <div class="mb-base w-full" v-if="mode==1">
      <vx-card>
        <h6>{{$t("Search the code")}}</h6>

        <div class="mt-6 vx-row mb-6">
          <div class="vx-col lg:w-5/12 md:w-1/2 w-full">
            <div class="vx-row">
              <div class="vx-col lg:w-1/3 w-full mt-5" style="padding-top:3px">
                <label>{{$t("start_datetime")}}</label>
              </div>
              <div class="vx-col lg:w-2/3 w-full lg:mt-5 mt-0 sm:pr-10 lg:pr-0 md:pr-20">
                <flat-pickr
                  :config="configdateTimePicker"
                  class="w-full flatpickr-input"
                  v-model="editObj.start_date"
                  :class="{' danger':invalid.start_date}"
                  placeholder
                />
              </div>
            </div>
          </div>
          <div class="vx-col lg:w-5/12 md:w-1/2 w-full">
            <div class="vx-row">
              <div class="vx-col lg:w-1/3 w-full mt-5" style="padding-top:3px">
                <label>{{$t("end_datetime")}}</label>
              </div>
              <div class="vx-col lg:w-2/3 w-full lg:mt-5 mt-0 sm:pr-10 lg:pr-0 md:pr-20">
                <flat-pickr
                  :config="configdateTimePicker"
                  class="w-full flatpickr-input"
                  v-model="editObj.end_date"
                  :class="{'w-full flatpickr-input danger':invalid.end_date}"
                  placeholder
                />
              </div>
            </div>
          </div>

          <div class="vx-col sm:pr-10 md:pr-20 lg:w-1/6 md:w-1/2 w-full mt-5">
            <div class="vx-row pr-4 pl-4">
              <vs-button
                ref="loadableButton"
                id="button-with-loading"
                class="vs-con-loading__container vx-col w-full"
                vslor="primary"
                @click="search()"
              >{{$t('search')}}</vs-button>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="vx-row">
        <div class="vx-col w-full lg:w-1/2 lg:mt-5 mt-base mt-5 overflow-hidden">
          <vx-card>
            <div slot="no-body">
              <div class="vx-card__header">
                <div class="vx-card__title">
                  <h4 class>{{$t('Officer')}}</h4>
                </div>
                <div class="vx-card__actions">
                  <button
                    type="button"
                    class="vs-con-dropdown parent-dropdown cursor-pointer"
                    @click="viewOfficer()"
                  >{{$t('view detail')}}</button>
                </div>
              </div>
              <!-- CHART -->
              <vue-apex-charts
                type="pie"
                height="345"
                class="mt-2"
                :options="DepartmentPie.chartOptions"
                :series="DepartmentPie.series"
                v-if="renderDepartment_chart"
              />

              <!-- CHART DATA -->
              <div style="height:200px;">
                <VuePerfectScrollbar
                  ref="chatLogPS"
                  class="scroll-area pt-6 px-6"
                  :settings="settings"
                >
                  <ul class="mb-1" ref="chatLog">
                    <li
                      v-for="(department,index) in DepartmentPie.analyticsData"
                      :key="index"
                      class="flex justify-between py-3 px-6 border d-theme-border-grey-light border-solid border-r-0 border-l-0 border-b-0"
                    >
                      <span class="flex items-center">
                        <span
                          class="inline-block h-3 w-3 rounded-full mr-2"
                          :style="{'background':colors[index]}"
                        ></span>
                        <span
                          class="font-semibold"
                        >{{$t('Officer of') +' '+department['department_name_'+$i18n.locale] }}</span>
                      </span>
                      <span>{{ department.total_price }}</span>
                    </li>
                  </ul>
                </VuePerfectScrollbar>
              </div>
            </div>
          </vx-card>
        </div>

        <div
          class="vx-col w-full lg:w-1/2 lg:mt-5 mt-base overflow-hidden"
          v-for="(department,index) in listDepartments"
          :key="index"
        >
          <vx-card>
            <div slot="no-body">
              <div class="vx-card__header">
                <div class="vx-card__title">
                  <h4 class>{{$t('Officer of') + " "+department['department_name_'+$i18n.locale]}}</h4>
                </div>
                <div class="vx-card__actions">
                  <button
                    type="button"
                    class="vs-con-dropdown parent-dropdown cursor-pointer"
                    @click="viewDepartment(department)"
                  >{{$t('view detail')}}</button>
                </div>
              </div>
              <!-- CHART -->
              <vue-apex-charts
                type="pie"
                height="345"
                class="mt-2"
                :options="department.SubDepartmentPIE.chartOptions"
                :series="department.SubDepartmentPIE.series"
                v-if="renderDepartment_chart"
              />
              <!-- <pre>{{department | json}}</pre> -->
              <div style="height:200px;">
                <VuePerfectScrollbar
                  ref="chatLogPS"
                  class="scroll-area pt-6 px-6"
                  :settings="settings"
                >
                  <ul class="mb-1" ref="chatLog">
                    <li
                      v-for="(sub_department,index1) in department.SubDepartmentPIE.analyticsData"
                      :key="index1"
                      class="flex justify-between py-3 px-6 border d-theme-border-grey-light border-solid border-r-0 border-l-0 border-b-0 sub_department_list"
                      @click="viewSubDepartment(sub_department)"
                    >
                      <span class="flex items-center">
                        <span
                          class="inline-block h-3 w-3 rounded-full mr-2"
                          :style="{'background':departmentColors[index%departmentColors.length][index1]}"
                        ></span>
                        <span
                          class="font-semibold"
                        >{{ $t('Department of')+' '+sub_department['sub_department_name_'+$i18n.locale]}}</span>
                      </span>
                      <span>{{ sub_department.total_price }}</span>
                    </li>
                  </ul>
                </VuePerfectScrollbar>
              </div>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
    <div class="mb-base w-full" v-if="mode==2">
      <div class="vx-row mb-5">
        <vs-button
          class="ml-5"
          vsclor="primary"
          @click="mode=1;selected={};materials=[];show_detail=false;notifyClose();"
        >{{$t('back')}}</vs-button>
        <h5 class="mt-3 ml-5">{{$t('Material Detail')}}</h5>
      </div>
      <vx-card>
        <!-- <pre>{{x}}</pre> -->
        <h3
          v-if="sub_department_id==1"
        >{{ $t('Department of')+' '+sub_department['sub_department_name_'+$i18n.locale]}}</h3>
        <h3
          v-if="sub_department_id==0"
        >{{$t('Officer of') + " "+department['department_name_'+$i18n.locale]}}</h3>
        <vs-table
          pagination
          max-items="10"
          v-model="selected"
          @selected="handleSelected"
          search
          :data="materials"
        >
          <template slot="thead">
            <vs-th sort-key="material_id">{{$t('material_id')}}</vs-th>
            <vs-th sort-key="material_name">{{$t('material_name')}}</vs-th>
            <vs-th sort-key="material_price">{{$t('material_price')}}</vs-th>

            <vs-th sort-key="material_number">{{$t("material_number")}}</vs-th>
            <vs-th sort-key="total_price">{{$t("total_price")}}</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
              <vs-td :data="tr.material_id">{{tr.material_id}}</vs-td>

              <vs-td :data="tr.material_name">{{ tr.material_name}}</vs-td>
              <vs-td :data="tr.material_price">{{tr.material_price}}</vs-td>
              <vs-td :data="tr.material_number">{{tr.material_number}}</vs-td>
              <vs-td :data="tr.total_price">{{tr.total_price}}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
      <vx-card class="mt-5" v-if="show_detail">
        <!-- <pre>{{x}}</pre> -->
        <h4 class="ml-5">{{$t('Booking Detail')}}</h4>
        <vs-table stripe pagination max-items="10" search :data="bookings">
          <template slot="thead">
            <vs-th sort-key="booking_id">{{$t('booking_id')}}</vs-th>

            <vs-th sort-key="first_name+last_name">{{$t("first_surname")}}</vs-th>
            <vs-th sort-key="room_name">{{$t('room_name')}}</vs-th>
            <vs-th sort-key="booking_description">{{$t('booking_description')}}</vs-th>
            <vs-th sort-key="start_date">{{$t('start_date')}}</vs-th>
            <vs-th sort-key="end_date">{{$t('end_date')}}</vs-th>
            <vs-th sort-key="status_name">{{$t('status_name')}}</vs-th>
            <vs-th>{{$t('view')}}</vs-th>
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

              <vs-td :data="tr.status_name" :class="'A'+tr.status_id">{{ $t(tr.status_name)}}</vs-td>
              <vs-td>
                <feather-icon
                  icon="MaximizeIcon"
                  class="cursor-pointer w-6 h-6 text-primary"
                  size="small"
                  @click="views(tr)"
                ></feather-icon>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <vs-popup class="holamundo" :title="$t('view')" :active.sync="popupActive">
          <div class="vx-row mt-5">
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('Officer')}}:</div>
            <div class="vx-col md:w-3/4 w-1/2 pl-5 value">{{view['department_name_'+$i18n.locale]}}</div>
          </div>
          <div class="vx-row mt-5">
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('Department')}}:</div>
            <div
              class="vx-col md:w-3/4 w-1/2 pl-5 value"
            >{{view['sub_department_name_'+$i18n.locale]}}</div>
          </div>
          <div class="vx-row mt-5">
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('booking_description')}}:</div>
            <div class="vx-col md:w-3/4 w-1/2 pl-5 value">{{view.booking_description}}</div>
          </div>
          <div class="vx-row mt-5">
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('booking_id')}}:</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5 value">{{view.booking_id}}</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('first_surname')}}:</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5 value">{{view.first_name+' '+view.last_name}}</div>
          </div>

          <div class="vx-row mt-5">
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('room_name')}}:</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5 value">{{view.room_name}}</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('importance')}}:</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5 value">{{$t(view.important)}}</div>
          </div>

          <div class="vx-row mt-5">
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('Remark')}}:</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5 value">{{view.remark}}</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('Tel')}}:</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5 value">{{view.tel}}</div>
          </div>
          <div class="vx-row mt-5">
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('Member')}}:</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5 value">{{view.member}}</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('booking_date')}}:</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5 value">{{view.booking_date | onlyDate}}</div>
          </div>
          <div class="vx-row mt-5">
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('date')}}:</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5 value">{{view.start_date | onlyDate}}</div>
            <div class="vx-col md:w-1/4 w-1/2 pl-5">{{$t('time')}}:</div>
            <div
              class="vx-col md:w-1/4 w-1/2 pl-5 value"
            >{{view.start_date | onlyTime}}-{{view.end_date | onlyTime}}</div>
          </div>
          <v-template v-if="materials.length>0">
            <div class="vx-row mt-5 ml-5">
              <strong>{{$t('Material Detail')}}</strong>
            </div>
            <vs-table stripe pagination max-items="10" search :data="material1">
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
      </vx-card>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import service from "@/service/service";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { async } from "q";
import { departmentColors } from "./Colors";
const colors = [
  "#242145",
  "#03a9f4",
  "#b2b63d",
  "#ffeb3b",
  "#795548",
  "#46c93a",
  "#1f74ff",
  "#ff4757",
  "#ffba00",
  "#1e1e1e",
  "#5b3dc3",
  "#17c964",
  "#f2135d",
  "#ff8200"
];

export default {
  components: {
    VueApexCharts,
    VuePerfectScrollbar,
    flatPickr
  },
  data() {
    return {
      department_id: "",
      departmentView: 0,
      popupActive: false,
      selected: {},
      material1: [],
      materials: [],
      deparment: {},
      bookings: [],
      view: {},
      show_detail: false,
      mode: 1,
      sub_department: {},
      departmentColors: departmentColors,
      colors: colors,
      renderDepartment_chart: false,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      configdateTimePicker: {
        enableTime: false,
        enableSeconds: false,
        noCalendar: false
      },
      editObj: {
        start_date: "",
        end_date: ""
      },
      DepartmentPie: {
        analyticsData: [],
        series: [],
        chartOptions: {
          labels: [],
          dataLabels: {
            enabled: false
          },
          legend: { show: false },
          chart: {
            type: "pie",
            offsetY: 30,
            dropShadow: {
              enabled: false,
              blur: 5,
              left: 1,
              top: 1,
              opacity: 0.2
            },
            toolbar: {
              show: false
            }
          },
          stroke: {
            width: 5
          },
          colors: colors
        }
      },
      listDepartments: []
    };
  },
  computed: {
    invalid() {
      var require = type => this.submitted && this.editObj[type] == "";
      return {
        start_date: require("start_date"),
        end_date: require("end_date")
      };
    },
    isInvald() {
      return this.invalid.start_date || this.invalid.end_date;
    },
    isSelected() {
      return JSON.stringify(this.selected) == "{}";
    }
  },

  async mounted() {
    this.$refs.chatLogPS.$el.scrollTop = 0;
    this.search();
  },
  methods: {
    views(tr) {
      this.popupActive = true;
      this.view = tr;
      service
        .postData("/get_booked_material", { booking_id: tr.booking_id })
        .then(result => {
          this.material1 = result.data;
        });
    },
    async viewSubDepartment(sub_department) {
      const response = await service.postData("getMaterialOfficerUsing", {
        ...this.editObj,
        sub_departmentView: 1,
        sub_department_id: sub_department.sub_department_id
      });
      this.departmentView = 0;
      this.sub_department = sub_department;
      this.sub_department_id = sub_department.sub_department_id;
      this.materials = response.data;
      console.log(sub_department);
      this.$vs.notify({
        title:
          this.$t("Viewing Department") +
          " " +
          sub_department["sub_department_name_" + this.$i18n.locale],
        text: ""
      });

      this.mode = 2;
    },
    async viewDepartment(department) {
      this.departmentView = 1;
      console.log(department);
      this.department = department;
      this.departmentView = 1;
      const response = await service.postData("getMaterialOfficerUsing", {
        ...this.editObj,
        departmentView: this.departmentView,
        department_id: department.department_id
      });
      this.department_id = department.department_id;
      this.materials = response.data;
      this.$vs.notify({
        title: this.$t("Viewing Officer Detail"),
        text: ""
      });

      this.mode = 2;
    },
    async handleSelected() {
      this.show_detail = true;
      console.log(this.selected);
      this.$vs.notify({
        title: this.$t("Viewing ") + this.selected.material_name,
        text: this.$t("price ") + this.selected.total_price
      });
      var response = await service.postData("getBookingOfficerDetail", {
        ...this.editObj,
        material_id: this.selected.material_id,
        departmentView: this.departmentView,
        department_id: this.department_id,
        sub_department_id: this.sub_department_id
      });
      this.bookings = response.data;
    },
    async search() {
      this.renderDepartment_chart = false;

      var response = await service.postData("getSummaryDepartmentCost", {
        ...this.editObj
      });
      this.DepartmentPie.chartOptions.labels = response.data.map(item => {
        return item["department_name_" + this.$i18n.locale];
      });
      this.DepartmentPie.series = response.data.map(item => {
        return parseFloat(item.total_price);
      });
      this.DepartmentPie.analyticsData = [...response.data];
      this.listDepartments = [];
      this.DepartmentPie.analyticsData.forEach(async (item, index) => {
        var test = {
          SubDepartmentPIE: {
            analyticsData: [],
            series: [],
            chartOptions: {
              labels: [],
              dataLabels: {
                enabled: false
              },
              legend: { show: false },
              chart: {
                type: "pie",
                offsetY: 30,
                dropShadow: {
                  enabled: false,
                  blur: 5,
                  left: 1,
                  top: 1,
                  opacity: 0.2
                },
                toolbar: {
                  show: false
                }
              },
              stroke: {
                width: 5
              },
              colors: departmentColors[index]
            }
          }
        };

        var response1 = await service.postData("getSummarySubDepartmentCost", {
          department_id: item.department_id,
          ...this.editObj
        });
        console.log(response1);
        test.SubDepartmentPIE.chartOptions.labels = response1.data.map(
          item1 => {
            return item1["sub_department_name_" + this.$i18n.locale];
          }
        );
        test.SubDepartmentPIE.series = response1.data.map(item1 => {
          return parseFloat(item1.total_price);
        });
        test.SubDepartmentPIE.analyticsData = response1.data;
        // console.log();
        this.listDepartments.push({ ...item, ...test });
      });
      this.renderDepartment_chart = true;
    },

    async viewOfficer() {
      this.departmentView = 0;
      const response = await service.postData("getMaterialOfficerUsing", {
        ...this.editObj,
        departmentView: this.departmentView,
        department_id: ""
      });
      this.materials = response.data;
      this.$vs.notify({
        title: this.$t("Viewing Officer Detail"),
        text: ""
      });

      this.mode = 2;
    },
    notifyClose() {
      this.$vs.notify({
        title: this.$t("Backing to Cost Data"),
        text: ""
      });
    }
  }
};
</script>

<style scoped>
.sub_department_list {
  cursor: pointer;
}
.sub_department_list:hover {
  background: #03a9f4;
  color: white;
}
</style>
