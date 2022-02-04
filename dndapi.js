'use strict'

const axios = require('axios');

class Stats {
  constructor(dnd) {
    this.race = tobedetermined;
    this.class = tobedetermined;
  }
}

async function getStats (request, response){
  




  let url = 'dnd api'
  try {
    const statsResults = await axios.get(url)

    let groomedStats = statsResults.data.map(dnd => Stats(dnd));
    response.send(groomedStats)
  }catch (error){
    response.status(404).send('no stats')
  }
}



module.exports = getStats;
