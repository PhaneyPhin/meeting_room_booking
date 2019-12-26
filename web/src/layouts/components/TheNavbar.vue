<!-- =========================================================================================
	File Name: TheNavbar.vue
	Description: Navbar component
	Component Name: TheNavbar
	----------------------------------------------------------------------------------------
	Item Name: Vuesax Admin - VueJS Dashboard Admin Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar
        class="vx-navbar navbar-custom"
        :color="navbarColor"
        :class="classObj"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        ></feather-icon>

        <vs-spacer></vs-spacer>

        <!-- I18N -->
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <span class="cursor-pointer flex i18n-locale"
            ><img
              class="h-4 w-5"
              :src="require(`@/assets/images/flags/${$i18n.locale}.png`)"
              :alt="$i18n.locale"
            /><span class="hidden sm:block ml-2">{{
              getCurrentLocaleData.lang
            }}</span></span
          >
          <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
            <vs-dropdown-item @click="updateLocale('en')"
              ><img
                class="h-4 w-5 mr-1"
                src="@/assets/images/flags/en.png"
                alt="en"
              />
              &nbsp;English</vs-dropdown-item
            >
            <vs-dropdown-item @click="updateLocale('th')"
              ><img
                class="h-4 w-5 mr-1"
                src="@/assets/images/flags/th.png"
                alt="th"
              />
              &nbsp;Thailand</vs-dropdown-item
            >
          </vs-dropdown-menu>
        </vs-dropdown>

        <!-- SEARCHBAR -->
        <!-- <div class="search-full-container w-full h-full absolute left-0 rounded-lg" :class="{'flex': showFullSearch}" v-show="showFullSearch">
                <vx-auto-suggest
                  class="w-full"
                  inputClassses="w-full vs-input-no-border vs-input-no-shdow-focus no-icon-border"
                  :autoFocus="showFullSearch"
                  :data="navbarSearchAndPinList"
                  icon="SearchIcon"
                  placeholder="Search..."
                  ref="navbarSearch"
                  @closeSearchbar="showFullSearch = false"
                  @selected="selected"
                  background-overlay />
                <div class="absolute right-0 h-full z-50">
                    <feather-icon icon="XIcon" class="px-4 cursor-pointer h-full close-search-icon" @click="showFullSearch = false"></feather-icon>
                </div>
            </div>
            <feather-icon icon="SearchIcon" @click="showFullSearch = true" class="cursor-pointer navbar-fuzzy-search ml-4"></feather-icon> -->

        <!-- CART DROPDOWN -->

        <!-- NOTIFICATIONS -->

        <!-- USER META -->
        &nbsp;&nbsp;&nbsp;
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ user_displayName }}</p>
            <small>Available</small>
          </div>
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
          >
            <div class="con-img ml-3">
              <img
                key="localImg"
                :src="
                  $store.state.img_profile != ''
                    ? $store.state.img_profile
                    : require(`@/assets/images/portrait/small/avatar-s-1.png`)
                "
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
            </div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout()"
                >
                  <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
                  <span class="ml-2">{{ $t("Logout") }}</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import VxAutoSuggest from "@/components/vx-auto-suggest/VxAutoSuggest.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import service from "@/service/service";
import draggable from "vuedraggable";
export default {
  name: "the-navbar",
  props: {
    navbarColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: "",
      showFullSearch: false,
      unreadNotifications: [
        {
          index: 0,
          title: "New Message",
          msg: "Are your going to meet me tonight?",
          icon: "MessageSquareIcon",
          time: "Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)",
          category: "primary"
        },
        {
          index: 1,
          title: "New Order Recieved",
          msg: "You got new order of goods.",
          icon: "PackageIcon",
          time: "Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)",
          category: "success"
        },
        {
          index: 2,
          title: "Server Limit Reached!",
          msg: "Server have 99% CPU usage.",
          icon: "AlertOctagonIcon",
          time: "Thu Jan 31 2019 07:45:23 GMT+0000 (GMT)",
          category: "danger"
        },
        {
          index: 3,
          title: "New Mail From Peter",
          msg: "Cake sesame snaps cupcake",
          icon: "MailIcon",
          time: "Fri Feb 01 2019 07:45:23 GMT+0000 (GMT)",
          category: "primary"
        },
        {
          index: 4,
          title: "Bruce's Party",
          msg: "Chocolate cake oat cake tiramisu",
          icon: "CalendarIcon",
          time: "Fri Feb 02 2019 07:45:23 GMT+0000 (GMT)",
          category: "warning"
        }
      ],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false
    };
  },
  watch: {
    $route() {
      if (this.showBookmarkPagesDropdown)
        this.showBookmarkPagesDropdown = false;
    }
  },
  computed: {
    // HELPER
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint() {
      return this.$store.state.breakpoint;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.sidebarWidth == "default") return "navbar-default";
      else if (this.sidebarWidth == "reduced") return "navbar-reduced";
      else if (this.sidebarWidth) return "navbar-full";
    },

    // I18N
    getCurrentLocaleData() {
      const locale = this.$i18n.locale;
      if (locale == "en") return { flag: "us", lang: "English" };
      else if (locale == "th") return { flag: "th", lang: "Thailand" };
    },

    // BOOKMARK & SEARCH
    data() {
      return this.$store.state.navbarSearchAndPinList;
    },
    starredPages() {
      return this.$store.state.starredPages;
    },
    starredPagesLimited: {
      get() {
        return this.starredPages.slice(0, 10);
      },
      set(list) {
        this.$store.dispatch("arrangeStarredPagesLimited", list);
      }
    },
    starredPagesMore: {
      get() {
        return this.starredPages.slice(10);
      },
      set(list) {
        this.$store.dispatch("arrangeStarredPagesMore", list);
      }
    },

    // CART DROPDOWN
    cartItems() {
      return this.$store.state.eCommerce.cartItems.slice().reverse();
    },

    // PROFILE
    user_displayName() {
      var { first_name, last_name } = service.getUser().user;
      return first_name + " " + last_name;
    }
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
    },
    showSidebar() {
      this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true);
    },
    selected(item) {
      this.$router.push(item.url);
      this.showFullSearch = false;
    },
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch("updateStarredPage", {
        index: item.index,
        val: !item.highlightAction
      });
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
    },
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? " Years " : " Year ") + "ago";
      } else if (days > 0) {
        return days + (days > 1 ? " Days " : " Day ") + "ago";
      } else if (hours > 0) {
        return hours + (hours > 1 ? " Hrs " : " Hour ") + "ago";
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago";
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} sec ago` : "just now");
      }

      return "Just Now";
    },
    logout() {
      // if user is logged in via auth0
      service.removeToken();
      this.$router.push("/pages/login");
    },
    outside: function() {
      this.showBookmarkPagesDropdown = false;
    },

    // CART DROPDOWN
    removeItemFromCart(item) {
      this.$store.dispatch("eCommerce/toggleItemInCart", item);
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
    draggable
  }
};
</script>
