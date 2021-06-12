const db = require('../../../db');

class CitiesController {
  async createCity(req, res) {
    const { name, postal_code, country_code } = req.body;
    try {
      const newCity = await db.query(`INSERT INTO cities (name, postal_code, country_code) VALUES ($1, $2, $3) RETURNING *`, [name, postal_code, country_code])
      res.json(newCity.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }

  async getCity(req, res) {
    try {
      const newCity = await db.query(`SELECT * FROM cities`)
      res.json(newCity.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }

  async updateCity(req, res) {
    const { name, postal_code, country_code } = req.body;
    try {
      const newCity = await db.query(`UPDATE cities SET postal_code = $1, country_code = $2 WHERE name = $3`, [postal_code, country_code, name])
      res.json(newCity.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }

  async removeCity(req, res) {
    const { name } = req.body;
    try {
      const newCity = await db.query(`DELETE FROM cities WHERE country_code = $1`, [name])
      res.json(newCity.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }
}

module.exports = new CitiesController();