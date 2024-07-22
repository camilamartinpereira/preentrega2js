class Cancion {
    constructor(nombre, duracion) {
        this.nombre = nombre;
        this.duracion = Math.round(duracion); // Duración en minutos, redondeada
    }

    pluralizarMinutos() {
        return this.duracion === 1 ? this.duracion + " minuto" : this.duracion + " minutos";
    }
}

class Playlist {
    constructor(nombre, estadoAnimo) {
        this.nombre = nombre;
        this.estadoAnimo = estadoAnimo;
        this.canciones = [];
        this.duracionTotal = 0;
    }

    agregarCancion() {
        const nombreCancion = prompt("Ingrese el nombre de la canción:");
        let duracionCancion;
        do {
            duracionCancion = prompt("Ingrese la duración de la canción (en minutos):");
        } while (isNaN(duracionCancion) || duracionCancion.trim() === "");

        duracionCancion = parseInt(duracionCancion);

        if (nombreCancion && !isNaN(duracionCancion)) {
            const nuevaCancion = new Cancion(nombreCancion, duracionCancion);
            this.canciones.push(nuevaCancion);
            this.duracionTotal += duracionCancion;
            alert("🎶 Canción agregada con éxito.");
        } else {
            alert("🚫 Por favor, ingrese información válida.");
        }
    }

    eliminarCancion() {
        if (this.canciones.length > 0) {
            const listaCanciones = this.canciones.map((cancion, index) => (index + 1) + ". " + cancion.nombre + ": " + cancion.pluralizarMinutos()).join("\n");
            let numeroCancion;

            do {
                numeroCancion = prompt("Canciones en la playlist " + this.nombre + ":\n" + listaCanciones + "\n\nIngrese el número de la canción que desea eliminar (o 0 para volver):");
                if (numeroCancion === "0") return; // Volver al menú anterior
            } while (isNaN(numeroCancion) || numeroCancion < 1 || numeroCancion > this.canciones.length);

            numeroCancion = parseInt(numeroCancion);

            const cancionEliminada = this.canciones.splice(numeroCancion - 1, 1)[0];
            this.duracionTotal -= cancionEliminada.duracion;
            alert("🎵 Canción eliminada con éxito: " + cancionEliminada.nombre);
        } else {
            alert("🔊 No hay canciones en la playlist " + this.nombre + " para eliminar.");
        }
    }

    verCanciones() {
        if (this.canciones.length > 0) {
            const listaCanciones = this.canciones.map(cancion => cancion.nombre + ": " + cancion.pluralizarMinutos()).join("\n");
            alert("🎵 Canciones en la playlist " + this.nombre + ":\n" + listaCanciones);
        } else {
            alert("🔊 No hay canciones en la playlist " + this.nombre);
        }
    }
}

class SimuladorPlaylists {
    constructor(nombreUsuario, cantidadPlaylists) {
        this.nombreUsuario = nombreUsuario;
        this.playlists = [];

        for (let i = 0; i < cantidadPlaylists; i++) {
            const nombrePlaylist = prompt("Ingrese el nombre de la playlist " + (i + 1) + ":");
            let estadoAnimo;
            do {
                estadoAnimo = prompt("Para poder darte recomendaciones luego te pedimos que le vincules un estado de ánimo \nEjemplo: Felicidad, Tristeza, Melancolía, Festejo\npara tu playlist " + nombrePlaylist + ":");
            } while (/^\d+$/.test(estadoAnimo) || estadoAnimo.trim() === "");

            this.playlists.push(new Playlist(nombrePlaylist, estadoAnimo));
        }

        this.preguntarEditarPlaylists();
    }

    preguntarEditarPlaylists() {
        const editarAhora = prompt("🛠️ ¿Deseas editar las playlists ahora? (sí/no)").toLowerCase();
        if (editarAhora === 'sí' || editarAhora === 'si') {
            this.editarPlaylists();
        } else {
            this.mostrarMenuPrincipal();
        }
    }

