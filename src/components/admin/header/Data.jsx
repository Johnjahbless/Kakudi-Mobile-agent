export const searchResultData = [
  {
    headerTitle: "Histories",
    id: 1,
    children: [
      {
        title: "How to accept love again",
      },
      {
        title: "jdlab.ng",
      },
      {
        title: "It's easy",
      },
    ],
  },
  {
    headerTitle: "Results",
    id: 2,
    children: [
      {
        img: "../../../assets/img/products/product-3-50.png",
        title: "oPhone S9 Limited Edition",
      },
      {
        img: "../../../assets/img/products/product-2-50.png",
        title: "Drone X2 New Gen-7",
      },
      {
        img: "../../../assets/img/products/product-1-50.png",
        title: "Headphone Blitz",
      },
    ],
  }, 
  {
    headerTitle: "Projects",
    id: 3,
    children: [
      {
        backCls: "bg-danger",
        title: "JD Lab Admin Template",
        icode: "fas fa-code",
      },
      {
        backCls: "bg-primary",
        title: "Create a new Homepage Design",
        icode: "fas fa-laptop",
      },
    ],
  },
];

export const EnvelopData = {
  toggleName: "message-toggle",
  iconName: "far fa-envelope",
  headerLeft: "Messages",
  headerRight: "Mark All As Read",
  listClass: "dropdown-list-message",

  content: [
    {
      img: "../../../assets/img/avatar/avatar-1.png",
      title: "Hauwa",
      description: "Hello, Bro!",
      time: "10 Hours Ago",
      unreadClass: false,
      online: true,
    },
    {
      img: "../../../assets/img/avatar/avatar-2.png",
      title: "Ahmed",
      description: "I don't know what to do",
      time: "12 Hours Ago",
      unreadClass: true,
      online: false,
    },
    {
      img: "../../../assets/img/avatar/avatar-3.png",
      title: "Abbas",
      description:
        " No love lost, No Love gain",
      time: "12 Hours Ago",
      unreadClass: true,
      online: true,
    },
    {
      img: "../../../assets/img/avatar/avatar-4.png",
      title: "Bangis",
      description:
        "Be satisfied at all time",
      time: "16 Hours Ago",
      unreadClass: false,
      online: false,
    },
    {
      img: "../../../assets/img/avatar/avatar-5.png",
      title: "Aslapai",
      description: "Take a leap while you can",
      time: "Yesterday",
      unreadClass: false,
      online: false,
    },
  ],
  bottomMsg: "View All",
  bottomMsgCls: "fas fa-chevron-right",
};

export const NotifyData = {
  toggleName: "notification-toggle",
  iconName: "far fa-bell",
  headerLeft: "Notifiactions",
  headerRight: "Mark All As Read",
  listClass: "dropdown-list-icons",

  content: []
};

export const userDetail = {
  userName: "John kolo",
  userImg: "../../../assets/img/avatar/avatar-1.png",
  logTime: "5 min",
  logoutIcon: "fas fa-sign-out-alt",
  logoutTitle: "Logout",

  datas: [
    
    {
      link: "/me/activities",
      icode: "fas fa-bolt",
      title: "Activities",
    },
    {
      link: "/Settings",
      icode: "fas fa-cog",
      title: "Settings",
    },
  ],
};
