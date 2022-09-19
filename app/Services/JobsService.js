import { appState } from "../AppState.js";
import { Job } from "../Models/job.js";
import { Pop } from "../Utils/Pop.js";
import { SandboxServer } from "./AxiosService.js";


export class JobsService {
  beginEdit(formData) {
    // ANCHOR 
  }
  async deleteJob(id) {
    const yes = await Pop.confirm('Delete Job Listing?')
    if (!yes) { return }
    await SandboxServer.delete(`/api/jobs/${id}`)
    appState.jobs = appState.jobs.filter(j => j.id != id)
  }
  async addJob(formData) {
    const res = await SandboxServer.post('/api/jobs', formData)
    console.log('JobsService server response', res.data);
    let job = new Job(res.data)
    appState.jobs = [...appState.jobs, job]
  }
  async getJobs() {
    const res = await SandboxServer.get('/api/jobs')
    appState.jobs = res.data.map(j => new Job(j))
  }

}

export const jobsService = new JobsService()
