/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: '/home',
    name: "Analytics",
    icon: "HomeIcon",
    slug: "dashboardAnalytics",
    i18n: "Home",
  },
  {
        url: '/user_data',
        name: "eCommerce",
        icon: "UserIcon",
        slug: "dashboardECommerce",
        i18n: "User Data",
  },

  {
    url: '/room_data',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "Room Data",
  },

  {
    header: "Booking Data",
    i18n: "Booking Data",
    cansee:"approver"
  },
  {
    url: '/all_booking',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "All Booked Data",
  },
  {
    url: '/user_booking',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "User Booking",
  },
  {
    url: '/booking_rejected',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "All Rejected Data",
  },
  {
    url: '/booking_history',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "Booking History",
  },
  {
    header: "My Booking Data",
    i18n: "My Booking Data",
    cansee:"member"
  },
  {
    url: '/book_room',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "Book the Room",
  },
  {
    url: '/all_my_booking',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "All Booked Data",
  },
  {
    url: '/my_booking',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "My Booking",
  },
  {
    url: '/my_booking_rejected',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "My Rejected Booking",
  },
  {
    url: '/my_booking_history',
    name: "eCommerce",
    icon: "LayoutIcon",
    slug: "dashboardECommerce",
    i18n: "My Booking History",
  },
]
