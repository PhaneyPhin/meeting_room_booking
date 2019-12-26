<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">
    <!-- <edit-user :isSidebarActive="sideBarActive" :operator="edit_operator" @closeSidebar="sideBarActive = false" /> -->

    <vx-card>
      <!-- <pre>{{x}}</pre> -->
      <vs-tabs>
        <vs-tab :label="$t('Material Data')">
          <div class="mt-3">
            <vs-table stripe pagination max-items="10" search :data="materials">
              <template slot="thead">
                <vs-th sort-key="material_id">{{$t('material_id')}}</vs-th>
                <vs-th sort-key="material_name">{{$t('material_name')}}</vs-th>
                <vs-th sort-key="material_price">{{$t('material_price')}}</vs-th>

                <vs-th>{{$t("edit")}}</vs-th>
                <vs-th>{{$t("delete")}}</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
                  <vs-td :data="tr.material_id">{{tr.material_id}}</vs-td>

                  <vs-td :data="tr.material_name">{{ tr.material_name}}</vs-td>
                  <vs-td :data="tr.material_price">{{tr.material_price}}</vs-td>
                  <vs-td>
                    <feather-icon
                      icon="EditIcon"
                      class="cursor-pointer w-6 h-6 text-warning"
                      size="small"
                      @click="editObj=tr;popupActive=true"
                    ></feather-icon>
                  </vs-td>
                  <vs-td>
                    <feather-icon
                      icon="Trash2Icon"
                      class="cursor-pointer w-6 h-6 text-danger"
                      size="small"
                      @click="delete_material(tr)"
                    ></feather-icon>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-tab>
        <vs-tab :label="$t('Add Material')">
          <div class="vx-row">
            <div class="vx-col md:w-1/3 mt-5">
              <label>
                {{$t('material_name')}}
                <span class="require">*</span>
              </label>
              <vs-input
                v-model="editObj.material_name"
                class="w-full"
                :danger="invalid.material_name"
              />
              <div class="errors" v-if="invalid.material_name">{{$t("alert_material_name")}}</div>
            </div>
            <div class="vx-col md:w-1/3 mt-5">
              <label>
                {{$t('material_price')}}
                <span class="require">*</span>
              </label>
              <vs-input
                v-model="editObj.material_price"
                class="w-full"
                :danger="invalid.material_price"
              />
              <div class="errors" v-if="invalid.material_price">{{$t("alert_material_price")}}</div>
            </div>
          </div>
          <div>
            <div class="vx-row">
              <div class="vx-col w-full mt-5">
                <vs-button
                  ref="loadableButton"
                  id="button-with-loading"
                  class="vs-con-loading__container"
                  style="margin-right:10px"
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
        <div class="vx-col md:w-full mt-3">
          <label>
            {{$t('material_id')}}
            <span class="require">*</span>
          </label>
          <vs-input
            v-model="editObj.material_id"
            class="w-full"
            :danger="invalid.material_id"
            :disabled="true"
          />
          <div class="errors" v-if="invalid.material_id">{{$t("alert_material_id")}}</div>
        </div>
        <div class="vx-col md:w-full mt-3">
          <label>
            {{$t('material_name')}}
            <span class="require">*</span>
          </label>
          <vs-input v-model="editObj.material_name" class="w-full" :danger="invalid.material_name" />
          <div class="errors" v-if="invalid.material_name">{{$t("alert_material_name")}}</div>
        </div>
        <div class="vx-col md:w-full mt-3">
          <label>
            {{$t('material_price')}}
            <span class="require">*</span>
          </label>
          <vs-input
            v-model="editObj.material_price"
            class="w-full"
            :danger="invalid.material_price"
          />
          <div class="errors" v-if="invalid.material_price">{{$t("alert_material_price")}}</div>
        </div>

        <div class="vx-col md:w-full mt-5">
          <vs-button
            class="right"
            color="danger"
            type="border"
            @click="popupActive=false"
          >{{$t('cancel')}}</vs-button>
          <vs-button
            ref="loadableButton"
            id="button-with-loading"
            class="vs-con-loading__container right"
            vslor="primary"
            @click="edit()"
          >{{$t('save')}}</vs-button>
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
      change_password: false,
      renderComponent: true,
      sideBarActive: false,
      popupActive: false,
      materials: [],
      roles: [],
      submitted: false,
      editObj: {}
    };
  },

  computed: {
    invalid() {
      var require = type => this.submitted && this.editObj[type] == "";
      return {
        material_name: require("material_name"),
        material_price: require("material_price")
      };
    },
    isInvald() {
      var invalid = this.invalid;
      return invalid.material_name || invalid.material_price;
    }
  },
  created() {
    this.getdata();
    this.initVal();
  },
  methods: {
    checkEnglish(e) {
      //  return false;
      var checkEnglish = window.checkEnglish(e);
      if (!checkEnglish) {
        e.preventDefault();
      }
    },
    initVal() {
      this.submitted = false;
      (this.change_password = false), (this.popupActive = false);
      this.editObj = {
        material_id: "",
        material_name: "",
        material_price: ""
      };
    },
    edit() {
      this.submitted = true;
      if (!this.isInvald) {
        this.popupActive = false;
        service.postData("material/update", this.editObj).then(result => {
          this.$swal(this.$t("success_title"), "", "success").then(result => {
            this.getdata();
            this.forceRerender();
            this.initVal();
          });
        });
      }
    },
    delete_material(material) {
      this.$swal({
        title: this.$t("delete_material_title"),
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
            .postData("/material/delete", { material_id: material.material_id })
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
    getdata() {
      service.postData("/material/get", {}).then(result => {
        this.materials = result.data;
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
        service.postData("/material/create", this.editObj).then(result => {
          this.$swal(this.$t("success_title"), "", "success").then(result => {
            this.getdata();
            this.forceRerender();
            this.initVal();
          });
        });
      }
    }
  },
  watch: {
    popupActive(val) {
      if (!val) {
        this.initVal();
      }
    }
  }
};
</script>

