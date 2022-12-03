const fs = require("fs");
const nodemailer = require("nodemailer");
const productModel = require("../models/product.model");
const { PATH_IMG_PRODUCT } = require("../shared/utils/const.utils");

const controller = {
  async getAllProducts(res) {
    try {
      const results = await productModel.find();
      res.json({ results });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  async getOneProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await productModel.findById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  async paymentGateway(req, res) {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: 'gustave.koss@ethereal.email',
        pass: 'JNqGUhhj946S9ZhQsx'
      }
    })

    const mailOptions = {
      from: 'registro@empresa.com',
      to: 'bryamtalledog@gmail.com',
      subject: 'Paga de productos',
      html: `<p>Hola<p>
             <p>Bienvenido a nuestra plataforma.
                Para activar tu usuario, haz clic en el siguiente enlace:</p>
             <p><a href="/usuarios/activar/">Activar cuenta</a></p>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.sendStatus(500).send(error.message)
      }
      else {
        console.log("Email enviado correctamente")
        res.sendStatus(200).jsonp(req.body)
      }
    })
  },
  async createProduct(req, res) {
    const { category, name, description, stock, price, image, image64 } =
      req.body;
    const product = new productModel();
    product.category = category;
    product.name = name;
    product.description = description;
    product.stock = stock;
    product.price = price;
    if (image) {
      const buffer = Buffer.from(image64, "base64");
      fs.writeFileSync(`${PATH_IMG_PRODUCT}${image}`, buffer);
      product.image = image;
    }

    try {
      const result = await product.save();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  async getSuggestionEvent(req, res) {
    const { categoryId, productId } = req.body;
    const allProducts = await productModel.find();
    try {
      const indexForDeletion = await allProducts.findIndex(
        (product) => String(product._id) === productId
      );

      allProducts.splice(indexForDeletion, 1);

      const results = await allProducts.map((product) => {
        const findCategory = product.category.findIndex(
          (cat) => String(cat.categoryId) === categoryId
        );

        if (findCategory !== -1) {
          return product;
        }
      });

      await res.json({ results });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  async updateProduct({ params, body }, res) {
    const { id } = params;
    const { category, name, description, stock, price, state } = body;
    const update = {
      category,
      name,
      description,
      stock,
      price,
      state,
    };

    try {
      const result = await productModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  async updateAllProduct({ params, body }, res) {
    const { id } = params;
    const {
      category,
      name,
      description,
      stock,
      price,
      image,
      image_actual,
      image64,
      state,
    } = body;
    const update = {
      category,
      name,
      description,
      stock,
      price,
      state,
    };

    if (image) {
      if (image_actual != "default.png") {
        fs.unlinkSync(PATH_IMG_PRODUCT + image_actual);
      }
      const buffer = Buffer.from(image64, "base64");
      fs.writeFileSync(PATH_IMG_PRODUCT + image, buffer);
      update["image"] = image;
    }
    try {
      const result = await productModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
};

module.exports = controller;
