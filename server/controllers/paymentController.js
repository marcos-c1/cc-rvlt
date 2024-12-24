const Payment = require("../models/Payment");

class PaymentController {
  static getPayments = async (req, res) => {
    try {
      const payments = await Payment.findAll();
      res.json(payments);
    } catch (e) {
      res.status(500).json(`Erro ao buscar pagamentos: ${e}`);
    }
  };

  static getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
      const payment = await Payment.findOne({
        where: { idPayment: id },
      });
      if (payment) res.json(payment);
      else res.status(404).json(`Pagamento não encontrado`);
    } catch (e) {
      res.status(500).json(`Erro ao buscar pagamento ${id}: ${e}`);
    }
  };

  static createPayment = async (req, res) => {
    try {
      const payment = await Payment.create({
        name: req.body.name,
        subject: req.body.subject,
        type: req.body.type,
        price: req.body.price,
        discount: req.body.discount,
      });

      res.status(201).json(`Pagamento ${payment.id} criado!`);
    } catch (e) {
      res.status(500).json(`Erro ao criar pagamento: ${e}`);
    }
  };

  static updatePaymentById = async (req, res) => {
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
      res.status(202).json(`Pagamento ${id} alterado com sucesso!`);
    } catch (e) {
      res.status(500).json(`Erro ao alterar pagamento: ${e}`);
    }
  };

  static deletePaymentById = async (req, res) => {
    const { id } = req.params;
    try {
      await Payment.destroy({
        where: {
          idPayment: id,
        },
      });
      res.status(200).json(`Pagamento ${id} deletado com sucesso!`);
    } catch (e) {
      res.status(500).json(`Erro ao deletar usuário: ${e}`);
    }
  };
}

module.exports = PaymentController;
