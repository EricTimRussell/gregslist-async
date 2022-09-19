import { generateId } from "../Utils/generateId.js";

export class Job {
  /**
   * Data to create Job
   * @param {{company: string, jobTitle: string, hours: number, rate: number, description: string, id?: string}} data 
   */
  constructor(data) {
    this.id = data.id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
  }


  get jobCardTemplate() {
    return /*html*/ `
  <div class="col-md-4 mb-3">
    <div class="card p-2">
      <h6>${this.company}</h6>
      <h6>${this.jobTitle}</h6>
      <h6>${this.hours}</h6>
      <h6>${this.rate}</h6>
      <h6>${this.description}</h6>
    </div>
    <div class="d-flex justify-content-center gap-3"> 
     <button class="btn text-danger" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
     <button class="btn text-primary" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.beginEdit('${this.id}')">Edit</button>
    </div>
  </div>
`
  }


  static getJobsForm() {


    return /*html*/ `

  <form onsubmit="app.jobsController.handleSubmit()">
    <div class="form-floating mb-3 p-2">
      <input type="text" class="form-control" name="company" required minlength="1" maxlength="30">
      <label for="company" value="">company</label>
    </div>
    <div class="form-floating mb-3 p-2">
      <input type="text" class="form-control" name="jobTitle" required minlength="1" maxlength="25">
      <label for="job title" value="">Job Title</label>
    </div>
    <div class="form-floating mb-3 p-2">
      <input type="text" class="form-control" name="hours" required minlength="1" maxlength="10">
      <label for="hours" value="">Hours</label>
    </div>
    <div class="form-floating mb-3 p-2">
      <input type="text" class="form-control" name="rate" required minlength="1" maxlength="10">
      <label for="rate" value="">Rate</label>
    </div>
    <div class="form-floating p-2">
      <textarea class="form-control" placeholder="Give job details" name="description"></textarea>
      <label for="description" value="">Description</label>
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







