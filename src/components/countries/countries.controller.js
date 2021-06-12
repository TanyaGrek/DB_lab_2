const db = require('../../../db');

class CountriesController {
  async createCountry(req, res) {
    const { name, postal_code, country_code } = req.body;
    try {
      const newCity = await db.query(`INSERT INTO countries (name, postal_code, country_code) VALUES ($1, $2, $3) RETURNING *`, [name, postal_code, country_code])
      res.json(newCity.rows);
    } catch (e) {
      console.log(e.detail)
    }
  }

  async getCountry(req, res) {
    try {
      const newCity = await db.query(`SELECT * FROM countries`)
      res.json(newCity.rows);
    } catch (e) {
      console.log(e)
      res.json(400, e.detail);
    }
  }

  async updateCountry(req, res) {
    const { name, postal_code, country_code } = req.body;
    try {
      const newCity = await db.query(`UPDATE countries SET postal_code = $1, country_code = $2 WHERE name = $3`, [postal_code, country_code, name])
      res.json(newCity.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }

  async removeCountry(req, res) {
    const { name } = req.body;
    try {
      const newCity = await db.query(`DELETE FROM countries WHERE country_code = $1`, [name])
      res.json(newCity.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }
}

module.exports = new CountriesController();