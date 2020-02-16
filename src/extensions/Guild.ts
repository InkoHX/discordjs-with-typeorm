import { Structures } from 'discord.js'
import { GuildSettings } from '../entities/GuildSettings'

declare module 'discord.js' {
  interface Guild {
    getSettings(): Promise<GuildSettings>
  }
}

export default Structures.extend('Guild', BaseClass => {
  return class extends BaseClass {
    public async getSettings (): Promise<GuildSettings> {
      const settings = await GuildSettings.findOne({ id: this.id })

      if (!settings) return new GuildSettings(this)
      
      return settings
    }
  }
})
