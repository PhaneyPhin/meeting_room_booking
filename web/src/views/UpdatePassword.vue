<template>
  <div class="vx-col w-full mb-base">
    <vx-card>
      <div class="container">
        <h4>{{$t("Edit Your Password")}}</h4>
        <div class="vx-row mt-10">
          <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
            <label>
              {{ $t("old password") }}
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
              {{ $t("new password") }}
              <span class="require">*</span>
            </label>
            <vs-input
              type="password"
              v-model="editObj.new_password"
              class="w-full"
              :danger="invalid.new_password||invalid.compare_new_password"
            />
            <div class="errors" v-if="invalid.new_password">{{ $t("alert_new_password") }}</div>
            <div
              class="errors"
              v-if="invalid.compare_new_password"
            >{{ $t("alert_compare_password") }}</div>
          </div>
          <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
            <label>
              {{ $t("confirm password") }}
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
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mt-5">
            <vs-button
              ref="loadableButton"
              id="button-with-loading"
              class="vs-con-loading__container mr-5 pl-10 pr-10"
              vslor="primary"
              @click="save"
            >{{ $t("save") }}</vs-button>
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import service from "@/service/service";
export default {
  data() {
    return {
      submitted: false,
      editObj: {}
    };
  },
  computed: {
    invalid() {
      var require = x => this.editObj[x] == "" && this.submitted;
      return {
        password: require("password"),
        new_password: require("new_password"),
        compare_new_password:
          this.editObj.new_password == this.editObj.password &&
          this.editObj.password != "",
        confirm_password:
          this.editObj.confirm_password != this.editObj.new_password &&
          this.submitted
      };
    },
    isInvalid() {
      return (
        this.invalid.password ||
        this.invalid.new_password ||
        this.invalid.confirm_password
      );
    }
  },
  methods: {
    async init() {
      this.submitted = false;
      this.editObj = {
        password: "",
        new_password: "",
        confirm_password: ""
      };
    },

    async save() {
      this.submitted = true;
      if (!this.isInvalid) {
        try {
          var response = await service.postData("updateOwnPassword", {
            ...service.getUser().user,
            ...this.editObj
          });
          await this.$swal(this.$t("success_title"), "", "success");
        } catch (e) {
          await this.$swal("", e.message, "error");
        }
      }
    }
  },
  async created() {
    this.init();
  },
  beforeCreated() {},
  watch: {}
};
</script>

<style>
</style>
