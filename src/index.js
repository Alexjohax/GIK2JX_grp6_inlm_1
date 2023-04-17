// Initialize the map
var map = L.map("map", {
  scrollWheelZoom: false,
});

// Set the position and zoom level of the map
map.setView([60.1485524676421, 15.18658550868326], 14);
map.scrollWheelZoom.enable();

// Initialize the base layer
var osm_mapnik = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
).addTo(map);

var sidebar = L.control.sidebar({ container: "sidebar" }).addTo(map);

/* Task 1) Create point, line, and polygon features in any area using Leaflet (i.e., without using geojson). Display information of these features using pop-up along with an image. (Check Leaflet documentation for help)
 */

// Adds marker to map at Systembolaget Ludvika
L.marker([60.1485524676421, 15.18658550868326])
  .addTo(map)
  .bindPopup(
    "<h3>Systembolaget</h3><img src='src/images/systemet.png' width='150px'>"
  );

// Adds a line to the map from Systembolaget to alkisparken
var latlngs = [
  [60.148620021486515, 15.186545266370326],
  [60.14880862226982, 15.186751817181134],
  [60.1506333983414, 15.189167319357818],
];
var polyline = L.polyline(latlngs, { color: "red" })
  .addTo(map)
  .bindPopup(
    "<h3>Vägen till parken</h3><img src='src/images/road.png' width='150px'>"
  );

// Adds polygon of the alkispark to the map
var polygonCoords = [
  [60.15106722099717, 15.189851388704241],
  [60.15036489973853, 15.188933430332344],
  [60.149889125201, 15.190367266136384],
  [60.150704734478936, 15.191338329538059],
];

