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

var polygon = L.polygon(polygonCoords, { color: "red" })
  .addTo(map)
  .bindPopup("<h3>Parken</h3><img src='src/images/park.png' width='150px'>");

const poi1 = L.marker([60.14880505873236, 15.18973373339937]).addTo(map);

poi1.on("click", () => {
  sidebar.setContent("riktigt gött med folkets hus");
  sidebar.show();
});
