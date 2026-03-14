import * as Yup from 'yup';


class CategoryController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { name } = request.body;
        const { id } = request.params;

        let path;
        if (request.file) {
            const { filename } = request.file;
            path = filename;
        }


        const existsCategory = await Category.findOne({
            where: {
                name,
            }
        });

        if (existsCategory) {
            return response.status(400).json({ error: 'Category already exists' });
        }

        await Category.update({
            name,
            path,

        },
    {
                where: {
                    id,
                },
            }
        );


        return response.status(201).json();
    }

    async index(_request, response) {
        const categories = await Category.findAll();

        return response.status(200).json(categories);
    }
}

export default new CategoryController();
