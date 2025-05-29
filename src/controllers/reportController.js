const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const orders = {}; // Shared mock DB for demonstration

const getOrderHistory = (req, res) => {
  res.json(Object.values(orders));
};

const generatePDFBill = (req, res) => {
  const { orderId } = req.params;
  const order = orders[orderId];
  if (!order) return res.status(404).json({ message: 'Order not found' });

  const doc = new PDFDocument();
  const filePath = path.join(__dirname, `../../temp/bill-${orderId}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(16).text(`Order Bill - ID: ${orderId}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Order Type: ${order.type}`);
  doc.text(`Payment Status: ${order.payment?.status || 'unpaid'}`);
  doc.text(`Amount: ${order.payment?.amount || '-'}`);

  doc.end();

  doc.on('finish', () => {
    res.download(filePath);
  });
};

const getReportByDateAndPartner = (req, res) => {
  const { startDate, endDate, partnerId } = req.query;
  const filteredOrders = Object.values(orders).filter(order => {
    const date = new Date(order.createdAt);
    return (!startDate || new Date(startDate) <= date) &&
           (!endDate || new Date(endDate) >= date) &&
           (!partnerId || order.partnerId === partnerId);
  });
  res.json(filteredOrders);
};

module.exports = { getOrderHistory, generatePDFBill, getReportByDateAndPartner };
