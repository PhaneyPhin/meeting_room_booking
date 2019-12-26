<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">
    <!-- <edit-user :isSidebarActive="sideBarActive" :operator="edit_operator" @closeSidebar="sideBarActive = false" /> -->

    <vx-card>
      <!-- <pre>{{x}}</pre> -->
      <vs-tabs>
        <vs-tab :label="$t('Officer Data')">
          <div class="mt-3">
            <vs-table stripe pagination max-items="10" search :data="departments">
              <template slot="thead">
                <vs-th class="text-center" sort-key="department_id">{{$t('Officer ID')}}</vs-th>
                <vs-th sort-key="department_name_th">{{$t("Officer's Thai Name")}}</vs-th>
                <th
                  class="text-center aligin-center"
                  sort-key="department_name_en"
                >{{$t("Officer's English Name")}}</th>

                <vs-th>{{$t("edit")}}</vs-th>
                <vs-th>{{$t("delete")}}</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
                  <vs-td :data="tr.department_id">
                    <div class="text-center" style="width:100px">{{tr.department_id}}</div>
                  </vs-td>

                  <vs-td :data="tr.department_name_th">{{ tr.department_name_th}}</vs-td>
                  <vs-td
                    class="text-center aligin-center"
                    :data="tr.department_name_en"
                  >{{tr.department_name_en}}</vs-td>

                  <vs-td>
                    <feather-icon
                      icon="EditIcon"
                      class="cursor-pointer w-6 h-6 text-warning"
                      size="small"
                      @click="edit(tr)"
                    ></feather-icon>
                  </vs-td>
                  <vs-td>
                    <feather-icon
                      icon="Trash2Icon"
                      class="cursor-pointer w-6 h-6 text-danger"
                      size="small"
                      @click="delete_department(tr)"
                    ></feather-icon>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-tab>
        <vs-tab :label="$t('Add Officer')">
          <div class="mt-3">
            <div class="container">
              <div class="vx-row">
                <div class="vx-col md:w-full mt-5">
                  <label for>{{$t("Officer's Thai Name")}}</label>
                  <vs-input
                    v-model="editObj.department_name_th"
                    class="w-full"
                    :danger="invalid.department_name_th"
                  />
                  <div
                    class="errors"
                    v-if="invalid.department_name_th"
                  >{{$t("Please input Officer's Thai Name")}}</div>
                </div>
                <div class="vx-col md:w-full mt-5">
                  <label for>{{$t("Officer's English Name")}}</label>
                  <vs-input
                    v-model="editObj.department_name_en"
                    class="w-full"
                    :danger="invalid.department_name_en"
                  />
                  <div
                    class="errors"
                    v-if="invalid.department_name_en"
                  >{{$t("Please input Officer's English Name")}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="container mt-5">
            <div class="vx-row">
              <div class="w-full">
                <vs-button
                  ref="loadableButton"
                  id="button-with-loading"
                  class="vs-con-loading__container mr-5 ml-4"
                  vslor="primary"
                  @click="save"
                >{{$t('save')}}</vs-button>
                <vs-button color="danger" type="border" @click="forceRerender()">{{$t('cancel')}}</vs-button>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
      <vs-popup class="holamundo" :title="$t('edit_title')" :active.sync="popupActive">
        <div class="vx-row">
          <div class="vx-col md:w-full mt-5">
            <label for>{{$t("Officer ID")}}</label>
            <vs-input v-model="editObj.department_id" class="w-full" disabled />
          </div>
          <div class="vx-col md:w-full mt-5">
            <label for>{{$t("Officer's Thai Name")}}</label>
            <vs-input
              v-model="editObj.department_name_th"
              class="w-full"
              :danger="invalid.department_name_th"
            />
            <div
              class="errors"
              v-if="invalid.department_name_th"
            >{{$t("Please input Officer's Thai Name")}}</div>
          </div>
          <div class="vx-col md:w-full mt-5">
            <label for>{{$t("Officer's English Name")}}</label>
            <vs-input
              v-model="editObj.department_name_en"
              class="w-full"
              :danger="invalid.department_name_en"
            />
            <div
              class="errors"
              v-if="invalid.department_name_en"
            >{{$t("Please input Officer's English Name")}}</div>
          </div>
        </div>
        <div class="mt-5">
          <div class="vx-row">
            <div class="w-full">
              <vs-button
                ref="loadableButton"
                id="button-with-loading"
                class="vs-con-loading__container mr-4 ml-8"
                vslor="primary"
                @click="save_edit"
              >{{$t('save')}}</vs-button>
              <vs-button color="danger" type="border" @click="popupActive=false">{{$t('cancel')}}</vs-button>
            </div>
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
</style>


<script>
import Datepicker from "vuejs-datepicker";
import service from "@/service/service";
import EditUser from "../extra-components/edit-user.vue";
// import ViewData from './view/ViewData.vue';
import moment from "moment";
import { async } from "q";
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
      colorLoading: "#ff8000",
      renderComponent: true,
      sideBarActive: false,
      editing: false,
      popupActive: false,
      departments: [],
      submitted: false,
      editObj: {
        department_name_th: "",
        department_name_en: ""
      }
    };
  },

  computed: {
    invalid() {
      var require = types => {
        var obj = {};
        types.forEach(x => {
          if (this.editObj[x] == "" && this.submitted) {
            obj[x] = true;
          } else {
            obj[x] = false;
          }
        });
        return obj;
      };
      return require(["department_name_th", "department_name_en"]);
    },
    isInvald() {
      var invalid = false;
      for (var x in this.invalid) {
        if (this.invalid[x]) {
          invalid = true;
        }
      }
      return invalid;
    }
  },
  created() {
    this.getdata();
    this.initVal();
  },
  methods: {
    initVal() {
      this.submitted = false;
      this.popupActive = false;

      this.editObj = {
        department_name_en: "",
        department_name_th: ""
      };
    },

    async getdata() {
      try {
        var response = await service.postData("department/getDepartment", {});
        this.departments = response.data;
      } catch (e) {}
    },
    edit(tr) {
      this.editObj = { ...tr };
      this.popupActive = true;
    },
    async save() {
      this.submitted = true;
      if (!this.isInvald) {
        try {
          await service.postData("department/createDepartment", this.editObj);
          await this.$swal(this.$t("success_title"), "", "success");
          this.getdata();
          this.forceRerender();
        } catch (e) {
          console.log(e);
        }
      }
    },
    async save_edit() {
      this.submitted = true;
      if (!this.isInvald) {
        this.$vs.loading({ color: this.colorLoading });

        try {
          await service.postData("department/updateDepartment", this.editObj);
          this.popupActive = false;
          this.$vs.loading.close();
          await this.$swal(this.$t("success_title"), "", "success");
          this.getdata();
          this.forceRerender();
        } catch (e) {
          console.log("catching error");
          this.popupActive = false;
          this.$vs.loading.close();
          await this.$swal("error", e.message, "error");
          this.popupActive = true;
          console.log(e);
        }
      }
    },
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.initVal();
        this.renderComponent = true;
      });
    },
    async delete_department(tr) {
      var result = await this.$swal({
        title: this.$t("Are you sure to delete this officer?"),
        text: this.$t("delete_text"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("cancel"),
        confirmButtonText: this.$t("confirm_delete"),
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            return await service.postData("/department/deleteDepartment", tr);
          } catch (e) {
            return e;
          }
        }
      });
      if (result.value) {
        if (result.value.code == 1) {
          await this.$swal(this.$t("deleted_title"), "", "success");
          this.getdata();
          this.forceRerender();
          this.initVal();
        } else {
          await this.$swal(this.$t("error"), result.value.message, "error");
        }
      }
    }
  },
  watch: {
    popupActive(val) {
      if (!val) {
        this.initVal();
      }
    },
    async "editObj.province"(val) {
      if (val != "" && !this.editing) {
        this.editObj.postcode = "";
        this.getAmphur();
      }
    },
    async "editObj.amphur"(val) {
      if (val != "" && !this.editing) {
        this.getTambon();
      }
    },
    async "editObj.tambon"(val) {
      if (val != "" && !this.editing) {
        this.getPostCode();
      }
    }
  }
};
</script>

