<template>
  <div class="vx-col w-full mb-base">
    <vx-card>
      <div class="container">
        <h4>{{$t("Edit Your Information")}}</h4>
        <div class="vx-row">
          <div class="vx-col md:w-2/3 w-full">
            <div class="vx-row mt-10">
              <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
                <label>
                  {{ $t("first_name") }}
                  <span class="require">*</span>
                </label>
                <vs-input v-model="editObj.first_name" class="w-full" :danger="invalid.first_name" />
                <div class="errors" v-if="invalid.first_name">{{ $t("alert_first_name") }}</div>
              </div>
              <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
                <label>
                  {{ $t("last_name") }}
                  <span class="require">*</span>
                </label>
                <vs-input v-model="editObj.last_name" class="w-full" :danger="invalid.last_name" />
                <div class="errors" v-if="invalid.last_name">{{ $t("alert_last_name") }}</div>
              </div>
              <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-1/2 w-full mt-5">
                <label>
                  {{ $t("email") }}
                  <span class="require">*</span>
                </label>
                <vs-input v-model="editObj.email" class="w-full" :danger="invalid.email" />
                <div class="errors" v-if="invalid.email">{{ $t("alert_email") }}</div>
              </div>
            </div>
          </div>
          <div class="vx-col md:w-1/3 w-full">
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
              </div>
            </div>
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
      src_img: "",
      submitted: false,
      editObj: {}
    };
  },
  computed: {
    invalid() {
      var require = x => this.editObj[x] == "" && this.submitted;
      return {
        first_name: require("first_name"),
        last_name: require("last_name"),
        email: require("email")
      };
    },
    isInvalid() {
      return (
        this.invalid.first_name || this.invalid.last_name || this.invalid.email
      );
    }
  },
  methods: {
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
    async init() {
      this.submitted = false;
      this.editObj = {
        first_name: "",
        last_name: "",
        email: ""
      };
      var userResponse = await service.postData(
        "getUserInformation",
        service.getUser().user
      );
      this.editObj = userResponse.user;
      this.src_img = userResponse.user.img_profile;
    },

    async save() {
      this.submitted = true;
      if (!this.isInvalid) {
        var response = await service.postData("saveUserInformation", {
          ...service.getUser().user,
          ...this.editObj,
          img_profile: this.src_img
        });

        if (response.code == 1) {
          await this.$swal(this.$t("success_title"), "", "success");
          this.$store.dispatch("setProfile", this.src_img);
          this.$store.dispatch(
            "setDisplayUsername",
            this.editObj.first_name + " " + this.editObj.last_name
          );
          this.init();
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
