class Config {

  protected config: any
  protected keys: string[]
  protected configPaths: { pathToEnv: string, pathToConfigDir: string }

  constructor(keys: string[]) {

    this.keys = keys
    this.config = null 
  }

  public getField(field: string | string[]) {

    if (!Array.isArray(field)) {
      return this.config[field]
    }

    let level = this.config
    for (let i = 0; i < field.length; i++) {
      level = level[field[i]]
    }

    return level
  }

  public async initConfig() {

    const configJson = await fetch('/config/config.json')
    const json = await configJson.json()

    const config: any = {}

    this.keys.forEach(key => {
      config[key] = json[key]
    })

    this.config = config
    return this
  }

}

const config = new Config([
  "BACKEND_API_BASE_URL"
])

export { Config }

export default config