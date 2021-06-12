const db = require('../../../db');

class VenuesController {

  async getVenues(req, res) {
    console.log(req.body)
    try {
      const data = await db.query(`SELECT * FROM venues`)
      res.json(data.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }
}

module.exports = new VenuesController();