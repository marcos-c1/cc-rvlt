const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");

router.get("/pagamentos", PaymentController.getPayments);
router.get("/pagamento/:id", PaymentController.getPaymentById);
router.post("/pagamento", PaymentController.createPayment);
router.put("/pagamento/:id", PaymentController.updatePaymentById);
router.delete("/pagamentos/:id", PaymentController.deletePaymentById);

module.exports = router;
