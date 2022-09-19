import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { Pop } from "../Utils/Pop.js";
import { SandboxServer } from "./AxiosService.js";





export class HousesService {
  async getHouses() {
    const res = await SandboxServer.get('/api/houses')
    appState.houses = res.data.map(h => new House(h))
  }

  async addHouse(formData) {
    const res = await SandboxServer.post('/api/houses', formData)
    console.log('HousesService api response', res.data);
    let house = new House(res.data)
    appState.houses = [...appState.houses, house]
  }
  async deleteHouse(id) {
    const yes = await Pop.confirm('Delete House?')
    if (!yes) { return }
    await SandboxServer.delete(`/api/houses/${id}`)
    appState.houses = appState.houses.filter(h => h.id != id)
  }
  async beginEdit(formData) {
    const house = appState.selectedHouse
    const res = await SandboxServer.put(`/api/houses/${house.id}`, formData)
    console.log("edit update response", res.data);
    const updatedHouse = new House(res.data)
    const index = appState.houses.findIndex(h => h.id = house.id)
    appState.houses.splice(index, 1, updatedHouse)
    appState.emit('houses')
  }
  selectedHouse(id) {
    const house = appState.houses.find(h => h.id == id)
    if (!house)
      throw new Error('Bad ID')
    appState.selectedHouse = house
    console.log('selected house', appState.selectedHouse);
  }










}

export const housesService = new HousesService()