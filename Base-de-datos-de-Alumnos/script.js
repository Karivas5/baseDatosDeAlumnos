// 1. Crear una clase alumno, la cual debe incluir:
//nombre, apellidos, edad, materias inscritas, calificaciones.
class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = {};
    }

    inscribirMateria(materia) {
        if (!this.materias[materia]) {
            this.materias[materia] = null;
        }
    }

    asignarCalificacion(materia, calificacion) {
        if (this.materias[materia] !== undefined) {
            this.materias[materia] = calificacion;
        }
    }

    obtenerPromedio() {
        const calificaciones = Object.values(this.materias).filter(c => c !== null);
        const total = calificaciones.reduce((acc, cal) => acc + cal, 0);
        return calificaciones.length ? total / calificaciones.length : 0;
    }
}

// 2. Alta de Alumnos
class Grupo {
    constructor(nombre) {
        this.nombre = nombre;
        this.alumnos = [];
    }

    agregarAlumno(alumno) {
        if (!this.alumnos.includes(alumno)) {
            this.alumnos.push(alumno);
        }
    }

    obtenerPromedioGrupo() {
        const total = this.alumnos.reduce((acc, alumno) => acc + alumno.obtenerPromedio(), 0);
        return this.alumnos.length ? total / this.alumnos.length : 0;
    }

    obtenerAlumnosOrdenados(ascendente = true) {
        return this.alumnos.slice().sort((a, b) => {
            const promA = a.obtenerPromedio();
            const promB = b.obtenerPromedio();
            return ascendente ? promA - promB : promB - promA;
        });
    }
}

// 3. Después deberás crear funciones y vistas que les ayuden a hacer lo siguiente:
//Incribir un alumno a una clase
//Asignarle sus calificaciones
//Crear grupos y asignarle alumnos
const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
const grupos = JSON.parse(localStorage.getItem('grupos')) || {};

// 4. Ya que tengan sus grupos con alumnos, deberán crear e implementar las siguientes funciones:
//Buscar por nombre
//Buscar por apellido
//Obtener promedio del grupo
//Obtener lista de alumnos ordenados ascendente y descendente por calificación
//Con los datos almacenados en la clase, deben agregar otro ordenamiento o búsqueda bajo el parámetro que quieran.
document.getElementById('form-alta-alumno').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = parseInt(document.getElementById('edad').value);

    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    alert('Alumno agregado exitosamente.');
    this.reset();
});

document.getElementById('buscar-alumno').addEventListener('click', function() {
    const nombreBuscar = document.getElementById('nombre-buscar').value.toLowerCase();
    const resultadoBusqueda = alumnos.filter(a => a.nombre.toLowerCase() === nombreBuscar);

    const resultadoDiv = document.getElementById('resultado-busqueda');
    if (resultadoBusqueda.length > 0) {
        const alumno = resultadoBusqueda[0];
        resultadoDiv.innerHTML = `
            <p>Alumno: ${alumno.nombre} ${alumno.apellidos}</p>
            <p>Edad: ${alumno.edad}</p>
            <form id="form-materia">
                <label for="materia">Materia:</label>
                <input type="text" id="materia">
                <label for="calificacion">Calificación:</label>
                <input type="number" id="calificacion">
                <button type="button" id="asignar-calificacion" data-nombre="${alumno.nombre}">Asignar Calificación</button>
            </form>
        `;
        document.getElementById('form-materia').style.display = 'block';
    } else {
        resultadoDiv.innerHTML = '<p>Alumno no encontrado.</p>';
    }
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'asignar-calificacion') {
        const nombreAlumno = e.target.getAttribute('data-nombre');
        const materia = document.getElementById('materia').value;
        const calificacion = parseFloat(document.getElementById('calificacion').value);

        const alumno = alumnos.find(a => a.nombre === nombreAlumno);
        if (alumno) {
            alumno.asignarCalificacion(materia, calificacion);
            localStorage.setItem('alumnos', JSON.stringify(alumnos));
            alert('Calificación asignada exitosamente.');
        }
    }
});

document.getElementById('crear-grupo').addEventListener('click', function() {
    const nombreGrupo = document.getElementById('grupo-nombre').value;
    if (!grupos[nombreGrupo]) {
        grupos[nombreGrupo] = new Grupo(nombreGrupo);
        localStorage.setItem('grupos', JSON.stringify(grupos));
        actualizarSelectGrupos();
        alert('Grupo creado exitosamente.');
    } else {
        alert('El grupo ya existe.');
    }
});

document.getElementById('agregar-alumno').addEventListener('click', function() {
    const nombreGrupo = document.getElementById('grupo-seleccion').value;
    const nombreAlumno = document.getElementById('alumno-seleccion').value;

    const grupo = grupos[nombreGrupo];
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);

    if (grupo && alumno) {
        grupo.agregarAlumno(alumno);
        localStorage.setItem('grupos', JSON.stringify(grupos));
        alert('Alumno agregado al grupo exitosamente.');
    }
});

document.getElementById('reportar-promedio-alumno').addEventListener('click', function() {
    const nombreBuscar = prompt('Nombre del Alumno:')
});
