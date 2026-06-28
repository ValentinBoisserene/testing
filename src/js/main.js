// 1. Buscamos el contenedor en nuestro HTML donde queremos mostrar los productos
const contenedor = document.getElementById('data-container');

// 2. Hacemos la petición para leer el archivo JSON
fetch('public/assets/data/db.json')
  .then(response => response.json()) // Convierte el texto recibido directamente a un objeto/array de JS
  .then(datos => {
    
    // 3. Recorremos el array de productos que vino del JSON
    datos.forEach(dato => {
      
      // Creamos un div para cada producto usando clases de Tailwind
      const tarjeta = document.createElement('div');
      tarjeta.className = "bg-mist-800 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]";

      // Decidimos qué texto mostrar según la disponibilidad
      const estado = dato.disponible ? 'En stock' : 'Agotado';
      const colorEstado = dato.disponible ? 'text-green-600' : 'text-red-600';

      const precioFormateado = dato.precio.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'ARS' // Puedes cambiarlo por 'USD', 'ARS', 'MXN', etc.
        });
        
      // 4. Metemos la información del JSON dentro del HTML de la tarjeta
      tarjeta.innerHTML = `
        <div class="relative overflow-hidden">
          <img src="${dato.img}" alt="Imagen de ${dato.nombre}" class="w-full h-48 object-cover" />
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${colorEstado} bg-white/60 backdrop-blur-sm">${estado}</span>
        </div>
        <div class="p-6">
            <div class="flex items-start justify-between mb-3">
                <h2 class="text-lg sm:text-xl font-semibold tracking-tight text-slate-100">${dato.nombre}</h2>
                <div class="text-right">
                  <div class="text-sm text-slate-300">Precio</div>
                  <div class="text-lg font-bold text-white">${precioFormateado}</div>
                </div>
            </div>
            ${dato.descripcion ? `<p class="text-sm leading-6 text-slate-300 mb-4 line-clamp-3">${dato.descripcion}</p>` : ''}
            <div class="flex items-center gap-3">
                ${dato.disponible ? `<button class="inline-flex items-center justify-center px-5 py-2 rounded-full bg-cyan-500 text-white text-sm font-semibold transition transform hover:-translate-y-0.5 hover:bg-cyan-400 shadow-md">Añadir al carrito</button>` : ''}
              <button class="px-4 py-2 rounded-full border border-white/10 text-sm text-slate-200 hover:bg-white/5">Ver detalles</button>
            </div>
        </div>
      `;

      // 5. Agregamos la tarjeta al contenedor principal de la página
      contenedor.appendChild(tarjeta);
    });

  })
  .catch(error => console.error("Hubo un error cargando los productos:", error));

