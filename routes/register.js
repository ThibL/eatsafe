const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");

const Resto = require("../models/Resto");

router.post(
  "/",
  [
    check("name", "Le nom est requis").not().isEmpty(),
    check("email", "Entrer un email valide").isEmail(),
    check("phone", "Entrez un numéro de téléphone").isMobilePhone(),
    check("password", "Entrer un mot de passe de 6 ou plus").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, password } = req.body;

    try {
      let resto = await Resto.findOne({ email: email });
      if (resto) {
        return res
          .status(400)
          .json({ errors: [{ message: "L'utilisateur existe déjà" }] });
      }
      
      resto = new Resto({
        name,
        email,
        phone,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      resto.password = await bcrypt.hash(password, salt);
      await resto.save();

      const payload = {
        resto: {
          id: resto.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;