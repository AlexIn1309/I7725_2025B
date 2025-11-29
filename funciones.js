async function cargarCSV() {
  const respuesta = await fetch("datos.csv"); // nombre de tu archivo
  const texto = await respuesta.text();

  const filas = texto
    .trim()
    .split("\n")
    .map((f) => f.split("\t"));
  const tabla = document.getElementById("tabla-csv");

  // Encabezados
  const thead = tabla.createTHead();
  const encabezado = thead.insertRow();
  filas[0].forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    encabezado.appendChild(th);
  });

  // Cuerpo
  const tbody = tabla.createTBody();
  filas.slice(1).forEach((f) => {
    const fila = tbody.insertRow();
    f.forEach((celda) => {
      const td = fila.insertCell();
      td.textContent = celda === "NULL" ? "" : celda;
    });
  });
}

cargarCSV();

async function generarGrafica() {
  const respuesta = await fetch("datos.csv");
  const texto = await respuesta.text();
  const filas = texto
    .trim()
    .split("\n")
    .map((f) => f.split("\t"));

  const indiceEstatus = filas[0].indexOf("estatus");

  const conteo = {};
  filas.slice(1).forEach((f) => {
    const est = f[indiceEstatus];
    if (!conteo[est]) conteo[est] = 0;
    conteo[est]++;
  });

  new Chart(document.getElementById("graficaEstatus"), {
    type: "bar",
    data: {
      labels: Object.keys(conteo),
      datasets: [
        {
          label: "Número de servicios",
          data: Object.values(conteo),
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

generarGrafica();
