import { ProductModel } from "../models/product.js";
import { addProductValidator } from "../validators/products.js";

export const addProducts = async(req, res, next) =>{
    try {
        // upload product image
        // validate product information
        const {error, value} = addProductValidator.validate(req.body);
        if(error) {
            return res.status(422).json(error);

        }
        // save product information in database
        const result = await ProductModel.create(req.body)
        // return response
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export const getProducts = async(req, res) =>{
    try {
        const result = await ProductModel.find();
        res.json(result);
        res.send('All products!');
    } catch (error) {
        next(error);
        
    }

}

export const countProducts =( req, res) => {
    res.send('All products count!');
}

export const updateProduct = (req, res) =>{
    res.send(`Product with id ${req.params.id} updated`);
}

export const deleteProduct =(req, res) =>{
    res.send(`Product with id ${req.params.id} deleted`);
}