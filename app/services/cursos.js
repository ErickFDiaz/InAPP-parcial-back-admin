const Curso = require('../models/curso');

// =============================================
// CRUD de Cursos (Maestro)
// =============================================

const getAllCursos = () => {
    return Curso.find().sort({ createdAt: -1 }).populate('instructor', 'name email');
};

const getCursoById = (id) => {
    return Curso.findById(id).populate('instructor', 'name email');
};

const getCursosByInstructor = (instructorId, sortOrder) => {
    let sortQuery = { createdAt: -1 }; // default descending by creation date
    if (sortOrder === 'asc') sortQuery = { titulo: 1 };
    if (sortOrder === 'desc') sortQuery = { titulo: -1 };

    return Curso.find({ instructor: instructorId })
        .sort(sortQuery)
        .select('titulo categoria precio');
};

const createCurso = async (cursoData) => {
    const newCurso = new Curso(cursoData);
    await newCurso.save();
    return newCurso;
};

const updateCurso = async (id, cursoData) => {
    const curso = await Curso.findByIdAndUpdate(id, cursoData, { new: true });
    if (!curso) throw new Error('Curso no encontrado.');
    return curso;
};

const deleteCurso = async (id) => {
    const curso = await Curso.findByIdAndDelete(id);
    if (!curso) throw new Error('Curso no encontrado.');
    return curso;
};

// =============================================
// Operaciones sobre Lecciones (Detalle embebido)
// =============================================

const addLeccion = async (cursoId, leccionData) => {
    const curso = await Curso.findById(cursoId);
    if (!curso) throw new Error('Curso no encontrado.');

    curso.lecciones.push(leccionData);
    await curso.save();
    return curso;
};

const updateLeccion = async (cursoId, leccionId, leccionData) => {
    const curso = await Curso.findById(cursoId);
    if (!curso) throw new Error('Curso no encontrado.');

    const leccion = curso.lecciones.id(leccionId);
    if (!leccion) throw new Error('Lección no encontrada.');

    leccion.set(leccionData);
    await curso.save();
    return curso;
};

const deleteLeccion = async (cursoId, leccionId) => {
    const curso = await Curso.findById(cursoId);
    if (!curso) throw new Error('Curso no encontrado.');

    const leccion = curso.lecciones.id(leccionId);
    if (!leccion) throw new Error('Lección no encontrada.');

    curso.lecciones.pull(leccionId);
    await curso.save();
    return curso;
};

module.exports = {
    getAllCursos,
    getCursoById,
    getCursosByInstructor,
    createCurso,
    updateCurso,
    deleteCurso,
    addLeccion,
    updateLeccion,
    deleteLeccion
};
