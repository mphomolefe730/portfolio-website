import { useEffect, useState } from "react";
import { env } from "../../../configs/environment";
import Papa from 'papaparse';
import { Link } from 'react-router-dom';

export default function AdminAll() {  
  const USERS_CSV_URL = env.GOOGLE_DRIVE_USER;
  const PROJECTS_CSV_URL = env.GOOGLE_DRIVE_PROJECTS_TRACKER;
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageContext, setMessageContext] = useState({
    displayMessage: 'Loading all your  projects...',
    errorMessage: 'Failed to load projects. Please try again later or contact developer.',
    noDataMessage: 'No projects found.'
  });

  // Animated loading bar state
  const length = 19;
  const [position, setPosition] = useState(0);

  // Animated loading bar interval
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 1) % length);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const loadingIndicator = Array(length).fill("-").map((_char, index) => (index === position ? "|" : "=")).join("");

  async function fetchUserProjects(targetUserId) {
    try {
      // 1. Fetch both CSV files concurrently
      const usersResponse = await fetch(USERS_CSV_URL);
      const projectsResponse = await fetch(PROJECTS_CSV_URL);

      if (!usersResponse.ok || !projectsResponse.ok) {
        throw new Error('Failed to retrieve CSV data from Google Drive.');
      }
  
      const usersCsvText = await usersResponse.text();
      const projectsCsvText = await projectsResponse.text();
  
      // 2. Parse Users CSV
      const parsedUsers = Papa.parse(usersCsvText, {
        header: true,
        skipEmptyLines: true,
      }).data;
  
      // 3. Find target user
      const currentUser = parsedUsers.find(
        (user) => user.UserID?.trim() === targetUserId?.trim()
      );
  
      if (!currentUser) {
        console.warn(`User ID "${targetUserId}" not found.`);
        return [];
      }
  
      // 4. Parse Projects CSV
      const parsedProjects = Papa.parse(projectsCsvText, {
        header: true,
        skipEmptyLines: true,
      }).data;
  
      // 5. Handle Admin access vs. Client access
      if (currentUser.Role?.toLowerCase() === 'super' || currentUser.AssignedProjectIDs?.trim() === 'ALL') {
        return parsedProjects; // Admin gets access to all projects
      }
  
      // 6. Extract assigned project IDs
      const assignedIds = currentUser.AssignedProjectIDs
        ? currentUser.AssignedProjectIDs.split('|').map((id) => id.trim())
        : [];
  
      // 7. Filter projects matching assigned IDs or linked via ClientUserID
      const matchingProjects = parsedProjects.filter((project) => {
        const isIdMatch = assignedIds.includes(project.ProjectID?.trim());
        const isClientUserMatch = project.ClientUserID?.trim() === targetUserId?.trim();
        return isIdMatch || isClientUserMatch;
      });
  
      return matchingProjects;
    } catch (error) {
      console.error('Error fetching user projects:', error);
      throw error;
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchUserProjects('019fd2ef-c194-7151-b2c1-6d4de1fb5ed7')
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching projects for user:', err);
        setError('Failed to load projects.');
        setMessageContext((prev) => ({
          ...prev,
          displayMessage: prev.errorMessage
        }));
        setLoading(false);
      });
  }, []);

  // Loading State Screen
  if (loading) {
    return (
      <div style={{ margin: "auto", maxWidth: "600px", textAlign: "center", alignContent: "center", position: 'relative', height: "80svh" }}>
        <h1> {loadingIndicator} </h1>
        <p className="company_name"> {messageContext.displayMessage.toUpperCase()}</p>
      </div>
    );
  }

  // Error or No Data Screen
  if (error || projects.length === 0) {
    return (
      <div style={{ margin: "auto", maxWidth: "600px", textAlign: "center", alignContent: "center", position: 'relative', height: "80svh" }}>
        <p className="company_name">
          {error ? messageContext.errorMessage.toUpperCase() : messageContext.noDataMessage.toUpperCase()}
        </p>
      </div>
    );
  }

  return (
    <div className='cardGrid'>
      {projects.map((proj) => {
        // Determine category badge using CurrentPhase or Status
        const badgeCategory = proj.CurrentPhase || proj.Status || 'Project';
        
        // Check if a valid demo video URL is available to enable visual styling
        const hasVideo = Boolean(proj.DemoVideoURL && proj.DemoVideoURL.trim() !== '');

        return (
          <Link
            to={`/admin/status/${proj.ProjectID}`}
            key={proj.ProjectID}
            className={`musicCard${hasVideo ? '' : ' noImage'}`}
          >
            <div className='musicCardScrim' />
            
            {/* Progress badge pill */}
            <div className='musicCardBadge'>{proj.OverallProgress}%</div>
            
            <div className='musicCardText'>
              <p className='musicCardCategory'>{badgeCategory}</p>
              <h3 className='musicCardTitle'>{proj.ProjectName}</h3>
              
              {/* Status & Timeline details */}
              <p className='musicCardDescription'>
                Status: {proj.Status} • Target: {proj.TargetCompletion}
              </p>
              
              {/* Optional progress visual bar */}
              <div className='progressBarTrack' style={{ marginTop: '8px', background: 'rgba(255,255,255,0.2)', height: '4px', borderRadius: '2px' }}>
                <div 
                  className='progressBarFill' 
                  style={{ 
                    width: `${proj.OverallProgress}%`, 
                    background: '#4caf50', 
                    height: '100%', 
                    borderRadius: '2px' 
                  }} 
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}