const { faker } = require("@faker-js/faker");

require("dotenv").config();
const dbUri = process.env.DB_HOST;

const main = async () => {
    const mongoose = require("mongoose");
    const connection = await mongoose.createConnection(dbUri);

    const ordersSchema = mongoose.Schema({
        orderId: String,
        price: Number,
        email: String,
        orderDate: Date,
        products: [
            {
                sku: String,
                productName: String,
                price: Number,
            },
        ],
    });
    ordersSchema.index({ orderId: 1 });
    ordersSchema.index({ orderDate: 1 });
    ordersSchema.index({ "products.sku": 1 });
    const Orders = await connection.model("orders", ordersSchema, "orders");

    const ordersToInsert = [];

    for (let i = 0; i < 1000; i++) {
        const price = faker.number.int({ min: 100, max: 1000 });
        const products = [];
        let remainder = price;
        while (remainder > 0) {
            const productPrice = faker.number.int({ min: 1, max: remainder });
            products.push({
                sku: faker.commerce.isbn(10),
                productName: faker.commerce.product(),
                price: productPrice,
            });
            remainder -= productPrice;
        }

        ordersToInsert.push({
            orderId: faker.string.uuid(),
            price,
            orderDate: faker.date.between({
                from: "2023-01-01T00:00:00.000Z",
                to: "2023-10-31T00:00:00.000Z",
            }),

            email: faker.internet.email(),
            products: products,
        });
    }
    await Orders.insertMany(ordersToInsert);
    console.log("done");
};

main();