/** Page imagery from Unsplash (Unsplash License — free for commercial use). Also listed in CREDITS.md. */
export type PageImage = {
  lg: string;
  sm: string;
  width: number;
  height: number;
  alt: string;
  credit: { name: string; url: string };
};

const img = (name: string, width: number, height: number, alt: string, credit: string, url: string): PageImage => ({
  lg: `/media/pages/${name}-1920.webp`,
  sm: `/media/pages/${name}-960.webp`,
  width,
  height,
  alt,
  credit: { name: credit, url },
});

export const pageImages = {
  nightStation: img(
    "night-station",
    1920,
    1280,
    "A modern EV charging station under a lit timber canopy at night",
    "Eva Kristensen",
    "https://unsplash.com/photos/illuminated-modern-ev-charging-station-with-a-car-at-night-aBalcTjW32Q",
  ),
  chargePost: img(
    "charge-post",
    1920,
    2880,
    "A charging post with its lamp lit, cable plugged in, at dusk",
    "Ratio EV Charging",
    "https://unsplash.com/photos/an-electric-vehicle-charging-station-is-illuminated-ngatBVIgJJk",
  ),
  chargePort: img(
    "charge-port",
    1600,
    1065,
    "A charging cable plugged into an electric car's charge port, lit blue",
    "CHUTTERSNAP",
    "https://unsplash.com/photos/electric-vehicle-charging-cable-plugged-into-car-xJLsHl0hIik",
  ),
  lagosTraffic: img(
    "lagos-traffic",
    1600,
    2400,
    "Aerial view of busy Lagos traffic at dusk with a bridge behind",
    "Ben Iwara",
    "https://unsplash.com/photos/a-view-of-a-busy-city-street-with-a-bridge-in-the-background-Lpk_o-XeRWo",
  ),
  abujaNight: img(
    "abuja-night",
    1600,
    2400,
    "Cars on an Abuja road at night under tall streetlights",
    "Habila Mazawaje",
    "https://unsplash.com/photos/qQMpHZ33vRI",
  ),
  abujaGate: img(
    "abuja-gate",
    1920,
    2560,
    "Abuja City Gate on the expressway under a stormy sky",
    "Chizon",
    "https://unsplash.com/photos/a-car-driving-down-a-highway-under-a-cloudy-sky-UwoCLYgejB0",
  ),
  abujaSunset: img(
    "abuja-sunset",
    1920,
    1280,
    "Sun setting over the Abuja City Gate in silhouette",
    "Baqeer Gashua",
    "https://unsplash.com/photos/the-sun-is-setting-over-the-horizon-of-a-city-pS7D8lroxTM",
  ),
  solarDusk: img(
    "solar-dusk",
    1920,
    1280,
    "Homes with rooftop solar panels at dusk",
    "Vivint Solar",
    "https://unsplash.com/photos/a-house-with-a-solar-panel-on-the-roof-_ciUqT1HEuY",
  ),
} as const;

/** Our own photos of the solar-powered charging site at Imo Digital City, Owerri (ACOB Group). */
export type SitePhoto = { src: string; sm: string; width: number; height: number; alt: string };

const photo = (name: string, width: number, height: number, alt: string): SitePhoto => ({
  src: `/media/site/${name}.webp`,
  sm: `/media/site/${name}-sm.webp`,
  width,
  height,
  alt,
});

export const sitePhotos = {
  carCharging: photo("car-charging", 960, 1280, "An electric car charging at a DC charger under the solar canopy at Imo Digital City"),
  canopy: photo("canopy", 1280, 720, "Charging bays under the steel canopy, with AC and DC chargers on concrete plinths"),
  dcCharger: photo("dc-charger", 960, 1280, "A DC fast charger under the canopy, with an engineer at the next bay"),
  techDc: photo("tech-dc", 960, 1280, "An ACOB engineer holding the connector of a DC fast charger"),
  techAc: photo("tech-ac", 960, 1280, "An ACOB engineer beside a wall-mounted AC charger"),
  acCharger: photo("ac-charger", 960, 1280, "Close-up of a pole-mounted AC charger with its screen and card reader"),
  stationAerial: photo("station-aerial", 1280, 720, "Aerial view of the charging station with solar panels on its canopy roof"),
  imoDigitalCity: photo("imo-digital-city", 1280, 720, "Aerial view of the Imo Digital City entrance and campus, Owerri"),
  batteryRoom: photo("battery-room", 960, 1280, "Battery storage racks and inverter in the charging station's power room"),
  inverters: photo("inverters", 960, 1280, "Inverter and switchgear on the power-room wall"),
  solarArray: photo("solar-array", 1280, 960, "An ACOB engineer in front of a ground-mounted solar array"),
  minigridAerial: photo("minigrid-aerial", 1280, 720, "Aerial view of a fenced solar mini-grid installed by ACOB Lighting"),
  canopySide: photo("canopy-side", 960, 1280, "The charging canopy seen from the side, with chargers on plinths"),
} as const;