    editarPlaylists() {
        let index = 0;
        const totalPlaylists = this.playlists.length;
        const editarPlaylist = () => {
            if (index < totalPlaylists) {
                const playlist = this.playlists[index];
                alert("🎉 Arranquemos con la playlist: " + playlist.nombre);

                let opcionMenu;
                do {
                    opcionMenu = prompt("🌟 Menú de Playlist: " + playlist.nombre + " 🌟\n\n" +
                        "Duración total: " + playlist.duracionTotal + " minutos\n" +
                        "Estado de ánimo: " + playlist.estadoAnimo + "\n\n" +
                        "1️⃣ Agregar canción\n" +
                        "2️⃣ Quitar canción\n" +
                        "3️⃣ Ver lista de canciones\n" +
                        (index < totalPlaylists - 1 ? "4️⃣ Ir a siguiente playlist" : "4️⃣ Volver al menú principal") +
                        "\n\n0️⃣ Volver al menú principal");

                    switch (opcionMenu) {
                        case "1":
                            playlist.agregarCancion();
                            break;
                        case "2":
                            playlist.eliminarCancion();
                            break;
                        case "3":
                            playlist.verCanciones();
                            break;
                        case "4":
                            if (index < totalPlaylists - 1) {
                                index++;
                                editarPlaylist();
                            } else {
                                this.mostrarMenuPrincipal();
                            }
                            return;
                        case "0":
                            this.mostrarMenuPrincipal();
                            return;
                        default:
                            alert("🚫 Opción no válida. Por favor, selecciona una opción válida.");
                    }
                } while (opcionMenu !== "4" && opcionMenu !== "0");
            }
        };

        editarPlaylist();
    }

    mostrarMenuPrincipal() {
        let opcionMenu;
        do {
            opcionMenu = prompt("¡Hola " + this.nombreUsuario + "! 🌟 Menú Principal 🌟\n\n" +
                this.playlists.map((playlist, index) => (index + 1) + "️⃣ " + playlist.nombre).join("\n") +
                "\n\nElige una opción del 1 al " + this.playlists.length + " para gestionar una playlist, " + 
                (this.playlists.length + 1) + " para buscar playlists, " + 
                (this.playlists.length + 2) + " para agregar una nueva playlist o " + 
                (this.playlists.length + 3) + " para salir.");

            const opcionNum = parseInt(opcionMenu);
            if (opcionNum > 0 && opcionNum <= this.playlists.length) {
                this.mostrarMenuPlaylist(opcionNum - 1);
            } else if (opcionNum === this.playlists.length + 1) {
                this.buscarPlaylists();
            } else if (opcionNum === this.playlists.length + 2) {
                this.agregarPlaylist();
            } else if (opcionNum === this.playlists.length + 3) {
                alert("Gracias por usar el simulador de playlists musicales. ¡Hasta luego!");
            } else {
                alert("🚫 Opción no válida. Por favor, selecciona una opción válida.");
            }
        } while (opcionMenu !== (this.playlists.length + 3).toString());
    }

    mostrarMenuPlaylist(index) {
        let opcionMenu;
        const playlist = this.playlists[index];
        do {
            opcionMenu = prompt("🌟 Menú de Playlist: " + playlist.nombre + " 🌟\n\n" +
                "Duración total: " + playlist.duracionTotal + " minutos\n" +
                "Estado de ánimo: " + playlist.estadoAnimo + "\n\n" +
                "1️⃣ Agregar canción\n" +
                "2️⃣ Quitar canción\n" +
                "3️⃣ Ver lista de canciones\n" +
                "4️⃣ Volver al menú principal");

            switch (opcionMenu) {
                case "1":
                    playlist.agregarCancion();
                    break;
                case "2":
                    playlist.eliminarCancion();
                    break;
                case "3":
                    playlist.verCanciones();
                    break;
                case "4":
                    return;
                default:
                    alert("🚫 Opción no válida. Por favor, selecciona una opción válida.");
            }
        } while (opcionMenu !== "4");
    }

