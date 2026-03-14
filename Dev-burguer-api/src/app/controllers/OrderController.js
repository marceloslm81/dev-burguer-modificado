import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../schemas/Order.js';


class productController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
            products: Yup.array().required().of(
                Yup.object()({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                }),
            ),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false, strict: true });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { userId, userName } = request
        const { products } = request.body;

        const productsIds = products.map(product => product.id);

        const fidedProducts = products.findAll({
            where: {
                id: productsIds,
            },
            include: {
                model: Category,
                as: 'category',
                attributes: ['name'],
            },
        });

        const mapedProducts = fidedProducts.map(product => {

            const quantity = products.find(p => p.id === product.id).quantity;
            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                url: product.url,
                Category: product.category.name,
                quantity,
            }

            return newProduct;

        });

        const order = {
            user: {
                id: userId,
                name: userName,
            },
            products: mapedProducts,
            status: 'Pedido Realizado',
        };

        const newOrder = await Order.create(order);


        return response.status(201).json(newOrder);
    }
    async update(request, response) {
        const schema = Yup.object({
            status: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false, strict: true });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { status } = request.body;
        const { id } = request.params;

        try {
            await Order.updateOne({ _id: id }, { status });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }


        return response.status(200).
        json({message: 'Order status updated successfully'});
    }

    async index(request, response) {
        const orders = await Order.find();

        return response.status(200).json(orders);

    }
}

export default new productController();