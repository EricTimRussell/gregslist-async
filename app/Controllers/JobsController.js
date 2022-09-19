import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { housesService } from "../Services/HousesService.js";
import { jobsService } from "../Services/JobsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js";

function drawJobs() {
  let template = ''
  appState.jobs.forEach(job => template += job.jobCardTemplate)
  setHTML('listings', template)

}


export class JobsController {
  constructor() {
    appState.on('jobs', drawJobs)

  }

  showJobs() {
    this.getJobs()
    setHTML('forms', Job.getJobsForm())
  }

  // FORM Data
  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)
      if (appState.selectedHouse) {
        await jobsService.beginEdit(formData)
      } else {
        await jobsService.addJob(formData)
      }
      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('addjob', error)
    }
  }

  addJob() {
    // @ts-ignore
    appState.selectedJob = null
    const template = Job.getJobsForm()
    setHTML('forms', template)
  }
  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error(error)
    }
  }

  async deleteJob(id) {
    try {
      jobsService.deleteJob(id)
    } catch (error) {
      console.error(error)
    }
  }



}