const express = require('express');
const router = express.Router();
const { getUsers, createUser, getUserbyId, auth } = require('../controllers/userController');
const { getProducts, getCategories, createProduct } = require('../controllers/productController');
const { getTables, getTableById } = require('../controllers/tableController');
const { getDeliveryboys } = require('../controllers/deliveryboysController');
const { getPartners } = require('../controllers/partnersController');
const { createOrder, getOrder, getOrders } = require('../controllers/ordersController');
const { listAllKOTs, updateKOTStatus } = require('../controllers/kitchenController');
const { settleBill, getPaymentStatus } = require('../controllers/paymentController');
const { getOrderHistory, generatePDFBill, getReportByDateAndPartner } = require('../controllers/reportController');

router.get('/order-history', getOrderHistory);
router.get('/pdf-bill/:orderId', generatePDFBill);
router.get('/report', getReportByDateAndPartner);

//payment routes for payment gateway
router.post('/settle/:orderId', settleBill);
router.get('/status/:orderId', getPaymentStatus);

//kots routes for kitchen
router.get('/kots', listAllKOTs);
router.put('/kot/:kotId', updateKOTStatus);
// POST routes
router.post('/createuser', createUser);
router.post('/createproduct', createProduct);
router.post('/auth', auth);

router.post('/saveorder', createOrder);


// GET routes
router.get('/getusers', getUsers);
router.get('/getuserbyid/:id', getUserbyId);
router.get('/getproducts/:partnerid', getProducts);
router.get('/getcategories', getCategories);
router.get('/gettables', getTables);
router.get('/gettable/:id', getTableById);
router.get('/getdeliveryboys', getDeliveryboys);
router.get('/getpartners', getPartners);
router.get('/getorders/:restaurantid/:todaydate', getOrders);
router.get('/getorder/:id', getOrder);





module.exports = router;