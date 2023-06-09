// Initialize the map
var map = L.map("map", {
  scrollWheelZoom: true,
});

var options = {
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

L.control
  .scale({
    maxWidth: 240,
    metric: true,
    imperial: false,
    position: "bottomleft",
  })
  .addTo(map);

let header = document.querySelector("#sidebar-content-header");
let info = document.querySelector("#sidebar-content-info");
let coordinfo = document.querySelector("#sidebar-content-coord");
let closebtn = document.querySelector(".active");

closebtn.addEventListener("click", () => {
  header.innerHTML = "";
  info.innerHTML = "";
  coordinfo.innerHTML = "";
});

// Set the position and zoom level of the map
map.setView([60.1485524676421, 15.18658550868326], 14);

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
var task1Layer = L.featureGroup();
document.getElementById("task1").addEventListener("click", function () {
  if (map.hasLayer(task1Layer)) {
    map.removeLayer(task1Layer);
  } else {
    var marker = L.marker([60.1485524676421, 15.18658550868326]).bindPopup(
      "<h3>Systembolaget</h3><img src='src/images/systemet.png' width='150px'>"
    );

    var latlngs = [
      [60.148620021486515, 15.186545266370326],
      [60.14880862226982, 15.186751817181134],
      [60.1506333983414, 15.189167319357818],
    ];
    var polyline = L.polyline(latlngs, { color: "red" }).bindPopup(
      "<h3>Vägen till parken</h3><img src='src/images/road.png' width='150px'>"
    );

    var polygonCoords = [
      [60.15106722099717, 15.189851388704241],
      [60.15036489973853, 15.188933430332344],
      [60.149889125201, 15.190367266136384],
      [60.150704734478936, 15.191338329538059],
    ];
    var polygon = L.polygon(polygonCoords, { color: "red" }).bindPopup(
      "<h3>Parken</h3><img src='src/images/park.png' width='150px'>"
    );

    task1Layer.addLayer(marker);
    task1Layer.addLayer(polyline);
    task1Layer.addLayer(polygon);

    map.addLayer(task1Layer);
    map.fitBounds(task1Layer.getBounds());
  }
});

/* Task 2) Choose a city and show 5 locations of interest (example: retail stores, museum, school, etc.) using points. Display information like name, location and other information using sidebar for each location. Use “polylineMeasure.seed” to display distances between these locations (i.e., from PolylinMeasure Plugin). */

const markerIcon = L.icon({
  iconUrl: "/src/images/marker-icon2.webp",
  iconSize: [30, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

let polylineMeasure = L.control.polylineMeasure({
  position: "topleft",
  unit: "kilometres",
  showBearings: true,
  clearMeasurementsOnStop: false,
  showClearControl: true,
  showUnitControl: true,
});
polylineMeasure.addTo(map);

var line1coords = [
  { lat: 60.14880505873236, lng: 15.18973373339937 },
  { lat: 60.15146370380727, lng: 15.19057938758252 },
  { lat: 60.156461984224556, lng: 15.181793595763933 },
  { lat: 60.14980734212499, lng: 15.182584641948754 },
  { lat: 60.14547583691965, lng: 15.177413757271246 },
  { lat: 60.14880505873236, lng: 15.18973373339937 },
];

var task2MarkerLayer = L.featureGroup();

var polylayer;
document.getElementById("task2").addEventListener("click", function () {
  if (map.hasLayer(task2MarkerLayer)) {
    map.removeLayer(task2MarkerLayer);
    line1coords = [
      { lat: 60.14880505873233, lng: 15.18973373339237 },
      { lat: 60.15146370380727, lng: 15.19057938758252 },
    ];
  } else {
    polylayer = polylineMeasure.seed([line1coords]);

    var poi1Marker = L.marker([60.14880505873236, 15.18973373339937], {
      icon: markerIcon,
    }).addTo(task2MarkerLayer);
    var poi2Marker = L.marker([60.15146370380727, 15.19057938758252], {
      icon: markerIcon,
    }).addTo(task2MarkerLayer);
    var poi3Marker = L.marker([60.156461984224556, 15.181793595763933], {
      icon: markerIcon,
    }).addTo(task2MarkerLayer);
    var poi4Marker = L.marker([60.14983852230926, 15.182727997743822], {
      icon: markerIcon,
    }).addTo(task2MarkerLayer);
    var poi5Marker = L.marker([60.14547583691965, 15.177413757271246], {
      icon: markerIcon,
    }).addTo(task2MarkerLayer);

    const pointsArray = [
      {
        name: "Folkets hus",
        info: "Folkets hus har väldigt mycket roliga evenemang. ",
        coordinates: "60.14880505873236, 15.18973373339937",
        marker: poi1Marker,
      },
      {
        name: "Donken",
        info: "Ludvikas mest exklusiva restaurang. Här kan du till exempel äta Cheeseburgare eller Dubbel Cheeseburgare. \n\nMcDonalds i Ludvika byggdes i slutet utav 1990-talet",
        coordinates: "60.15146370380727, 15.19057938758252",
        marker: poi2Marker,
      },
      {
        name: "Skuthamn badplats",
        info: "Skuthamn badplats är en familjevänlig badplats där du kan bada, sola och grilla. Det finns även en lekplats för barnen.",
        coordinates: "60.156461984224556, 15.181793595763933",
        marker: poi3Marker,
      },
      {
        name: "Ludvika station",
        info: "Ludvika Station är en järnvägsstation belägen i Ludvika kommun i Dalarnas län. Stationen trafikeras av tåg som går mellan Dalarna och Stockholm, samt tåg som går till gruvorna i Aitik och Gällivare i norra Sverige. Ludvika Station är en viktig transportknutpunkt i regionen och har även ett resecentrum med buss- och taxiförbindelser.",
        coordinates: "60.14983852230926, 15.182727997743822",
        marker: poi4Marker,
      },
      {
        name: "Hitachi energy",
        info: "Hitachi Energy är ett internationellt energiteknikföretag med huvudkontor i Tokyo, Japan. Företaget har verksamhet inom områden som kraftverk, vindkraft, solenergi och energilagring. Hitachi Energy har nyligen etablerat sig i ludvika då dom har köpt upp ABB",
        coordinates: "60.14547583691965, 15.177413757271246",
        marker: poi5Marker,
      },
    ];

    pointsArray.forEach((point) => {
      point.marker.on("click", () => {
        sidebar.open("home");
        header.innerHTML = point.name;
        info.innerHTML = `<h4>Läs mer om ${point.name}</h4> \n  ${point.info}`;
        coordinfo.innerHTML = `<h4>Koordinater</h4> \n  ${point.coordinates}`;
      });
    });

    map.addLayer(task2MarkerLayer);
    map.fitBounds(task2MarkerLayer.getBounds());
  }
});

/*
Task 3) Load “supermarket.geoJSON” file to the map. Display names of the supermarkets using
pop-up. Create a buffer for the locations of supermarkets. The buffer radius should be 1 KM.
Highlight supermarkets that are not overlapping.
*/

var task3Layer = L.featureGroup();
let allBuffers = [];
L.geoJSON(supermarket, {
  onEachFeature: function (feature, layer) {
    var point = turf.point([
      layer.feature.geometry.coordinates[0],
      layer.feature.geometry.coordinates[1],
    ]);
    var buffered = turf.buffer(point, 1, { units: "kilometers" });

    allBuffers.push(buffered);

    layer.bindPopup(feature.properties.name);
  },
});

let allBuffersLayer = L.geoJson(allBuffers, {
  style: {
    color: "red",
    weight: 1,
    opacity: 0.4,
    fillOpacity: 0.1,
  },
});
allBuffersLayer.addTo(task3Layer);

document.getElementById("task3").addEventListener("click", function () {
  if (map.hasLayer(task3Layer)) {
    map.removeLayer(task3Layer);
  } else {
    let buffers = [];

    L.geoJson(supermarket, {
      onEachFeature: function (feature, layer) {
        var point = turf.point([
          layer.feature.geometry.coordinates[0],
          layer.feature.geometry.coordinates[1],
        ]);
        var buffered = turf.buffer(point, 1, { units: "kilometers" });

        var overlap = false;
        allBuffers.forEach(function (otherBuffer) {
          if (turf.booleanOverlap(buffered, otherBuffer)) {
            overlap = true;
          }
        });

        if (!overlap) {
          buffers.push(buffered);
        }

        layer.bindPopup(feature.properties.name);
      },
    }).addTo(task3Layer);

    var bufferLayer = L.geoJson(buffers, {
      style: {
        color: "#3388ff",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.1,
      },
    });

    bufferLayer.addTo(task3Layer);

    map.addLayer(task3Layer);
    map.fitBounds(task3Layer.getBounds());
  }
});

/* Task 4) Use an image to overlay on the basemap. Choose any location in Sweden. */
var task4Layer = L.featureGroup();

document.getElementById("task4").addEventListener("click", function () {
  if (map.hasLayer(task4Layer)) {
    map.removeLayer(task4Layer);
  } else {
    const haggeOverlay = L.imageOverlay("src/images/hagge-gk.png", [
      [60.116373691160035, 15.241719516397076],
      [60.10748627946077, 15.260914498921888],
    ]).addTo(task4Layer);
    haggeOverlay.bringToFront();

    map.addLayer(task4Layer);
    map.fitBounds(task4Layer.getBounds());
  }
});
