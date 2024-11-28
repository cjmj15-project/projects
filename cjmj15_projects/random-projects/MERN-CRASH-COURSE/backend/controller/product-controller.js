import mongoose from "mongoose";
import Product from "../models/product.model.js";

const createProduct = async (req, res) => {
  {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newProduct = new Product(product);
    try {
      await newProduct.save();
      res.status(201).json({
        success: true,
        data: newProduct,
      });
    } catch (error) {
      console.error("Error creating the product", error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server ERROR",
      });
    }
  }
};

const getProducts = async (req, res) => {
  {
    try {
      const allProducts = await Product.find({});
      res.status(200).json({
        success: true,
        data: allProducts,
      });
      console.log(Product);
      // console.dir(Product, { depth: 2 });
    } catch (error) {
      console.error(error);
    }
  }
};

const updateProduct = async (req, res) => {
  {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Product Id" });
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      res.status(200).json({
        success: true,
        data: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Product.findByIdAndDelete(id);
    console.log(item);

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Invalid product ID" });
    // }
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "item does not exist" });
    }
    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not Found",
    });
    console.log("Error deleting a product:", error.message);
  }
};

export default { createProduct, getProducts, updateProduct, deleteProduct };

// anotherFile.js
