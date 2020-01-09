<template>
  <div class="vx-col" v-if="renderComponent">
    <!-- <edit-user :isSidebarActive="sideBarActive" :operator="edit_operator" @closeSidebar="sideBarActive = false" /> -->

    <vx-card>
      <!-- <pre>{{x}}</pre> -->
      <vs-tabs>
        <vs-tab :label="$t('room_data')">
          <div class="mt-3">
            <vs-table stripe pagination max-items="10" search :data="rooms">
              <template slot="thead">
                <vs-th sort-key="room_id">{{ $t("room_id") }}</vs-th>
                <vs-th sort-key="building_name">
                  {{
                  $t("Building Name")
                  }}
                </vs-th>
                <vs-th sort-key="room_name">{{ $t("room_name") }}</vs-th>
                <vs-th sort-key="num_chair">{{ $t("num_chair") }}</vs-th>
                <vs-th sort-key="num_table">{{ $t("num_table") }}</vs-th>

                <vs-th>{{ $t("edit") }}</vs-th>
                <vs-th>{{ $t("delete") }}</vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
                  <vs-td :data="tr.room_id">{{ tr.room_id }}</vs-td>
                  <vs-td :data="tr.building_name">{{ tr.building_name }}</vs-td>
                  <vs-td :data="tr.room_name">{{ tr.room_name }}</vs-td>
                  <vs-td :data="tr.num_chair">{{ tr.num_chair }}</vs-td>
                  <vs-td :data="tr.num_table">{{ tr.num_table }}</vs-td>
                  <vs-td>
                    <feather-icon
                      icon="EditIcon"
                      class="cursor-pointer w-6 h-6 text-warning"
                      size="small"
                      @click="
                        editObj = tr;
                        popupActive = true;
                      "
                    ></feather-icon>
                  </vs-td>
                  <vs-td>
                    <feather-icon
                      icon="Trash2Icon"
                      class="cursor-pointer w-6 h-6 text-danger"
                      size="small"
                      @click="delete_room(tr)"
                    ></feather-icon>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-tab>
        <vs-tab :label="$t('add_room')">
          <div class="container">
            <div class="vx-row">
              <div class="vx-col md:w-1/3 sm:w-1/2 w-full mt-5">
                <label>
                  {{ $t("room_name") }}
                  <span class="require">*</span>
                </label>
                <vs-input v-model="editObj.room_name" class="w-full" :danger="invalid.room_name" />
                <div class="errors" v-if="invalid.room_name">{{ $t("alert_room_name") }}</div>
              </div>
              <div class="vx-col md:w-1/3 sm:w-1/2 w-full mt-5">
                <label>
                  {{ $t("num_chair") }}
                  <span class="require">*</span>
                </label>
                <vs-input
                  v-model="editObj.num_chair"
                  class="w-full"
                  :danger="invalid.num_chair"
                  @keypress="checkNumber"
                />
                <div class="errors" v-if="invalid.num_chair">{{ $t("alert_num_chair") }}</div>
              </div>
              <div class="vx-col md:w-1/3 sm:w-1/2 w-full mt-5">
                <label>
                  {{ $t("Floor") }}
                  <span class="require">*</span>
                </label>
                <vs-input
                  v-model="editObj.floor"
                  class="w-full"
                  :danger="invalid.floor"
                  maxlength="3"
                  @keypress="checkNumber"
                />
                <div class="errors" v-if="invalid.floor">{{ $t("please input floor") }}</div>
              </div>

              <div class="vx-col md:w-1/4 sm:w-1/2 w-full mt-5 mt-5">
                <label>
                  {{ $t("num_table") }}
                  <span class="require">*</span>
                </label>
                <vs-input
                  v-model="editObj.num_table"
                  class="w-full"
                  :danger="invalid.num_table"
                  @keypress="checkNumber"
                />
                <div class="errors" v-if="invalid.num_table">{{ $t("alert_num_table") }}</div>
              </div>
              <div class="vx-col md:w-1/4 sm:w-1/2 w-full mt-5 mt-5">
                <label for>{{ $t("Building Name") }}</label>
                <vs-select
                  class="w-full"
                  v-model="editObj.building_id"
                  :danger="invalid.building_id"
                >
                  <vs-select-item
                    :key="index"
                    :value="item.building_id"
                    :text="item.building_name"
                    v-for="(item, index) in buildings"
                  />
                </vs-select>
                <div class="errors" v-if="invalid.building_id">{{ $t("Please select building ") }}</div>
              </div>
              <div class="vx-col md:w-1/4 sm:w-1/2 w-full mt-5 mt-5">
                <label for>{{ $t("Room Status") }}</label>
                <vs-select class="w-full" v-model="editObj.status" :danger="invalid.status">
                  <vs-select-item
                    :key="index"
                    :value="item"
                    :text="$t(item)"
                    v-for="(item, index) in room_status"
                  />
                </vs-select>
                <div class="errors" v-if="invalid.status">{{ $t("Please select status ") }}</div>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-full mt-5">
                <vs-checkbox v-model="editObj.approvement">
                  {{
                  $t("Require Approvement")
                  }}
                </vs-checkbox>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-full mt-5">
                <vs-button
                  color="danger"
                  class="right"
                  type="border"
                  @click="forceRerender()"
                >{{ $t("cancel") }}</vs-button>
                <vs-button
                  ref="loadableButton"
                  id="button-with-loading"
                  class="vs-con-loading__container right"
                  vslor="primary"
                  @click="save"
                >{{ $t("save") }}</vs-button>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
      <vs-popup class="holamundo" :title="$t('edit_title')" :active.sync="popupActive">
        <div class="vx-row">
          <div class="vx-col w-full mt-5">
            <label>
              {{ $t("room_name") }}
              <span class="require">*</span>
            </label>
            <vs-input v-model="editObj.room_name" class="w-full" :danger="invalid.room_name" />
            <div class="errors" v-if="invalid.room_name">{{ $t("alert_room_name") }}</div>
          </div>
          <div class="vx-col w-full mt-5">
            <label>
              {{ $t("Floor") }}
              <span class="require">*</span>
            </label>
            <vs-input
              v-model="editObj.floor"
              class="w-full"
              :danger="invalid.floor"
              @keypress="checkNumber"
            />
            <div class="errors" v-if="invalid.floor">{{ $t("please input floor") }}</div>
          </div>
          <div class="vx-col w-full mt-5">
            <label>
              {{ $t("num_chair") }}
              <span class="require">*</span>
            </label>
            <vs-input
              v-model="editObj.num_chair"
              class="w-full"
              :danger="invalid.num_chair"
              @keypress="checkNumber"
            />
            <div class="errors" v-if="invalid.num_chair">{{ $t("alert_num_chair") }}</div>
          </div>
          <div class="vx-col w-full mt-5">
            <label>
              {{ $t("num_table") }}
              <span class="require">*</span>
            </label>
            <vs-input
              v-model="editObj.num_table"
              class="w-full"
              :danger="invalid.num_table"
              @keypress="checkNumber"
            />
            <div class="errors" v-if="invalid.num_table">{{ $t("alert_num_table") }}</div>
          </div>
          <div class="vx-col w-full mt-5">
            <label for>{{ $t("Building Name") }}</label>
            <vs-select class="w-full" v-model="editObj.building_id" :danger="invalid.building_id">
              <vs-select-item
                :key="index"
                :value="item.building_id"
                :text="item.building_name"
                v-for="(item, index) in buildings"
              />
            </vs-select>
            <div class="errors" v-if="invalid.building_id">{{ $t("Please select building ") }}</div>
          </div>
          <div class="vx-col w-full mt-5">
            <label for>{{ $t("Room Status") }}</label>
            <vs-select class="w-full" v-model="editObj.status" :danger="invalid.status">
              <vs-select-item
                :key="index"
                :value="item"
                :text="$t(item)"
                v-for="(item, index) in room_status"
              />
            </vs-select>
            <div class="errors" v-if="invalid.status">{{ $t("Please select status ") }}</div>
          </div>
          <div class="vx-col w-full mt-5">
            <vs-checkbox v-model="editObj.approvement">
              {{
              $t("Require Approvement")
              }}
            </vs-checkbox>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mt-5">
            <vs-button
              color="danger"
              class="right"
              type="border"
              @click="popupActive = false"
            >{{ $t("cancel") }}</vs-button>
            <vs-button
              ref="loadableButton"
              id="button-with-loading1"
              class="vs-con-loading__container right"
              vslor="primary"
              @click="save_edit"
            >{{ $t("save") }}</vs-button>
          </div>
        </div>
      </vs-popup>
    </vx-card>
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
      editing: false,
      change_password: false,
      renderComponent: true,
      popupActive: false,
      rooms: [],
      roles: [],
      submitted: false,
      buildings: [],
      editObj: {
        room_name: "",
        num_chair: "",
        num_table: "",
        building_id: "",
        floor: "",
        status: ""
      },
      room_status: ["normal using", "repair", "cancel using"]
    };
  },

  computed: {
    invalid() {
      var require = type =>
        this.submitted &&
        (this.editObj[type] == "" || this.editObj[type] == null);
      return {
        room_name: require("room_name"),
        num_chair: require("num_chair"),
        num_table: require("num_table"),
        building_id: require("building_id"),
        floor: require("floor"),
        status: require("status")
      };
    },
    isInvald() {
      return (
        this.invalid.room_name ||
        this.invalid.num_chair ||
        this.invalid.num_table ||
        this.invalid.building_id ||
        this.invalid.floor ||
        this.invalid.status
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
      this.popupActive = false;
      this.editObj = {
        room_name: "",
        num_chair: "",
        num_table: "",
        building_id: "",
        floor: "",
        approvement: false
      };
    },
    checkNumber(e) {
      var checkNumber = window.checkNumber(e);
      if (!checkNumber) {
        e.preventDefault();
      }
    },
    delete_room(room) {
      this.$swal({
        title: this.$t("delete_room_title"),
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
            .postData("/delete_room", { room_id: room.room_id })
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
    async getdata() {
      try {
        var result = await service.postData("/get_room", {});
        this.rooms = result.data;
        result = await service.postData("/building/getBuilding", {});
        this.buildings = result.data;
      } catch (e) {
        this.$swal(this.$t("error", e.message, "error"));
      }
    },
    forceRerender() {
      this.renderComponent = false;
      this.initVal();
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    async save() {
      this.submitted = true;
      console.table(this.editObj);
      if (!this.isInvald) {
        this.submitted = false;
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

        try {
          var result = await service.postData("/add_room", this.editObj);

          await this.$swal(this.$t("success_title"), "", "success");
          this.getdata();
          this.forceRerender();
        } catch (e) {
          console.log(e);
          await this.$swal("error", e.message, "error");
        }
        this.$vs.loading.close("#button-with-loading > .con-vs-loading");
        this.popupActive = false;
      }
    },
    async save_edit() {
      this.submitted = true;
      console.table(this.editObj);
      if (!this.isInvald) {
        this.submitted = false;
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

        try {
          var result = await service.postData("/update_room", this.editObj);
          this.popupActive = false;
          await this.$swal(this.$t("success_title"), "", "success");
          this.getdata();
          this.forceRerender();
        } catch (e) {
          console.log(e);
          this.editing = true;
          this.$vs.loading.close("#button-with-loading1 > .con-vs-loading");
          this.popupActive = false;

          await this.$swal("error", e.message, "error");

          this.popupActive = true;
          this.editing = false;
        }
      }
    }
  },
  watch: {
    popupActive(val) {
      if (!val && !this.editing) {
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
