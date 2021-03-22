// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  RUN_ENVIRONMENT: 'dev',
  COUNTRY: 'US',
  config: {
    apiKey: "AIzaSyC8aWI-nCV3_jFJoRMkIvH_kCWpj2VnOQ0",
    authDomain: "apic-305802.firebaseapp.com",
    databaseURL: "https://apic-305802-default-rtdb.firebaseio.com",
    projectId: "apic-305802",
    storageBucket: "apic-305802.appspot.com",
    messagingSenderId: "1097721380000",
    appId: "1:1097721380000:web:fc813729ab4ddb9dd85dc5"
  },
  API_URLS: {
    dev: 'http://192.168.1.2:8100',
    prod: ''
  },
  DUMMY_CARDS: [{
    number: '2342',
    expiry: '03/23',
    image: 'assets/cards/visa.png'
  },
  {
    number: '0912',
    expiry: '05/23',
    image: 'assets/cards/amex.png'
  },
  {
    number: '4483',
    expiry: '03/25',
    image: 'assets/cards/mastercard.png'
  },
  {
    number: '1123',
    expiry: '03/24',
    image: 'assets/cards/discover.png'
  }],
  MAIN_MENU_ITEMS: [
    {
      title: 'Book Ride',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Add card',
      url: '/addcard',
      icon: 'cash'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'timer'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'cog'
    },
    {
      title: 'Help',
      url: '/list',
      icon: 'help-circle'
    }
  ],
  HELP_FAQS: [
    { title: 'Report an issue with your last trip' },
    { title: 'Trip and Fare review' },
    { title: 'Account and Payment options' },
    { title: 'A Guide to Ion Taxi' },
    { title: 'Accessibility' }
  ],
  GOOGLE_MAPS_API_KEY: 'AIzaSyC8aWI-nCV3_jFJoRMkIvH_kCWpj2VnOQ0',
  IONIC_STORAGE: 'userdb',
  DRIVER_DELAY_MSG: 'Driver is taking longer than usual! please try again later',
  DRIVER_REJECTED_MSG: 'Driver rejected your booking',
  LOGOUT_CONFIRMATION: 'Are you sure you want to logout?',
  MARKER_OPTIONS: {
    origin: {
      animation: '\'DROP\'',
      label: 'origin',
      draggable: true

    },
    destination: {
      animation: '\'DROP\'',
      label: 'destination',
      draggable: true

    },
  },
  RENDER_OPTIONS: {
    suppressMarkers: true,
  },
  SELECT_DESTINATION_WARN: 'You must select destination location first to request ride',
  SELECT_ORIGIN_WARN: 'You must select origin location first to request ride',
  SCREEN_OPTIONS: {},
  COUNTRY_DIAL_CODES: [
   
    {
      name: 'Colombia',
      dialCode: '+57',
      code: 'CO'
    },

  ],
  USER_CONFIRM_MSG: 'Your driver will arrive shortly. Do you want to confirm booking?',
  RIDE_COMPLETED_MSG: 'Your ride is completed. Please pay the Fare.',
  USER_CANCEL_MSG: 'Do you want to cancel this ride ? Driver is already on his way',
  MAP_STYLE: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        }
      ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5'
        }
      ]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    }
  ],

};

