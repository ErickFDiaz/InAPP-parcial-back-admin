const cursoService = require('../services/cursos');
const responseHandler = require('../helpers/handleResponse');

// =============================================
// CRUD de Cursos (Maestro)
// =============================================

const getAllCursos = async (req, res) => {
    try {
        const cursos = await cursoService.getAllCursos();
        const response = responseHandler.success('Cursos obtenidos exitosamente', cursos);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

const getCursoById = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await cursoService.getCursoById(id);
        if (!curso) {
            const response = responseHandler.notFoundError('Curso no encontrado');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Curso obtenido exitosamente', curso);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

const createCurso = async (req, res) => {
    try {
        const newCurso = await cursoService.createCurso(req.body);
        const response = responseHandler.success('Curso creado exitosamente', newCurso);
        responseHandler.send(res, response, 201);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

const updateCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await cursoService.updateCurso(id, req.body);
        const response = responseHandler.success('Curso actualizado exitosamente', curso);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

const deleteCurso = async (req, res) => {
    try {
        const { id } = req.params;
        await cursoService.deleteCurso(id);
        const response = responseHandler.success('Curso eliminado exitosamente');
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

// =============================================
// Operaciones sobre Lecciones (Detalle)
// =============================================

const addLeccion = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await cursoService.addLeccion(id, req.body);
        const response = responseHandler.success('Lección agregada exitosamente', curso);
        responseHandler.send(res, response, 201);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

const updateLeccion = async (req, res) => {
    try {
        const { id, leccionId } = req.params;
        const curso = await cursoService.updateLeccion(id, leccionId, req.body);
        const response = responseHandler.success('Lección actualizada exitosamente', curso);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

const deleteLeccion = async (req, res) => {
    try {
        const { id, leccionId } = req.params;
        const curso = await cursoService.deleteLeccion(id, leccionId);
        const response = responseHandler.success('Lección eliminada exitosamente', curso);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

module.exports = {
    getAllCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
    addLeccion,
    updateLeccion,
    deleteLeccion
};
