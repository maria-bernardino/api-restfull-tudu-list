const knex = require('../../db/conection')
const jwt = require('jsonwebtoken')
const hashPassword = require('../../utils/hash-password')

const login = async (req, res) => {
  const { email } = req.body

  try {
    const user = await knex('usuarios').where('email', email).first()
    // falta funcionar a autenticaçao

    const token = jwt.sign({ id: user.id }, hashPassword, { expiresIn: '1d' })

    const { senha: _, ...userInformation } = user

    return res.status(200).json({
      usuario: userInformation,
      token,
    })
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = {
  login,
}