    buscarPlaylists() {
        let opcionMenu;
        do {
            opcionMenu = prompt("🔍 Buscar Playlists 🔍\n\n" +
                "1️⃣ Buscar por estado de ánimo\n" +
                "2️⃣ Buscar por duración aproximada\n" +
                "3️⃣ Volver al menú principal");

            switch (opcionMenu) {
                case "1":
                    this.buscarPorEstadoAnimo();
                    break;
                case "2":
                    this.buscarPorDuracionAproximada();
                    break;
                case "3":
                    return;
                default:
                    alert("🚫 Opción no válida. Por favor, selecciona una opción válida.");
            }
        } while (opcionMenu !== "3");
    }

    buscarPorEstadoAnimo() {
        const estadosAnimo = [...new Set(this.playlists.map(playlist => playlist.estadoAnimo))].join(", ");
        let estadoAnimo;
        do {
            estadoAnimo = prompt("Ingrese el estado de ánimo para buscar playlists. Opciones: " + estadosAnimo + ":");
        } while (/^\d+$/.test(estadoAnimo) || estadoAnimo.trim() === "");

        const playlistsFiltradas = this.playlists.filter(playlist => playlist.estadoAnimo.toLowerCase().includes(estadoAnimo.toLowerCase()));
        this.mostrarPlaylistsFiltradas(playlistsFiltradas);
    }

    buscarPorDuracionAproximada() {
        let duracionAproximada;
        do {
            duracionAproximada = prompt("Ingrese la duración aproximada (en minutos):");
        } while (isNaN(duracionAproximada) || duracionAproximada.trim() === "");
        
        duracionAproximada = parseInt(duracionAproximada);

        let playlistCercana = this.playlists.reduce((prev, curr) => {
            return (Math.abs(curr.duracionTotal - duracionAproximada) < Math.abs(prev.duracionTotal - duracionAproximada) ? curr : prev);
        });

        alert("La playlist con la duración más cercana es:\n" + playlistCercana.nombre + " - Duración: " + playlistCercana.duracionTotal + " minutos - Estado de ánimo: " + playlistCercana.estadoAnimo);
    }

    mostrarPlaylistsFiltradas(playlistsFiltradas) {
        if (playlistsFiltradas.length > 0) {
            const listaPlaylists = playlistsFiltradas.map(playlist => playlist.nombre + " - Duración: " + playlist.duracionTotal + " minutos - Estado de ánimo: " + playlist.estadoAnimo).join("\n");
            alert("Playlists encontradas:\n" + listaPlaylists);
        } else {
            alert("🔍 No se encontraron playlists que coincidan con los criterios.");
        }
    }

    agregarPlaylist() {
        const nombrePlaylist = prompt("Ingrese un nombre para identificar la nueva playlist:");
        let estadoAnimo;
        do {
            estadoAnimo = prompt("Para poder hacerte recomendaciones luego te pedimos que selecciones un estado de ánimo para la nueva playlist:");
        } while (/^\d+$/.test(estadoAnimo) || estadoAnimo.trim() === "");

        if (nombrePlaylist && estadoAnimo) {
            this.playlists.push(new Playlist(nombrePlaylist, estadoAnimo));
            alert("🎉 Playlist agregada con éxito.");
        } else {
            alert("🚫 Por favor, ingresa información válida.");
        }
    }
}

function iniciarSimulador() {
    const nombreUsuario = prompt("¡Hola! 😊 Te damos la bienvenida al creador y buscador de Playlist Musicales.\nIngresa tu nombre por favor:");
    let cantidadPlaylists;
    do {
        cantidadPlaylists = prompt("Primero debemos saber cuántas playlists deseas crear (puedes agregar más luego):");
    } while (isNaN(cantidadPlaylists) || cantidadPlaylists <= 0 || !Number.isInteger(Number(cantidadPlaylists)));

    cantidadPlaylists = parseInt(cantidadPlaylists);

    if (nombreUsuario && cantidadPlaylists > 0) {
        const simulador = new SimuladorPlaylists(nombreUsuario, cantidadPlaylists);
    } else {
        alert("🚫 Por favor, ingresa información válida.");
    }
}

iniciarSimulador();
