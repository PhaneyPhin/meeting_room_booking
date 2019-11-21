<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter justify-center items-center">
                        <div class="vx-col hidden lg:block lg:w-1/2">
                            <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">{{$t('Login')}}</h4>
                                    <p>{{$t('Welcome back, please login to your account.')}}</p>
                                </div>
                                <vs-input
                                    v-validate="'required'"
                                    data-vv-validate-on="blur"
                                    name="username"
                                    icon="icon icon-user"
                                    icon-pack="feather"
                                    label-placeholder="username"
                                    v-model="username"
                                    class="w-full no-icon-border"/>
                                <span class="text-danger text-sm">{{ errors.first('username') }}</span>

                                <vs-input
                                    data-vv-validate-on="blur"
                                    v-validate="'required'"
                                    type="password"
                                    name="password"
                                    icon="icon icon-lock"
                                    icon-pack="feather"
                                    label-placeholder="Password"
                                    v-model="password"
                                    class="w-full mt-6 no-icon-border" />
                                <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                                <br>

                                <vs-button id="button-with-loading" class="vs-con-loading__container right" :disabled="!validateForm" @click="login">{{$t('Login')}}</vs-button>
                                <br>





                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import service from '@/service/service';
export default {
    data() {
        return {
            username: '',
            password: '',
            checkbox_remember_me: false
        }
    },
    computed: {
        validateForm() {
            return !this.errors.any() && this.email != '' && this.password != '';
        },
    },
    methods: {
        login() {
              this.$vs.loading({
                background: this.backgroundLoading,
                color: this.colorLoading,
                container: "#button-with-loading",
                scale: 0.45
              })
              service.postData('login',{
                username:this.username,
                password:this.password
              }).then((result)=>{
                console.log(result);
                service.setToken(result.token);
                this.$vs.loading.close("#button-with-loading > .con-vs-loading")
                var {role_name}=service.getUser().user;
                this.$store.dispatch('updateUserRole', role_name)
                this.$acl.change(role_name);

                this.$router.push("/home");
              },err=>{
                this.$vs.loading.close("#button-with-loading > .con-vs-loading")
              })

            // this.$store.dispatch('auth/loginAttempt', payload);
        },


    }
}
</script>

<style lang="scss">
#page-login {
    .social-login {
        .bg-facebook {
          background-color: #1551b1;
        }
        .bg-twitter {
          background-color: #00aaff;
        }
        .bg-google {
          background-color: #4285F4;
        }
        .bg-github {
          background-color: #333;
        }
    }
}
</style>
