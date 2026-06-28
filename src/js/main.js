// 1. Buscamos el contenedor en nuestro HTML donde queremos mostrar los productos
const contenedor = document.getElementById('data-container');

// 2. Hacemos la petición para leer el archivo JSON
fetch('/public/assets/data/db.json')
  .then(response => response.json()) // Convierte el texto recibido directamente a un objeto/array de JS
  .then(datos => {
    
    // 3. Recorremos el array de productos que vino del JSON
    datos.forEach(dato => {
      
      // Creamos un div para cada producto usando clases de Tailwind
      const tarjeta = document.createElement('div');
      tarjeta.className = "p-4 bg-dark rounded-lg shadow-md border border-gray-200 m-2";

      // Decidimos qué texto mostrar según la disponibilidad
      const estado = dato.disponible ? 'En stock' : 'Agotado';
      const colorEstado = dato.disponible ? 'text-green-600' : 'text-red-600';

      // 4. Metemos la información del JSON dentro del HTML de la tarjeta
      tarjeta.innerHTML = `
        <h3 class="text-xl font-bold text-gray-800">${dato.nombre}</h3>
        <p class="text-gray-600">Precio: $${dato.precio}</p>
        <span class="text-sm font-semibold ${colorEstado}">${estado}</span>
      `;

      // 5. Agregamos la tarjeta al contenedor principal de la página
      contenedor.appendChild(tarjeta);
    });

  })
  .catch(error => console.error("Hubo un error cargando los productos:", error));