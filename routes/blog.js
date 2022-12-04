const express = require("express");

const route = express.Router();

const BlogController = require("../controllers/blog");

//initializes all crud routes of blog

route.get(`/list`, BlogController.AllBlogs);

route
  .get(`/create_blog_form`, (req, res) => {
    res.render(`Pages/createForm/create`);
  })
  .post(`/create_blog_form`, BlogController.createBlog);

route.get(`/edit_cart_form/:id`, BlogController.GetCartById);
route.patch(`/update_blog_form/:id`, BlogController.updateBlog);

route.post(`/create_cart_form`, BlogController.AddToCart);
route.post(`/update_cart_form/:id`, BlogController.UpdateCart);

route.delete(`/delete_cart_form/:id`, BlogController.deleteCart);

module.exports = route;