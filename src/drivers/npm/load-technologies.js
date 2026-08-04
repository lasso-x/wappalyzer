const fs = require('fs')
const path = require('path')

function loadTechnologies(technologiesDir) {
  let technologies = {}

  for (const index of Array(27).keys()) {
    const character = index ? String.fromCharCode(index + 96) : '_'

    technologies = {
      ...technologies,
      ...JSON.parse(
        fs.readFileSync(path.join(technologiesDir, `${character}.json`))
      ),
    }
  }

  // custom.json is loaded last so fork-specific entries override letter files
  return {
    ...technologies,
    ...JSON.parse(fs.readFileSync(path.join(technologiesDir, 'custom.json'))),
  }
}

module.exports = loadTechnologies
