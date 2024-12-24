const Course = require("../models/Course");
const path = require("path");

class CourseController {
  static async getCourses(req, res) {
    try {
      const courses = await Course.findAll();
      return res.status(200).json(courses);
    } catch (e) {
      return res.status(500).json(`Erro ao buscar cursos: ${e}`);
    }
  }

  static async getCourseById(req, res) {
    const { id } = req.params;

    try {
      const course = await Course.findOne({
        where: {
          idCourse: id,
        },
      });
      if (!course) return res.status(404).json(`Curso não encontrado`);
      return res.status(200).json(course);
    } catch (e) {
      return res.status(500).json(`Erro ao buscar curso ${id}: ${e}`);
    }
  }

  static async createCourse(req, res) {
    try {
      const course = await Course.create({
        name: req.body.name,
        subject: req.body.subject,
        type: req.body.type,
        videoPath: path.join(__dirname, `../static/videos/${req.body.video}`),
        imagePath: path.join(__dirname, `../static/imgs/${req.body.image}`),
      });

      return res.status(201).json(`Curso ${course.id} criado!`);
    } catch (e) {
      return res.status(500).json(`Erro ao criar curso: ${e}`);
    }
  }

  static async updateCourseById(req, res) {
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
      return res.status(202).json(`Curso ${id} alterado com sucesso!`);
    } catch (e) {
      return res.status(500).json(`Erro ao alterar curso: ${e}`);
    }
  }

  static deleteCourseById = async (req, res) => {
    const { id } = req.params;
    try {
      await Course.destroy({
        where: {
          idCourse: id,
        },
      });
      return res.status(200).json(`Curso ${id} deletado com sucesso!`);
    } catch (e) {
      return res.status(500).json(`Erro ao deletar usuário: ${e}`);
    }
  };
}

module.exports = CourseController;
