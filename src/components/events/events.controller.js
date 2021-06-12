const db = require('../../../db');

class EventsController {
  async createEvent(req, res) {

    const { title, starts, ends, venue_id } = req.body;
    console.log(title, starts, ends );

    try {
      const newCity = await db.query(`INSERT INTO events (title, starts, ends, venue_id) VALUES ($1, $2, $3, $4) RETURNING *`, [title, starts, ends, venue_id])
      res.json(newCity.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }

  async getEvents(req, res) {
    const searchQuery = req.query.search ? `WHERE LOWER(e.title) LIKE LOWER('${req.query.search}%')` : '';

    const query = `
        SELECT v.name as venue_name, c.name as city_name, e.starts, e.event_id, e.title FROM events e 
            JOIN venues v ON e.venue_id = v.venue_id 
            JOIN cities c ON v.postal_code=c.postal_code AND v.country_code=c.country_code 
            JOIN countries ON c.country_code = countries.country_code
          ${searchQuery};
          `

    try {
      const data = await db.query(query)
      res.json(data.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }

  async updateEvent(req, res) {
    const { name, postal_code, country_code } = req.body;
    try {
      const newCity = await db.query(`UPDATE cities SET postal_code = $1, country_code = $2 WHERE name = $3`, [postal_code, country_code, name])
      res.json(newCity.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }

  async removeEvent(req, res) {
    const { id } = req.params;
    console.log(id)
    try {
      const data = await db.query(`DELETE FROM events WHERE event_id = $1`, [id])
      res.json(data.rows);
    } catch (e) {
      console.log(e);
      res.json(400, e.detail);
    }
  }
}

module.exports = new EventsController();