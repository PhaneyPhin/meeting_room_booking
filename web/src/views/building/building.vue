<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">
    <!-- <edit-user :isSidebarActive="sideBarActive" :operator="edit_operator" @closeSidebar="sideBarActive = false" /> -->

    <vx-card>
      <!-- <pre>{{x}}</pre> -->
      <vs-tabs>
        <vs-tab :label="$t('Building Data')">
          <div class="mt-3">
            <vs-table stripe pagination max-items="10" search :data="buildings">
              <template slot="thead">
                <vs-th class="text-center" sort-key="building_id">{{$t('Building ID')}}</vs-th>
                <vs-th sort-key="building_name">{{$t('Building Name')}}</vs-th>
                <th class="text-center aligin-center" sort-key="num_floor">{{$t('Number of Floor')}}</th>
                <vs-th sort-key="address">{{$t('Address')}}</vs-th>

                <vs-th>{{$t("edit")}}</vs-th>
                <vs-th>{{$t("delete")}}</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
                  <vs-td :data="tr.building_id">
                    <div class="text-center" style="width:100px">{{tr.building_id}}</div>
                  </vs-td>

                  <vs-td :data="tr.building_name">{{ tr.building_name}}</vs-td>
                  <vs-td class="text-center aligin-center" :data="tr.num_floor">{{tr.num_floor}}</vs-td>
                  <vs-td
                    :data="tr.address"
                  >{{ tr.address +' '+tr['tambon_'+$i18n.locale]+' '+tr['amphur_'+$i18n.locale]+' '+tr['province_'+$i18n.locale] }}</vs-td>
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
                      @click="delete_building(tr)"
                    ></feather-icon>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-tab>
        <vs-tab :label="$t('Add Building')">
          <div class="container">
            <div class="mt-3">
              <div class="vx-row">
                <div class="vx-col sm:w-1/2 w-full mt-5">
                  <label for>{{$t('Building Name')}}</label>
                  <vs-input
                    v-model="editObj.building_name"
                    class="w-full"
                    :danger="invalid.building_name"
                  />
                  <div
                    class="errors"
                    v-if="invalid.building_name"
                  >{{$t("please input building name")}}</div>
                </div>
                <div class="vx-col sm:w-1/2 w-full mt-5">
                  <label for>{{$t('Address')}}</label>
                  <vs-input v-model="editObj.address" class="w-full" :danger="invalid.address" />
                  <div class="errors" v-if="invalid.address">{{$t("please input address")}}</div>
                </div>
                <div class="vx-col md:w-1/4 sm:w-1/2 w-full mt-5">
                  <label for>{{$t('Province')}}</label>
                  <vs-select class="w-full" v-model="editObj.province" :danger="invalid.province">
                    <vs-select-item
                      :key="index"
                      :value="item.val"
                      :text="item.name"
                      v-for="(item,index) in provinces_view"
                    />
                  </vs-select>
                  <div class="errors" v-if="invalid.province">{{$t("please select province")}}</div>
                </div>
                <div class="vx-col md:w-1/4 sm:w-1/2 w-full mt-5">
                  <label for>{{$t('District')}}</label>
                  <vs-select class="w-full" v-model="editObj.amphur" :danger="invalid.amphur">
                    <vs-select-item
                      :key="index"
                      :value="item.val"
                      :text="item.name"
                      v-for="(item,index) in amphurs_view"
                    />
                  </vs-select>
                  <div class="errors" v-if="invalid.amphur">{{$t("please select district")}}</div>
                </div>
                <div class="vx-col md:w-1/4 sm:w-1/2 w-full mt-5">
                  <label for>{{$t('Sub District')}}</label>
                  <vs-select class="w-full" v-model="editObj.tambon" :danger="invalid.tambon">
                    <vs-select-item
                      :key="index"
                      :value="item.val"
                      :text="item.name"
                      v-for="(item,index) in tambons_view"
                    />
                  </vs-select>
                  <div class="errors" v-if="invalid.tambon">{{$t("please select sub district")}}</div>
                </div>
                <div class="vx-col md:w-1/4 sm:w-1/2 w-full mt-5">
                  <label for>{{$t('PostCode')}}</label>
                  <vs-select class="w-full" v-model="editObj.admin_id" :danger="invalid.admin_id">
                    <vs-select-item
                      :key="index"
                      :value="item.admin_id"
                      :text="item.postcode"
                      v-for="(item,index) in postcodes"
                    />
                  </vs-select>
                  <div class="errors" v-if="invalid.tambon">{{$t("please select postcode")}}</div>
                </div>

                <div class="vx-col sm:w-1/2 md:1/3 w-full mt-5">
                  <label for>{{$t('Number of Floor')}}</label>
                  <vs-input
                    v-model="editObj.num_floor"
                    class="w-full"
                    :danger="invalid.num_floor"
                    @keypress="checkNumber"
                    maxlength="3"
                  />
                  <div class="errors" v-if="invalid.num_floor">{{$t("plese input floor number")}}</div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="vx-row">
                <div class="w-full">
                  <vs-button
                    color="danger"
                    class="right"
                    type="border"
                    @click="forceRerender()"
                  >{{$t('cancel')}}</vs-button>
                  <vs-button
                    ref="loadableButton"
                    id="button-with-loading"
                    class="vs-con-loading__container right"
                    vslor="primary"
                    @click="save"
                  >{{$t('save')}}</vs-button>
                </div>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
      <vs-popup class="holamundo" :title="$t('edit_title')" :active.sync="popupActive">
        <div class="mt-3">
          <div class="vx-row">
            <div class="vx-col w-full mt-5">
              <label for>{{$t('Building Name')}}</label>
              <vs-input
                v-model="editObj.building_name"
                class="w-full"
                :danger="invalid.building_name"
              />
              <div class="errors" v-if="invalid.building_name">{{$t("please input building name")}}</div>
            </div>
            <div class="vx-col w-full mt-5">
              <label for>{{$t('Address')}}</label>
              <vs-input v-model="editObj.address" class="w-full" :danger="invalid.address" />
              <div class="errors" v-if="invalid.address">{{$t("please input address")}}</div>
            </div>
            <div class="vx-col w-full mt-5">
              <label for>{{$t('Province')}}</label>
              <vs-select class="w-full" v-model="editObj.province" :danger="invalid.province">
                <vs-select-item
                  :key="index"
                  :value="item.val"
                  :text="item.name"
                  v-for="(item,index) in provinces_view"
                />
              </vs-select>
              <div class="errors" v-if="invalid.province">{{$t("please select province")}}</div>
            </div>
            <div class="vx-col w-full mt-5">
              <label for>{{$t('District')}}</label>
              <vs-select class="w-full" v-model="editObj.amphur" :danger="invalid.amphur">
                <vs-select-item
                  :key="index"
                  :value="item.val"
                  :text="item.name"
                  v-for="(item,index) in amphurs_view"
                />
              </vs-select>
              <div class="errors" v-if="invalid.amphur">{{$t("please select district")}}</div>
            </div>
            <div class="vx-col w-full mt-5">
              <label for>{{$t('Sub District')}}</label>
              <vs-select class="w-full" v-model="editObj.tambon" :danger="invalid.tambon">
                <vs-select-item
                  :key="index"
                  :value="item.val"
                  :text="item.name"
                  v-for="(item,index) in tambons_view"
                />
              </vs-select>
              <div class="errors" v-if="invalid.tambon">{{$t("please select sub district")}}</div>
            </div>
            <div class="vx-col w-full mt-5">
              <label for>{{$t('PostCode')}}</label>
              <vs-select class="w-full" v-model="editObj.admin_id" :danger="invalid.admin_id">
                <vs-select-item
                  :key="index"
                  :value="item.admin_id"
                  :text="item.postcode"
                  v-for="(item,index) in postcodes"
                />
              </vs-select>
              <div class="errors" v-if="invalid.tambon">{{$t("please select postcode")}}</div>
            </div>

            <div class="vx-col w-full mt-5">
              <label for>{{$t('Number of Floor')}}</label>
              <vs-input
                v-model="editObj.num_floor"
                class="w-full"
                :danger="invalid.num_floor"
                @keypress="checkNumber"
              />
              <div class="errors" v-if="invalid.num_floor">{{$t("plese input floor number")}}</div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <div class="vx-row">
            <div class="w-full">
              <vs-button
                ref="loadableButton"
                id="button-with-loading"
                class="vs-con-loading__container mr-4 ml-4"
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
      buildings: [],
      submitted: false,
      provinces: [],
      tambons: [],
      amphurs: [],
      postcodes: [],
      editObj: {}
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
      return require([
        "province",
        "tambon",
        "amphur",
        "admin_id",
        "building_name",
        "num_floor",
        "address"
      ]);
    },
    isInvald() {
      var invalid = false;
      for (var x in this.invalid) {
        if (this.invalid[x]) {
          invalid = true;
        }
      }
      return invalid;
    },
    provinces_view() {
      return this.provinces.map(item => {
        return {
          val: item.province_en,
          name: item["province_" + this.$i18n.locale]
        };
      });
    },
    amphurs_view() {
      return this.amphurs.map(item => {
        return {
          val: item.amphur_en,
          name: item["amphur_" + this.$i18n.locale]
        };
      });
    },
    tambons_view() {
      return this.tambons.map(item => {
        return {
          val: item.tambon_en,
          name: item["tambon_" + this.$i18n.locale]
        };
      });
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
        admin_id: "",
        tambon: "",
        amphur: "",
        province: "",
        building_name: "",
        num_floor: "",
        address: ""
      };
    },
    checkNumber(e) {
      var checkNumber = window.checkNumber(e);
      if (!checkNumber) {
        e.preventDefault();
      }
    },
    async getdata() {
      try {
        var buildingReponse = await service.postData(
          "building/getBuilding",
          {}
        );
        this.buildings = buildingReponse.data;
        var provinceResponse = await service.postData("building/getLocation", {
          province: "all",
          amphur: "",
          tambon: "",
          postcode: ""
        });
        this.provinces = provinceResponse.data;
      } catch (e) {}
    },
    edit(tr) {
      this.editing = true;
      this.popupActive = true;
      this.editObj = {
        building_id: tr.building_id,
        building_name: tr.building_name,
        num_floor: tr.num_floor,
        province: tr.province_en,
        amphur: tr.amphur_en,
        tambon: tr.tambon_en,
        admin_id: tr.admin_id,
        address: tr.address
      };
      console.log(this.editObj);
      this.getAmphur();
      this.getTambon();
      this.getPostCode();
      this.editing = false;
    },
    async save() {
      this.submitted = true;
      if (!this.isInvald) {
        try {
          await service.postData("building/addBuilding", this.editObj);
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
          await service.postData("building/updateBuilding", this.editObj);
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
    async delete_building(tr) {
      var result = await this.$swal({
        title: this.$t("Are your sure to delete this building?"),
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
            return await service.postData("/building/deleteBuilding", tr);
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
    },
    async getAmphur() {
      var Response = await service.postData("building/getLocation", {
        province: this.editObj.province,
        amphur: "all",
        tambon: "",
        postcode: ""
      });
      this.amphurs = Response.data;
    },
    async getTambon() {
      var Response = await service.postData("building/getLocation", {
        province: this.editObj.province,
        amphur: this.editObj.amphur,
        tambon: "all",
        postcode: ""
      });
      this.tambons = Response.data;
    },
    async getPostCode() {
      var Response = await service.postData("building/getLocation", {
        province: this.editObj.province,
        amphur: this.editObj.amphur,
        tambon: this.editObj.tambon,
        postcode: "all"
      });

      this.postcodes = Response.data;
      if (this.postcodes.length == 1) {
        this.editObj.admin_id = this.postcodes[0].admin_id;
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

