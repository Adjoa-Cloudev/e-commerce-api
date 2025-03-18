import { ProductModel } from "../models/product.js";
import { addProductValidator } from "../validators/products.js";

export const addProducts = async (req, res, next) => {
    try {
        // upload product image
        console.log(req.body);
        // validate product information
        const { error, value } = addProductValidator.validate({
            ...req.body,
            image: req.file.filename
        });
        if (error) {
            return res.status(422).json(error);

        }
        // save product information in database
        const result = await ProductModel.create(value)
        // return response
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export const getProducts = async (req, res, next) => {
    try {
        console.log(req.file, req.files);
        const { filter = "{}", sort = "{}" } = req.query
        const result = await ProductModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort));
        res.json(result);
    } catch (error) {
        next(error);

    }

}

export const countProducts = (req, res) => {
    res.send('All products count!');
}

export const updateProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} updated`);
}

export const deleteProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} deleted`);
}