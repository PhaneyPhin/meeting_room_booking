<template>
  <div class="vx-col w-full mb-base" v-if="renderComponent">
    <!-- <edit-user :isSidebarActive="sideBarActive" :operator="edit_operator" @closeSidebar="sideBarActive = false" /> -->

    <vx-card>
      <!-- <pre>{{x}}</pre> -->
      <vs-tabs>
        <vs-tab :label="$t('user_data')">
          <div class="mt-3">
            <vs-table stripe pagination max-items="10" search :data="users">
              <template slot="thead">
                <vs-th sort-key="index">{{ $t("username") }}</vs-th>
                <vs-th sort-key="first_name">{{ $t("first_name") }}</vs-th>
                <vs-th sort-key="last_name">{{ $t("last_name") }}</vs-th>
                <vs-th sort-key="email">{{ $t("email") }}</vs-th>
                <vs-th sort-key="role_name">{{ $t("role") }}</vs-th>

                <vs-th>{{ $t("edit") }}</vs-th>
                <vs-th>{{ $t("delete") }}</vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
                  <vs-td :data="tr.username">{{ tr.username }}</vs-td>

                  <vs-td :data="tr.first_name">{{ tr.first_name }}</vs-td>
                  <vs-td :data="tr.last_name">{{ tr.last_name }}</vs-td>
                  <vs-td :data="tr.last_name">{{ tr.email }}</vs-td>

                  <vs-td :data="tr.role_name">{{ $t(tr.role_name) }}</vs-td>

                  <vs-td>
                    <feather-icon
                      icon="EditIcon"
                      class="cursor-pointer w-6 h-6 text-warning"
                      size="small"
                      @click="
                        editObj = {...tr};
                        src_img = tr.img_profile;
                        popupActive = true;
                      "
                    ></feather-icon>
                  </vs-td>
                  <vs-td>
                    <feather-icon
                      icon="Trash2Icon"
                      class="cursor-pointer w-6 h-6 text-danger"
                      size="small"
                      @click="delete_user(tr)"
                    ></feather-icon>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-tab>
        <vs-tab :label="$t('add_user')">
          <div class="container">
            <div class="vx-row">
              <div class="vx-col md:w-2/3 sm:w-full lg:w-2/3 w-full">
                <div class="vx-row">
                  <div class="vx-col lg:w-1/3 md:w-1/2 sm:w-1/2 w-full mt-5">
                    <label>
                      {{ $t("first_name") }}
                      <span class="require">*</span>
                    </label>
                    <vs-input
                      v-model="editObj.first_name"
                      class="w-full"
                      :danger="invalid.first_name"
                    />
                    <div class="errors" v-if="invalid.first_name">{{ $t("alert_first_name") }}</div>
                  </div>
                  <div class="vx-col lg:w-1/3 md:w-1/2 sm:w-1/2 w-full mt-5">
                    <label>
                      {{ $t("last_name") }}
                      <span class="require">*</span>
                    </label>
                    <vs-input
                      v-model="editObj.last_name"
                      class="w-full"
                      :danger="invalid.last_name"
                    />
                    <div class="errors" v-if="invalid.last_name">{{ $t("alert_last_name") }}</div>
                  </div>
                  <div class="vx-col lg:w-1/3 md:w-1/2 sm:w-1/2 w-full mt-5">
                    <label>
                      {{ $t("email") }}
                      <span class="require">*</span>
                    </label>
                    <vs-input
                      v-model="editObj.email"
                      type="email"
                      class="w-full"
                      :danger="invalid.email"
                      @keypress="checkEnglish"
                    />
                    <div class="errors" v-if="invalid.email">{{ $t("alert_email") }}</div>
                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
                    <label>
                      {{ $t("username") }}
                      <span class="require">*</span>
                    </label>
                    <vs-input v-model="editObj.username" class="w-full" :danger="invalid.username" />
                    <div class="errors" v-if="invalid.username">{{ $t("alert_username") }}</div>
                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
                    <label>
                      {{ $t("officer") }}
                      <span class="require">*</span>
                    </label>
                    <vs-select class="w-full" v-model="editObj.officer" :danger="invalid.officer">
                      <vs-select-item
                        :key="index"
                        :value="item.department_id"
                        :text="item['department_name_'+$i18n.locale]"
                        v-for="(item, index) in officers"
                      />
                    </vs-select>
                    <div class="errors" v-if="invalid.officer">{{ $t("alert_officer") }}</div>
                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
                    <label>
                      {{ $t("department") }}
                      <span class="require">*</span>
                    </label>
                    <vs-select
                      class="w-full"
                      v-model="editObj.department"
                      :danger="invalid.department"
                    >
                      <vs-select-item
                        :key="index"
                        :value="item.sub_department_id"
                        :text="item['sub_department_name_'+$i18n.locale]"
                        v-for="(item, index) in departments"
                      />
                    </vs-select>
                    <div class="errors" v-if="invalid.department">{{ $t("alert_department") }}</div>
                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
                    <label>
                      {{ $t("password") }}
                      <span class="require">*</span>
                    </label>
                    <vs-input
                      type="password"
                      v-model="editObj.password"
                      class="w-full"
                      :danger="invalid.password"
                    />
                    <div class="errors" v-if="invalid.password">{{ $t("alert_password") }}</div>
                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
                    <label>
                      {{ $t("confirm_password")
                      }}
                      <span class="require">*</span>
                    </label>
                    <vs-input
                      v-model="editObj.confirm_password"
                      class="w-full"
                      type="password"
                      :danger="invalid.confirm_password"
                    />
                    <div
                      class="errors"
                      v-if="invalid.confirm_password"
                    >{{ $t("alert_confirm_password") }}</div>
                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
                    <label>
                      {{ $t("role") }}
                      <span class="require">*</span>
                    </label>
                    <vs-select class="w-full" v-model="editObj.role" :danger="invalid.role">
                      <vs-select-item
                        :key="index"
                        :value="item.role_id"
                        :text="$t(item.role_name)"
                        v-for="(item, index) in roles"
                      />
                    </vs-select>
                    <div class="errors" v-if="invalid.role">{{ $t("alert_role") }}</div>
                  </div>
                </div>
              </div>
              <div class="vx-col md:w-1/3 sm:w-full lg:w-1/3 w-full">
                <label for>{{ $t("profile picture") }}</label>
                <vs-upload
                  :action="uploadUrl"
                  limit="1"
                  accept="image/*"
                  :text="$t('upload profile picture')"
                />
              </div>
            </div>
            <div>
              <div class="vx-row">
                <div class="vx-col w-full mt-5">
                  <vs-button
                    ref="loadableButton"
                    id="button-with-loading"
                    class="vs-con-loading__container mr-5"
                    vslor="primary"
                    @click="save"
                  >{{ $t("save") }}</vs-button>
                  <vs-button
                    color="danger"
                    class
                    type="border"
                    @click="forceRerender()"
                  >{{ $t("cancel") }}</vs-button>
                </div>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
      <vs-popup class="holamundo" :title="$t('edit_title')" :active.sync="popupActive">
        <v-template v-if="!change_password">
          <div class="vx-col md:w-full mt-3">
            <label>
              {{ $t("first_name") }}
              <span class="require">*</span>
            </label>
            <vs-input v-model="editObj.first_name" class="w-full" :danger="invalid.first_name" />
            <div class="errors" v-if="invalid.first_name">{{ $t("alert_first_name") }}</div>
          </div>
          <div class="vx-col md:w-full mt-3">
            <label>
              {{ $t("last_name") }}
              <span class="require">*</span>
            </label>
            <vs-input v-model="editObj.last_name" class="w-full" :danger="invalid.last_name" />
            <div class="errors" v-if="invalid.last_name">{{ $t("alert_last_name") }}</div>
          </div>
          <div class="vx-col md:w-full mt-3">
            <label>
              {{ $t("email") }}
              <span class="require">*</span>
            </label>
            <vs-input
              v-model="editObj.email"
              class="w-full"
              :danger="invalid.email"
              @keypress="checkEnglish"
            />
            <div class="errors" v-if="invalid.email">{{ $t("alert_email") }}</div>
          </div>
          <div class="vx-col md:w-full mt-3">
            <label>
              {{ $t("username") }}
              <span class="require">*</span>
            </label>
            <vs-input
              v-model="editObj.username"
              class="w-full"
              :danger="invalid.username"
              disabled
            />
            <div class="errors" v-if="invalid.username">{{ $t("alert_username") }}</div>
          </div>
          <div class="vx-col w-full mt-5">
            <label>
              {{ $t("officer") }}
              <span class="require">*</span>
            </label>
            <vs-select class="w-full" v-model="editObj.officer" :danger="invalid.officer">
              <vs-select-item
                :key="index"
                :value="item.department_id"
                :text="item['department_name_'+$i18n.locale]"
                v-for="(item, index) in officers"
              />
            </vs-select>
            <div class="errors" v-if="invalid.officer">{{ $t("alert_officer") }}</div>
          </div>
          <div class="vx-col w-full mt-5">
            <label>
              {{ $t("department") }}
              <span class="require">*</span>
            </label>
            <vs-select class="w-full" v-model="editObj.department" :danger="invalid.department">
              <vs-select-item
                :key="index"
                :value="item.sub_department_id"
                :text="item['sub_department_name_'+$i18n.locale]"
                v-for="(item, index) in departments"
              />
            </vs-select>
            <div class="errors" v-if="invalid.department">{{ $t("alert_department") }}</div>
          </div>
          <div class="vx-col md:w-full mt-3">
            <label>
              {{ $t("role") }}
              <span class="require">*</span>
            </label>
            <vs-select class="w-full" v-model="editObj.role" :danger="invalid.role">
              <vs-select-item
                :key="index"
                :value="item.role_id"
                :text="$t(item.role_name)"
                v-for="(item, index) in roles"
              />
            </vs-select>
            <div class="errors" v-if="invalid.role">{{ $t("alert_role") }}</div>
          </div>
          <div class="vx-col md:w-full">
            <label for>{{ $t("profile picture") }}</label>
            <div class="con-upload" v-if="src_img == '' || src_img == null">
              <!---->
              <div class="con-img-upload">
                <div class="con-input-upload">
                  <input type="file" @change="previewFiles" ref="myFiles" />
                  <span class="text-input">Upload Profile Picture</span>
                  <span class="input-progress" style="width: 0%;"></span>
                  <button
                    disabled="disabled"
                    type="button"
                    title="Upload"
                    class="btn-upload-all vs-upload--button-upload"
                  >
                    <i translate="translate" class="material-icons notranslate">cloud_upload</i>
                  </button>
                </div>
              </div>
            </div>
            <div class="con-upload" v-if="src_img != '' && src_img != null">
              <div class="con-img-upload">
                <div class="img-upload">
                  <button class="btn-x-file" @click="clearFile()">
                    <i translate="translate" class="material-icons notranslate">clear</i>
                  </button>
                  <button class="btn-upload-file">
                    <i translate="translate" class="material-icons notranslate">cloud_upload</i>
                    <span>%</span>
                  </button>
                  <img :src="src_img" style="max-width: none; max-height: 100%;" />
                  <!---->
                </div>
                <div class="con-input-upload disabled-upload">
                  <input type="file" accept="image/*" disabled="disabled" />
                  <span class="text-input">upload profile picture</span>
                  <span class="input-progress" style="width: 0%;"></span>
                  <button
                    type="button"
                    title="Upload"
                    class="btn-upload-all vs-upload--button-upload"
                  >
                    <i translate="translate" class="material-icons notranslate">cloud_upload</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </v-template>
        <v-template v-if="change_password">
          <div class="vx-col md:w-full mt-3">
            <label>
              {{ $t("new_password") }}
              <span class="require">*</span>
            </label>
            <vs-input
              type="password"
              v-model="editObj.password"
              class="w-full"
              :danger="invalid.password"
            />
            <div class="errors" v-if="invalid.password">{{ $t("alert_password") }}</div>
          </div>
          <div class="vx-col md:w-full mt-3">
            <label>
              {{ $t("confirm_password") }}
              <span class="require">*</span>
            </label>
            <vs-input
              type="password"
              v-model="editObj.confirm_password"
              class="w-full"
              :danger="invalid.confirm_password"
            />
            <div class="errors" v-if="invalid.confirm_password">{{ $t("alert_confirm_password") }}</div>
          </div>
        </v-template>
        <div class="vx-col md:w-full mt-5">
          <vs-button color="primary" @click="change_password = !change_password">
            {{
            change_password ? $t("edit_user") : $t("change_password")
            }}
          </vs-button>
          <vs-button
            class="right"
            color="danger"
            type="border"
            @click="popupActive = false"
          >{{ $t("cancel") }}</vs-button>
          <vs-button
            ref="loadableButton"
            id="button-with-loading"
            class="vs-con-loading__container right"
            vslor="primary"
            @click="edit()"
          >{{ $t("save") }}</vs-button>
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
import * as $ from "jquery";
export default {
  components: {
    EditUser,
    Datepicker
  },
  data() {
    return {
      src_img: "",
      change_password: false,
      renderComponent: true,
      sideBarActive: false,
      popupActive: false,
      users: [],
      roles: [],
      submitted: false,
      editObj: {},
      uploadUrl: service.url + "/upload",
      departments: [],
      officers: []
    };
  },

  computed: {
    invalid() {
      var require = type => this.submitted && this.editObj[type] == "";
      return {
        first_name: require("first_name"),
        last_name: require("last_name"),
        email: require("email"),
        username: require("username"),
        officer: require("officer"),
        department: require("department"),
        password:
          (!this.popupActive || this.change_password) && require("password"),
        confirm_password:
          this.submitted &&
          this.editObj.password != this.editObj.confirm_password,
        role: require("role"),
        old_password: this.change_password && require("old_password")
      };
    },

    isInvald() {
      return (
        this.invalid.first_name ||
        this.invalid.last_name ||
        this.invalid.email ||
        this.invalid.username ||
        this.invalid.password ||
        this.invalid.confirm_password ||
        this.invalid.role ||
        this.invalid.officer ||
        this.invalid.department ||
        this.old_password
      );
    },
    isInvaldEdting() {
      return (
        this.invalid.first_name ||
        this.invalid.last_name ||
        this.invalid.email ||
        this.invalid.username ||
        this.invalid.role
      );
    },
    isInvaldChangePassword() {
      return this.invalid.password || this.invalid.confirm_password;
    }
  },
  created() {
    this.getdata();
    this.initVal();
    console.log(this.$store.state);
  },
  methods: {
    checkEnglish(e) {
      //  return false;
      var checkEnglish = window.checkEnglish(e);
      if (!checkEnglish) {
        e.preventDefault();
      }
    },
    previewFiles(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.src_img = reader.result;
      };
    },
    clearFile() {
      this.src_img = "";
    },
    initVal() {
      this.submitted = false;
      (this.change_password = false), (this.popupActive = false);
      this.editObj = {
        old_password: "",
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
        officer: "",
        department: "",
        role: ""
      };
    },
    edit() {
      this.submitted = true;
      var url;
      if (this.change_password) {
        url = "admin_change_password";
      } else {
        url = "update_user";
      }

      if (
        (!this.isInvaldChangePassword && this.change_password) ||
        (!this.isInvaldEdting && !this.change_password)
      ) {
        this.popupActive = false;
        service
          .postData(url, { ...this.editObj, img_profile: this.src_img })
          .then(result => {
            this.$swal(this.$t("success_title"), "", "success").then(result => {
              this.getdata();
              this.forceRerender();
              this.initVal();
            });
          });
      }
    },
    delete_user(user) {
      this.$swal({
        title: this.$t("delete_user_title"),
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
            .postData("/delete_user", { username: user.username })
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
      service.postData("/get_user", {}).then(result => {
        this.users = result.data.map(item => {
          item.password = "";
          item.confirm_password = "";
          return item;
        });
      });
      service.postData("/get_role", {}).then(
        result => {
          this.roles = result.data;
        },
        err => {}
      );
      try {
        var officerResponse = await service.postData(
          "department/getDepartment",
          {}
        );
        this.officers = officerResponse.data;
      } catch (e) {
        console.log(e);
      }
    },
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    save() {
      this.submitted = true;
      var img_profile = "";
      if (document.querySelector(".img-upload img") != null) {
        img_profile = document.querySelector(".img-upload img").src;
      } else {
      }
      if (!this.isInvald) {
        service.postData("/add_user", { ...this.editObj, img_profile }).then(
          result => {
            this.$swal(this.$t("success_title"), "", "success").then(result => {
              this.getdata();
              this.forceRerender();
              this.initVal();
            });
          },
          err => {
            console.log(err);
            this.$swal("", err.message, "error").then(result => {
              this.getdata();
              this.forceRerender();
              this.initVal();
            });
          }
        );
      }
    }
  },
  watch: {
    popupActive(val) {
      if (!val) {
        this.initVal();
      }
    },
    async "editObj.officer"(val) {
      console.log(val);
      try {
        var departmentResponse = await service.postData(
          "/subDepartment/getSubDepartmentByDepartmentID",
          { department_id: val }
        );
        this.departments = departmentResponse.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
