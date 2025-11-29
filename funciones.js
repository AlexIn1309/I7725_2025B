async function cargarCSV() {
  const respuesta = await fetch("datos.csv"); // nombre de tu archivo
  const texto = await respuesta.text();

  const filas = texto.trim().split("\n").map(f => f.split("\t"));
  const tabla = document.getElementById("tabla-csv");

  // Encabezados
  const thead = tabla.createTHead();
  const encabezado = thead.insertRow();
  filas[0].forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    encabezado.appendChild(th);
  });

  // Cuerpo
  const tbody = tabla.createTBody();
  filas.slice(1).forEach(f => {
    const fila = tbody.insertRow();
    f.forEach(celda => {
      const td = fila.insertCell();
      td.textContent = celda === "NULL" ? "" : celda;
    });
  });
}

cargarCSV();
