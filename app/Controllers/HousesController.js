import { appState } from "../AppState.js";
import { House } from "../Models/house.js";
import { housesService } from "../Services/HousesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js";

function drawHouses() {
  let template = ''
  appState.houses.forEach(house => template += house.houseCardTemplate)
  setHTML('listings', template)
}


export class HousesController {
  constructor() {
    appState.on('houses', drawHouses)
  }

  showHouses() {
    this.getHouses()
    setHTML('forms', House.getHouseForm())
  }
  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.error(error)
    }
  }

  addHouse() {
    // @ts-ignore
    appState.selectedHouse = null
    const template = House.getHouseForm()
    setHTML('forms', template)
  }

  async deleteHouse(id) {
    try {
      housesService.deleteHouse(id)
    } catch (error) {
      console.error('Deleting House', error)
    }
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)
      if (appState.selectedHouse) {
        await housesService.beginEdit(formData)
      } else {
        await housesService.addHouse(formData)
      }
      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('houses', error)
    }
  }

  beginEdit(id) {
    housesService.selectedHouse(id)
    const editable = appState.selectedHouse
    const template = House.getHouseForm(editable)
    setHTML('forms', template)
  }



}
