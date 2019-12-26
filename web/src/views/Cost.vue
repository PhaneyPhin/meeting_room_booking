<template>
  <div class="mb-base w-full">
    <vx-card>
      <h6>{{$t("Search the code")}}</h6>

      <div class="mt-6 vx-row mb-6">
        <div
          class="vx-col lg:w-1/6 md:w-1/3 sm:w-1/3 w-1/3 mt-5"
          style="text-align:right;padding-top:3px"
        >
          <label>{{$t("start_datetime")}}</label>
        </div>
        <div class="vx-col lg:w-1/5 md:w-2/3 mt-5 sm:w-2/3 w-2/3 sm:pr-10 lg:pr-0 md:pr-20">
          <flat-pickr
            :config="configdateTimePicker"
            class="w-full flatpickr-input"
            v-model="editObj.start_date"
            :class="{' danger':invalid.start_date}"
            placeholder
          />
        </div>
        <div
          class="vx-col lg:w-1/6 md:w-1/3 sm:w-1/3 w-1/3 mt-5"
          style="text-align:right;padding-top:3px"
        >
          <label>{{$t("end_datetime")}}</label>
        </div>
        <div class="vx-col lg:w-1/5 md:w-2/3 sm:w-2/3 w-2/3 mt-5 sm:pr-10 lg:pr-0 md:pr-20">
          <flat-pickr
            :config="configdateTimePicker"
            class="w-full flatpickr-input"
            v-model="editObj.end_date"
            :class="{'w-full flatpickr-input danger':invalid.end_date}"
            placeholder
          />
        </div>

        <div class="vx-col lg:w-1/6 md:w-1/3 sm:w-1/3 w-full mt-5 lg:pr-10 lg:pl-5">
          <vs-button
            ref="loadableButton"
            id="button-with-loading"
            class="vs-con-loading__container md:mr-0 sm:mr-0 mr-0 lg:float-right md:float-right sm:float-right float-left"
            vslor="primary"
            @click="search()"
          >{{$t('search')}}</vs-button>
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
                    class="flex justify-between py-3 px-6 border d-theme-border-grey-light border-solid border-r-0 border-l-0 border-b-0"
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
    }
  },
  async mounted() {
    this.$refs.chatLogPS.$el.scrollTop = 0;
    this.search();
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
</style>
