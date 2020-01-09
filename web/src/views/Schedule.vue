<template>
  <div class="w-full mb-base">
    <vx-card>
      <h6>{{ $t("Schedule Table") }}</h6>
      <div class="vx-row mb-10">
        <div class="vx-col md:w-1/3 sm:w-1/2 w-full mt-6">
          <label>{{ $t("Building") }}</label>
          <vs-select class="w-full" v-model="editObj.building_id" :danger="invalid.building_id">
            <vs-select-item
              :key="index"
              :value="item.building_id"
              :text="$t(item.building_name)"
              v-for="(item, index) in buildings"
            />
          </vs-select>
          <div class="errors" v-if="invalid.building_id">{{ $t("please select the buildign") }}</div>
        </div>
        <div class="vx-col md:w-1/3 sm:w-1/2 w-full mt-6">
          <label>{{ $t("room") }}</label>
          <vs-select class="w-full" v-model="editObj.room_id" :danger="invalid.room_id">
            <vs-select-item
              :key="index"
              :value="item.room_id"
              :text="$t(item.room_name)"
              v-for="(item, index) in rooms"
            />
          </vs-select>
          <div class="errors" v-if="invalid.room_id">{{ $t("please select the room_id") }}</div>
        </div>
        <div class="vx-col md:w-1/3 w-full mt-6">
          <div class="vx-row md:pl-0 md:pr-10 pl-4 pr-4">
            <vs-button
              ref="loadableButton"
              id="button-with-loading"
              class="vs-con-loading__container mt-5 sm:w-1/2 md:w-full lg:w-1/2 w-full"
              vslor="primary"
              @click="search()"
            >{{ $t("search") }}</vs-button>
          </div>
        </div>
      </div>
      <JqxScheduler
        v-if="rerender"
        ref="myScheduler"
        :date="date"
        width="100%"
        height="800"
        :source="source"
        :view="'weekView'"
        :showLegend="true"
        :resources="resources"
        :appointmentDataFields="appointmentDataFields"
        :views="views"
        :editDialogOpen="editDialogOpen"
        :disabled="true"
        :theme="'material'"
      />
    </vx-card>
  </div>
</template>
<style scoped>
.jqx-fill-state-disabled {
  cursor: default;
  color: #000;
  opacity: 1;
  filter: Alpha(Opacity=45);
}
</style>
<script>
import JqxScheduler from "jqwidgets-scripts/jqwidgets-vue/vue_jqxscheduler.vue";
import service from "@/service/service";
import { async } from "q";
import moment from "moment";
export default {
  components: {
    JqxScheduler
  },
  data: function() {
    return {
      rerender: false,
      submitted: false,
      editObj: { building_id: "", room_id: "" },
      buildings: [],
      rooms: [],
      date: new jqx.date(),
      source: new jqx.dataAdapter(this.source),
      resources: {
        colorScheme: "scheme05",
        dataField: "calendar",
        source: new jqx.dataAdapter(this.source)
      },
      appointmentDataFields: {
        from: "start",
        to: "end",
        id: "id",
        description: "description",
        location: "place",
        subject: "subject",
        resourceId: "calendar",
        background: "background"
      },
      views: ["dayView", "weekView", "monthView", "agendaView"]
    };
  },
  beforeCreate: async function() {
    this.editObj = { building_id: "", room_id: "" };
    var appointments = new Array();

    this.source = {
      dataType: "array",
      dataFields: [
        { name: "id", type: "string" },
        { name: "description", type: "string" },
        { name: "location", type: "string" },
        { name: "subject", type: "string" },
        { name: "calendar", type: "string" },
        { name: "start", type: "date" },
        { name: "end", type: "date" },
        { name: "background", type: "string" }
      ],
      id: "id",
      localData: appointments
    };
  },
  async created() {
    var result = await service.postData("building/getBuilding", {});
    this.buildings = result.data;
  },
  computed: {
    invalid() {
      var require = x => this.editObj[x] == "" && this.submitted;
      return {
        building_id: require("building_id"),
        room_id: require("room_id")
      };
    },
    isInvalid() {
      return this.invalid.building_id || this.invalid.room_id;
    }
  },
  mounted: function() {
    var appointments = new Array();
    this.schedule(appointments);
  },
  methods: {
    editDialogOpen: function(dialog, fields, editAppointment) {
      // this.$refs.myScheduler("closeDialog");
    },
    serperateDate(date) {
      var year = moment(date, "YYYY-MM-DD HH:mm:ss").years();
      var month = moment(date, "YYYY-MM-DD HH:mm:ss").months();
      var day = moment(date, "YYYY-MM-DD HH:mm:ss").dates();
      var hour = moment(date, "YYYY-MM-DD HH:mm:ss").hours();
      var minute = moment(date, "YYYY-MM-DD HH:mm:ss").minutes();
      var second = moment(date, "YYYY-MM-DD HH:mm:ss").seconds();
      return new Date(year, month, day, hour, minute, second);
    },
    async search() {
      this.submitted = true;
      if (!this.isInvalid) {
        var respose = await service.postData("get_room_booking", this.editObj);
        var bookings = respose.data;
        var appointments = new Array();
        bookings.forEach(data => {
          // var { year, month, day, hour, minute, second } = this.serperateDate(
          //   data.start_date
          // );
          // var start_date = new Date(year, month, day, hour, minute, second);
          // var end = this.serperateDate(
          //   data.end_date
          // );
          // var end_date = new Date(year, month, day, hour, minute, second);
          appointments.push({
            id: "id3",
            subject:
              data.first_name + " " + data.last_name + " : " + data.subject,
            calendar: this.editObj.room_id,
            start: this.serperateDate(data.start_date),
            end: this.serperateDate(data.end_date),
            background: "#00FF00"
          });
        });
        console.log(appointments);
        this.schedule(appointments);
      }
    },
    schedule(data) {
      this.rerender = false;
      this.$nextTick(() => {
        this.rerender = true;
        this.source = {
          dataType: "array",
          dataFields: [
            { name: "id", type: "string" },
            { name: "description", type: "string" },
            { name: "location", type: "string" },
            { name: "subject", type: "string" },
            { name: "calendar", type: "string" },
            { name: "start", type: "date" },
            { name: "end", type: "date" },
            { background: "background" }
          ],
          id: "id",
          localData: data
        };
        this.ource = new jqx.dataAdapter(this.source);
        this.resources = {
          colorScheme: "scheme05",
          dataField: "calendar",
          source: new jqx.dataAdapter(this.source)
        };
        this.$nextTick(() => {
          this.$refs.myScheduler.ensureAppointmentVisible("id1");
        });
      });
    }
  },
  watch: {
    async "editObj.building_id"(val) {
      this.editObj.room_id = "";

      var result = await service.postData("getRoomByBuilding", {
        building_id: this.editObj.building_id
      });
      this.rooms = result.data;
    }
  }
};
</script>
