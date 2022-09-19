
export class House {

  /**
   * Data to build house
   * @param {{bedrooms: number, bathrooms: number, levels: number, imgUrl: string, year: number, price: number, description: string, id?: string}} data 
   */
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
  }

  get houseCardTemplate() {
    return /*html*/ `
  <div class="col-md-4 mb-3 elevation-3 border border-primary">
    <div class="p-2">
      <img src="${this.imgUrl}" alt="house" class="img-fluid">
        <h4>$${this.price}</h4>
    </div>
    <div>
        <h5>Bedrooms ${this.bedrooms} | Bathrooms ${this.bathrooms}</h5>
        <h5>Levels ${this.levels} | Built ${this.year}</h5>
    </div>
    <div>
        <p>${this.description}</p>
    </div>
    <div class="d-flex justify-content-center gap-3"> 
    <button class="btn text-danger" onclick="app.housesController.deleteHouse('${this.id}')">Delete</button>
    <button class="btn text-primary" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.housesController.beginEdit('${this.id}')">Edit</button>
    </div>
  </div>
`
  }



  /**@param {House} [editable] */
  static getHouseForm(editable) {

    editable = editable || new House({ bedrooms: 0, bathrooms: 0, levels: 0, imgUrl: ' ', year: 1900, price: 0, description: ' ' })

    return /*html*/`

    <form onsubmit="app.housesController.handleSubmit()">
      <div class="form-floating mb-3">
        <input type="url" class="form-control" name="imgUrl">
        <label for="imgUrl" value="${editable.imgUrl}">Picture of House</label>
      </div>
      <div class="form-floating mb-3 p-2">
        <input type="text" class="form-control" name="price" required minlength="1" maxlength="25">
        <label for="price" value="${editable.price}">price</label>
      </div>
      <div class="form-floating mb-3 p-2">
        <input type="text" class="form-control" name="bedrooms" required minlength="1" maxlength="15">
        <label for="bedrooms" value="${editable.bedrooms}">Bedrooms</label>
      </div>
      <div class="form-floating mb-3 p-2">
        <input type="text" class="form-control" name="bathrooms" required minlength="1" maxlength="10">
        <label for="bathrooms" value="${editable.bathrooms}">Bathrooms</label>
      </div>
      <div class="form-floating mb-3 p-2">
        <input type="text" class="form-control" name="levels" required minlength="1" maxlength="10">
        <label for="levels" value="${editable.levels}">levels</label>
      </div>
      <div class="form-floating mb-3 p-2">
        <input type="text" class="form-control" name="year" required minlength="4" maxlength="9999">
        <label for="year" value="${editable.year}">Year</label>
      </div>
      <div class="form-floating p-2">
        <textarea class="form-control" placeholder="describe house" name="description"></textarea>
        <label for="description" value="${editable.description}">Description</label>
      </div>
      <div class="d-flex text-center justify-content-center gap-5">
        <button class="btn btn-success" type="submit">Submit</button>
        <button class="btn btn-danger" type="reset">Cancel</button>
      </div>
    </form>
  </div>
  `
  }
}