const markerIcon = L.icon({
  iconUrl: "/src/images/marker-icon2.webp",
  iconSize: [30, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

var polygon = L.polygon(polygonCoords, { color: "red" })
  .addTo(map)
  .bindPopup("<h3>Parken</h3><img src='src/images/park.png' width='150px'>");

const poi1 = {
  coordinates: "60.14880505873236, 15.18973373339937",
  marker: L.marker([60.14880505873236, 15.18973373339937], {
    icon: markerIcon,
  }).addTo(map),
  name: "Folkets hus",
  info: "Folkets hus har väldigt mycket roliga evenemang. Kom o se på alkis-arne svepa 2 absolut vodka på 30 sekunder",
};

const poi2 = {
  coordinates: "60.15146370380727, 15.19057938758252",
  marker: L.marker([60.15146370380727, 15.19057938758252], {
    icon: markerIcon,
  }).addTo(map),
  name: "Donken",
  info: "Ludvikas mest exklusiva restaurang. Här kan du till exempel äta Cheeseburgare eller Dubbel Cheeseburgare. \n\nMcDonalds i Ludvika byggdes i slutet utav 1990-talet",
};

const poi3 = {
  coordinates: "60.156461984224556, 15.181793595763933",
  marker: L.marker([60.156461984224556, 15.181793595763933], {
    icon: markerIcon,
  }).addTo(map),
  name: "Skuthamn badplats",
  info: "Skuthamn badplats är belägen vid sjön Väsman i Ludvika kommun, Dalarnas län, Sverige. Badplatsen är omgiven av skog och erbjuder fina sandstränder, bryggor och en liten lekplats för barnen. Det finns också möjligheter att fiska och paddla kajak vid badplatsen. Skuthamn camping ligger intill badplatsen och erbjuder stugor och husvagnsplatser för övernattning.",
};

const poi4 = {
  coordinates: "60.14980734212499, 15.182584641948754",
  marker: L.marker([60.14980734212499, 15.182584641948754], {
    icon: markerIcon,
  }).addTo(map),
  name: "Ludvika station",
  info: "Ludvika Station är en järnvägsstation belägen i Ludvika kommun i Dalarnas län. Stationen trafikeras av tåg som går mellan Dalarna och Stockholm, samt tåg som går till gruvorna i Aitik och Gällivare i norra Sverige. Ludvika Station är en viktig transportknutpunkt i regionen och har även ett resecentrum med buss- och taxiförbindelser.",
};

const poi5 = {
  coordinates: "60.14547583691965, 15.177413757271246",
  marker: L.marker([60.14547583691965, 15.177413757271246], {
    icon: markerIcon,
  }).addTo(map),
  name: "Hitachi energy",
  info: "Hitachi Energy är ett internationellt energiteknikföretag med huvudkontor i Tokyo, Japan. Företaget har verksamhet inom områden som kraftverk, vindkraft, solenergi och energilagring. Hitachi Energy har en betydande närvaro i Sverige och är bland annat involverade i utvecklingen av nästa generationens kärnkraftverk.",
};

/* Task 2) Choose a city and show 5 locations of interest (example: retail stores, museum, school, etc.) using points. Display information like name, location and other information using sidebar for each location. Use “polylineMeasure.seed” to display distances between these locations (i.e., from PolylinMeasure Plugin). */

let header = document.querySelector("#sidebar-content-header");
let info = document.querySelector("#sidebar-content-info");
let coordinfo = document.querySelector("#sidebar-content-coord");
let closebtn = document.querySelector(".active");

closebtn.addEventListener("click", () => {
  header.innerHTML = "";
  info.innerHTML = "";
  coordinfo.innerHTML = "";
});

const pointsArray = [poi1, poi2, poi3, poi4, poi5];

pointsArray.forEach((point) => {
  point.marker.on("click", () => {
    sidebar.open("home");
    header.innerHTML = point.name;
    info.innerHTML = `<h4>Läs mer om ${point.name}</h4> \n  ${point.info}`;
    coordinfo.innerHTML = `<h4>Koordinater</h4> \n  ${point.coordinates}`;
  });
});

// polyline measure

options = {
  position: "topleft", // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
  unit: "kilometres", // Default unit the distances are displayed in. Values: 'kilometres', 'landmiles', 'nauticalmiles'
  useSubunits: true, // Use subunits (metres/feet) in tooltips if distances are less than 1 kilometre/landmile
  clearMeasurementsOnStop: true, // Clear all measurements when Measure Control is switched off
  showBearings: false, // Whether bearings are displayed within the tooltips
  bearingTextIn: "In", // language dependend label for inbound bearings
  bearingTextOut: "Out", // language dependend label for outbound bearings
  tooltipTextFinish: "Click to <b>finish line</b><br>",
  tooltipTextDelete: "Press SHIFT-key and click to <b>delete point</b>",
  tooltipTextMove: "Click and drag to <b>move point</b><br>",
  tooltipTextResume: "<br>Press CTRL-key and click to <b>resume line</b>",
  tooltipTextAdd: "Press CTRL-key and click to <b>add point</b>",
  // language dependend labels for point's tooltips
  measureControlTitleOn: "Turn on PolylineMeasure", // Title for the Measure Control going to be switched on
  measureControlTitleOff: "Turn off PolylineMeasure", // Title for the Measure Control going to be switched off
  measureControlLabel: "&#8614;", // Label of the Measure Control (Unicode symbols are possible)
  measureControlClasses: [], // Classes to apply to the Measure Control
  showClearControl: false, // Show a control to clear all the measurements
  clearControlTitle: "Clear Measurements", // Title text to show on the Clear Control
  clearControlLabel: "&times", // Label of the Clear Control (Unicode symbols are possible)
  clearControlClasses: [], // Classes to apply to Clear Control
  showUnitControl: false, // Show a control to change the units of measurements
  unitControlUnits: ["kilometres", "landmiles", "nauticalmiles"],
  // measurement units being cycled through by using the Unit Control
  unitControlTitle: {
    // Title texts to show on the Unit Control
    text: "Change Units",
    kilometres: "kilometres",
    landmiles: "land miles",
    nauticalmiles: "nautical miles",
  },
  unitControlLabel: {
    // Unit symbols to show in the Unit Control and measurement labels
    metres: "m",
    kilometres: "km",
    feet: "ft",
    landmiles: "mi",
    nauticalmiles: "nm",
  },
  unitControlClasses: [], // Classes to apply to the Unit Control
  tempLine: {
    // Styling settings for the temporary dashed line
    color: "#00f", // Dashed line color
    weight: 2, // Dashed line weight
  },
  fixedLine: {
    // Styling for the solid line
    color: "#006", // Solid line color
    weight: 2, // Solid line weight
  },
  arrow: {
    // Styling of the midway arrow
    color: "#000", // Color of the arrow
  },
  startCircle: {
    // Style settings for circle marker indicating the starting point of the polyline
    color: "#000", // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: "#0f0", // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3, // Radius of the circle
  },
  intermedCircle: {
    // Style settings for all circle markers between startCircle and endCircle
    color: "#000", // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: "#ff0", // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3, // Radius of the circle
  },
  currentCircle: {
    // Style settings for circle marker indicating the latest point of the polyline during drawing a line
    color: "#000", // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: "#f0f", // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 6, // Radius of the circle
  },
  endCircle: {
    // Style settings for circle marker indicating the last point of the polyline
    color: "#000", // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: "#f00", // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3, // Radius of the circle
  },
};

/* L.control.polylineMeasure(options).addTo(map); */

L.control
  .scale({
    maxWidth: 240,
    metric: true,
    imperial: false,
    position: "bottomleft",
  })
  .addTo(map);
let polylineMeasure = L.control.polylineMeasure({
  position: "topleft",
  unit: "kilometres",
  showBearings: true,
  clearMeasurementsOnStop: false,
  showClearControl: true,
  showUnitControl: true,
});
polylineMeasure.addTo(map);

// Some constant polyline coords:
const line1coords = [
  { lat: 22.156883186860703, lng: -158.95019531250003 },
  { lat: 22.01436065310322, lng: -157.33520507812503 },
  { lat: 21.391704731036587, lng: -156.17065429687503 },
  { lat: 20.64306554672647, lng: -155.56640625000003 },
  { lat: 19.342244996771804, lng: -155.33569335937503 },
];
const line2coords = [
  { lat: 19.880391767822505, lng: -159.67529296875003 },
  { lat: 17.90556881196468, lng: -156.39038085937503 },
];

polylineMeasure.seed([line1coords, line2coords]);
