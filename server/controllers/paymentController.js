const Payment = require("../models/Payment");

class PaymentController {
  static async getPayments(req, res) {
    try {
      const payments = await Payment.findAll();
      return res.status(200).json(payments);
    } catch (e) {
      return res.status(500).json(`Erro ao buscar pagamentos: ${e}`);
    }
  }

  static async getPaymentById(req, res) {
    const { id } = req.params;

    try {
      const payment = await Payment.findOne({
        where: { idPayment: id },
      });
      if (!payment) return res.status(404).json(`Pagamento não encontrado`);
      return res.json(payment);
    } catch (e) {
      return res.status(500).json(`Erro ao buscar pagamento ${id}: ${e}`);
    }
  }

  static async createPayment(req, res) {
    try {
      const payment = await Payment.create({
        name: req.body.name,
        subject: req.body.subject,
        type: req.body.type,
        price: req.body.price,
        discount: req.body.discount,
      });
      return res.status(201).json(`Pagamento ${payment.id} criado!`);
    } catch (e) {
      return res.status(500).json(`Erro ao criar pagamento: ${e}`);
    }
  }

  static async updatePaymentById(req, res) {
    const { id } = req.params;
    try {
      await Payment.update(
        {
          name: req.body.name,
          subject: req.body.subject,
          type: req.body.type,
          price: req.body.price,
          discount: req.body.discount,
        },
        {
          where: {
            idPayment: id,
          },
        },
      );
      return res.status(202).json(`Pagamento ${id} alterado com sucesso!`);
    } catch (e) {
      return res.status(500).json(`Erro ao alterar pagamento: ${e}`);
    }
  }

  static async deletePaymentById(req, res) {
    const { id } = req.params;
    try {
      await Payment.destroy({
        where: {
          idPayment: id,
        },
      });
      return res.status(200).json(`Pagamento ${id} deletado com sucesso!`);
    } catch (e) {
      return res.status(500).json(`Erro ao deletar usuário: ${e}`);
    }
  }
}

module.exports = PaymentController;
