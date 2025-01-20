import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from '../src/pages/HomePage';
import MainLayout from '../src/layouts/MainLayout';
import JobsPage from '../src/pages/JobsPage';
import JobPage,{jobLoader} from '../src/pages/JobPage';
import AddJobPage from '../src/pages/AddJobPage';
import { NotFoundPage } from './pages/NotFoundPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  //Add New job
  const addJob = async (newJob) => {
    const res = await fetch('/api/Jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };
  //Delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/Jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };
  //edit job
  const editJob = async (id, updatedJob) => {
    const res = await fetch(`/api/Jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    });
    return;
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit = {editJob}/>} loader={jobLoader} />
        <Route path='/jobs/:id' element={<JobPage deleteJob = {deleteJob}/>} loader={jobLoader} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit = {addJob} />}  />
        <Route path='*' element={<NotFoundPage />} />
  
      </Route>
    )
  );
  return <RouterProvider router={router} />;

}

export default App