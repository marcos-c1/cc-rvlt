const Course = require("../models/Course");
const path = require("path");

class CourseController {
  static getCourses = async (req, res) => {
    try {
      const courses = await Course.findAll();
      res.json(courses);
    } catch (e) {
      res.status(500).json(`Erro ao buscar cursos: ${e}`);
    }
  };

  static getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
      const course = await Course.findOne({
        idCourse: id,
      });
      if (course) res.json(course);
      else res.status(404).json(`Curso não encontrado`);
    } catch (e) {
      res.status(500).json(`Erro ao buscar curso ${id}: ${e}`);
    }
  };

  static createCourse = async (req, res) => {
    try {
      const course = await Course.create({
        name: req.body.name,
        subject: req.body.subject,
        type: req.body.type,
        videoPath: path.join(__dirname, `../static/videos/${req.body.video}`),
        imagePath: path.join(__dirname, `../static/imgs/${req.body.image}`),
      });

      res.status(201).json(`Curso ${course.id} criado!`);
    } catch (e) {
      res.status(500).json(`Erro ao criar curso: ${e}`);
    }
  };

  static updateCourseById = async (req, res) => {
    const { id } = req.params;
    try {
      await Course.update(
        {
          name: req.body.name,
          subject: req.body.subject,
          type: req.body.type,
          videoPath: path.join(__dirname, `../static/videos/${req.body.video}`),
          imagePath: path.join(__dirname, `../static/imgs/${req.body.image}`),
        },
        {
          where: {
            idCourse: id,
          },
        },
      );
      res.status(202).json(`Curso ${id} alterado com sucesso!`);
    } catch (e) {
      res.status(500).json(`Erro ao alterar curso: ${e}`);
    }
  };

  static deleteCourseById = async (req, res) => {
    const { id } = req.params;
    try {
      await Course.destroy({
        where: {
          idCourse: id,
        },
      });
      res.status(200).json(`Curso ${id} deletado com sucesso!`);
    } catch (e) {
      res.status(500).json(`Erro ao deletar usuário: ${e}`);
    }
  };
}

module.exports = CourseController;
