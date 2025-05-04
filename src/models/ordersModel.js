const db = require('../config/db');

exports.createOrder = async (orderdata) => {
    const date = orderdata.orderdate
    let orderId = orderdata.id;
    try {

        if (orderId == 0 ){
            const [orderResult] = await db.execute(
                'INSERT INTO orders (tablename,partner,ordertype,deliveryboy, orderdate) VALUES (?,?,?,?,?)',
                [JSON.stringify(orderdata.selectedTable), JSON.stringify(orderdata.selectedPartner), orderdata.ordertype, JSON.stringify(orderdata.deliveryBoy), orderdata.orderdate]
            );
        
        
        orderId = orderResult.insertId;
    }

        if (orderdata.kots.length > 0) {
            for (const kot of orderdata.kots) {
                const [kotResult] = await db.execute(
                    'INSERT INTO kots (orderid, kotdate) VALUES (?,?)',
                    [orderId, date]
                );
                const kotId = kotResult.insertId;

                for (const item of orderdata.cart) {
                    await db.execute(
                        'INSERT INTO carts (prodid,prodname,produom, qty, rate, dis, kotid,orderid) VALUES (?, ?, ?, ?, ?, ?,?,?)',
                        [item.id, item.prodname, item.produom, item.qty, item.rate, item.dis, kotId, orderId]
                    );
                }
            }
        } else {

            const [kotResult] = await db.execute(
                'INSERT INTO kots (orderId, kotdate) VALUES (?,?)',
                [orderId, date]
            );
            const kotId = kotResult.insertId;

            for (const item of orderdata.cart) {
                await db.execute(
                    'INSERT INTO carts (prodid,prodname,produom, qty, rate, dis, kotid) VALUES (?, ?, ?, ?, ?, ?,?)',
                    [item.id, item.prodname, item.produom, item.qty, item.rate, item.dis, kotId]
                );
            }

        }

        return ({ message: 'Order created', orderId });
    } catch (err) {
        console.error(err);
        return 'Failed to create order';
    }
};

exports.getOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const [orderRows] = await db.execute('SELECT * FROM orders WHERE id = ?', [orderId]);
        if (orderRows.length === 0) return res.status(404).send('Order not found');

        const [kotRows] = await db.execute('SELECT * FROM kots WHERE orderId = ?', [orderId]);

        for (let kot of kotRows) {
            const [items] = await db.execute('SELECT * FROM cart_items WHERE kotId = ?', [kot.id]);
            kot.cartItems = items;
        }


        res.json({ ...orderRows[0], kots: kotRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching order');
    }
};



exports.getAllOrders = async (req, res) => {
    try {
        // Get all orders
        const [orders] = await db.execute('SELECT * FROM orders where status = 0');

        // Get all KOTs
        const [kots] = await db.execute('SELECT * FROM kots');

        // Get all Cart Items
        const [cart] = await db.execute('SELECT * FROM carts');

        // Build associations
        const orderMap = {};

        orders.forEach(order => {
            order.kots = [];
            order.tablename = JSON.parse(order.tablename)
            order.partner = JSON.parse(order.partner)
            order.deliveryboy = JSON.parse(order.deliveryboy)
            orderMap[order.id] = order;
        });

        const kotMap = {};

        kots.forEach(kot => {
            kot.cart = [];
            if (orderMap[kot.orderid]) {
                orderMap[kot.orderid].kots.push(kot);
                kotMap[kot.id] = kot;
            }
        });

        cart.forEach(item => {
            if (kotMap[item.kotid]) {
                kotMap[item.kotid].cart.push(item);
            }
        });

        return Object.values(orderMap);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching all orders');
    }
};