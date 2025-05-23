import { Router } from "express";
import { addProducts, countProducts, deleteProduct, getProducts, updateProduct } from "../controllers/products.js";
import { localUpload, remoteUpload } from "../middlewares/upload.js";

//create products router
const productsRouter = Router();

//Define routes
// productsRouter.post(
//     "/products",
//     productImageUpload.single("image"),
//     productPicturesUpload.array("pictures", 3),
//     addProduct
//   );
  




productsRouter.get('/products' , getProducts);

productsRouter.get('/products/count' , countProducts);

productsRouter.patch('/products/:id' , updateProduct);

productsRouter.delete('/products/:id' , deleteProduct);

//Export router
export default productsRouter;