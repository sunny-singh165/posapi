const orders = {}; // Replace with actual DB

const settleBill = (req, res) => {
  const { orderId } = req.params;
  const { amount, method } = req.body;
  if (!orders[orderId]) return res.status(404).json({ message: 'Order not found' });

  orders[orderId].payment = { amount, method, status: 'paid' };
  res.json({ message: 'Payment settled', orderId });
};

const getPaymentStatus = (req, res) => {
  const { orderId } = req.params;
  const order = orders[orderId];
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order.payment || { status: 'unpaid' });
};

module.exports = { settleBill, getPaymentStatus };