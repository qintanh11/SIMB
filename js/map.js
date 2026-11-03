(() => {
  const mapElement = document.querySelector("#risk-map");
  if (!mapElement || typeof L === "undefined") return;

  const map = L.map(mapElement, { scrollWheelZoom: false }).setView(
    [-2.5, 116.5],
    4,
  );
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(map);

  const colors = { High: "#d25c4c", Medium: "#e5ad39", Low: "#087d68" };
  const status = document.querySelector("#map-status");

  fetch("data/points.json")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(({ points }) => {
      points.forEach((point) => {
        const marker = L.circleMarker([point.lat, point.lng], {
          radius: 9,
          color: "#fff",
          weight: 2,
          fillColor: colors[point.risk] || colors.Low,
          fillOpacity: 0.92,
        });
        marker.bindPopup(
          `<img class="popup-photo" src="${point.photo}" alt="${point.name}"><h3 class="popup-title">${point.name}</h3><span class="popup-risk">${point.riskLabel} · Risiko longsor</span><p>${point.description}</p>`,
        );
        marker.addTo(map);
      });
      status?.remove();
    })
    .catch((error) => {
      if (status)
        status.textContent =
          "Data peta belum dapat dimuat. Jalankan melalui server lokal.";
      console.error("Gagal memuat data titik longsor:", error);
    });
})();
