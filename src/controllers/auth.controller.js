import User from "../models/user.model.js";
import Address from "../models/address.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";
export const register = async (req, res) => {
  let savedAddress;

  try {
    const {
      name,
      last_name,
      phone,
      email,
      yearbirth,
      password,
      photo,
      street,
      city,
      state,
      postal_code,
      country,
    } = req.body;

    const userPhoto = photo || null;

    if (
      !name ||
      !last_name ||
      !phone ||
      !email ||
      !yearbirth ||
      !password ||
      !street ||
      !city ||
      !state ||
      !postal_code
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }

    const newAddress = new Address({
      street,
      city,
      state,
      postal_code
    });

    savedAddress = await newAddress.save();

    const userFound = await User.findOne({email})
    if(userFound) return res.status(400).json(["El correo ya esta en uso"])

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      last_name,
      phone,
      email,
      address: savedAddress._id,
      yearbirth,
      password: passwordHash,
      photo: userPhoto,
    });
    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.status(200).json(userSaved);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      res.status(400).json({ error: validationErrors });
    } else {
      res.status(500).json({ error: error.message });
    }
    if (error) {
      await Address.findByIdAndDelete(savedAddress._id);
    }
  }
};

export const login = async (req, res) => {
  
    try {
      const { email, password } = req.body;

      if ( !email || !password) {
        return res
          .status(400)
          .json({ error: "Todos los campos son requeridos." });
      }
      
      const userFound = await User.findOne({email});

      if(!userFound) return res.status(400).json({
        message:"Usuario no encontrado"
      });

      const isMath = await bcrypt.compare(password, userFound.password);

      if(!isMath) return res.status(400).json({
        message: "Contraseña incorrecta"
      });

      const token = await createAccessToken({ id: userFound._id});
      res.cookie("token", token);
      res.status(200).json(userFound);

    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        res.status(400).json({ error: validationErrors });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    })
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});

  return res.status(200).json(userFound)
}

export const verify = async (req, res) => {
  const {token} = req.cookies

  if(!token) return res.status(401).json({message: 'No autorizado'})

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({message: 'No autorizado'});

    const userFound = await User.findById(user.id);
    if(!userFound) return res.status(401).json({message: 'No autorizado'});
    
    return res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email
    });
  })
}