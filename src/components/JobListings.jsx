import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const JobListings = ({ isHome = false }) => {
  //const jobListings = isHome?jobs.slice(0, 3):jobs;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/Jobs?_limit=3' : '/api/Jobs';

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('error fetching data' + error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);
  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? 'Recent Jobs' : 'Browse Jobs'}
          </h2>

          {loading ? <Spinner loading={loading} /> : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobListing job={job} key={job.id} />
                ))}
              </div>
            </>
          )}


        </div>
      </section>
    </>
  )
}


JobListings.propTypes = {
  isHome: PropTypes.bool,
};

export default JobListings