import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useParams } from 'react-router';
import { env } from '../../../configs/environment';

const PROJECTS_CSV_URL = env.GOOGLE_DRIVE_PROJECTS_TRACKER;
const LOGS_CSV_URL = env.GOOGLE_DRIVE_PROJECTS_TRACKER_LOGS; // Add your 3rd CSV URL in environment configs

export default function AdminProjectProgress() {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageContext, setMessageContext] = useState({
        displayMessage: 'Loading projects progress...',
        errorMessage: 'Failed to load project status. Please try again later or contact developer.',
        noDataMessage: 'No progress data found for this project.'
    });

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

    useEffect(() => {
        const fetchProjectAndLogsData = async () => {
            try {
                // Fetch both Projects tracker and Logs CSV concurrently
                const projectsRes = await fetch(PROJECTS_CSV_URL);
                const logsRes = LOGS_CSV_URL ? await fetch(LOGS_CSV_URL) : null;

                const projectsCsvText = await projectsRes.text();

                // 1. Parse Project Tracker CSV
                Papa.parse(projectsCsvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const data = results.data;
                        const match = data.find((item) => item.ProjectID === projectId);
                        setProjectData(match || null);
                    },
                });

                // 2. Parse Logs CSV if available
                if (logsRes) {
                    const logsCsvText = await logsRes.text();
                    Papa.parse(logsCsvText, {
                        header: true,
                        skipEmptyLines: true,
                        complete: (results) => {
                            const filteredLogs = results.data.filter((item) => item.ProjectID === projectId);
                            setLogs(filteredLogs);
                        },
                    });
                }

                setLoading(false);
            } catch (err) {
                setMessageContext((prev) => ({
                    ...prev,
                    displayMessage: messageContext.errorMessage
                }));
                console.error('Error fetching tracker sheet:', err);
                setError('Failed to load project status.');
                setLoading(false);
            }
        };

        fetchProjectAndLogsData();
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

    // No Data or Error Screen
    if (!projectData || error) {
        return (
            <div style={{ margin: "auto", maxWidth: "600px", textAlign: "center", alignContent: "center", position: 'relative', height: "80svh" }}>
                <p className="company_name">
                    {error ? messageContext.errorMessage.toUpperCase() : messageContext.noDataMessage.toUpperCase()}
                </p>
            </div>
        );
    }

    // Safe Destructuring of CSV Object Fields
    const {
        ProjectName = "Unnamed Project",
        OverallProgress = "0",
        CurrentPhase = "Discovery",
        Status = "Pending",
        StartDate = "N/A",
        TargetCompletion = "N/A",
        NextMilestone = "None set",
        DeliverablesFolderURL = "",
        LastUpdated = "N/A"
    } = projectData;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* ==================== MAIN STATUS CARD ==================== */}
            <div className="musicCard statusCardContainer" style={{ padding: '24px', height: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', aspectRatio: 'unset !important' }}>
                
                {/* Header with SVG Icon & Title */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="projectHeaderSvg">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            <line x1="12" y1="11" x2="12" y2="17"></line>
                            <line x1="9" y1="14" x2="15" y2="14"></line>
                        </svg>
                        <h2 className="musicCardTitle" style={{ margin: 0, fontSize: '1.5rem' }}>{ProjectName}</h2>
                    </div>
                    <div className="musicCardBadge">{OverallProgress}%</div>
                </div>

                {/* Category & Phase Pill */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="musicCardCategory">{CurrentPhase} Phase</span>
                    <span style={{ fontSize: '12px', opacity: 0.6 }}>•</span>
                    <span className="musicCardCategory" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{Status}</span>
                </div>

                {/* Progress Bar */}
                <div className="progressBarTrack" style={{ background: 'rgba(255,255,255,0.15)', height: '8px', borderRadius: '4px', width: '100%', overflow: 'hidden' }}>
                    <div 
                        className="progressBarFill" 
                        style={{ 
                            width: `${Math.max(Number(OverallProgress), 4)}%`, 
                            background: '#4caf50', 
                            height: '100%', 
                            transition: 'width 0.4s ease' 
                        }} 
                    />
                </div>

                {/* Metric Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginTop: '8px' }}>
                    <div>
                        <p className="musicCardCategory" style={{ margin: '0 0 4px 0' }}>Start Date</p>
                        <strong style={{ fontSize: '14px' }}>{StartDate}</strong>
                    </div>
                    <div>
                        <p className="musicCardCategory" style={{ margin: '0 0 4px 0' }}>Target Completion</p>
                        <strong style={{ fontSize: '14px' }}>{TargetCompletion}</strong>
                    </div>
                    <div>
                        <p className="musicCardCategory" style={{ margin: '0 0 4px 0' }}>Next Milestone</p>
                        <strong style={{ fontSize: '14px' }}>{NextMilestone || 'None set'}</strong>
                    </div>
                    <div>
                        <p className="musicCardCategory" style={{ margin: '0 0 4px 0' }}>Deliverables</p>
                        {DeliverablesFolderURL && DeliverablesFolderURL.trim() !== '' && DeliverablesFolderURL !== '#' ? (
                            <a 
                                href={DeliverablesFolderURL} 
                                target="_blank" 
                                rel="noreferrer" 
                                style={{ color: '#4caf50', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                Open Folder
                            </a>
                        ) : (
                            <span style={{ fontSize: '14px', opacity: 0.7 }}>Pending</span>
                        )}
                    </div>
                </div>

                <small className="musicCardDescription" style={{ marginTop: '0.5rem 0', opacity: 0.6 }}>
                    Last system check: {LastUpdated}
                </small>
            </div>

            {/* ==================== PROJECT ACTIVITY LOGS / TIMELINE ==================== */}
            <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 className="musicCardTitle" style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    Life Cycle Activity Logs
                </h3>

                {logs.length === 0 ? (
                    <p className="musicCardDescription">No activity logs recorded for this project yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {logs.map((log, idx) => (
                            <div 
                                key={log.LogID || idx} 
                                style={{ 
                                    display: 'flex', 
                                    gap: '12px', 
                                    paddingBottom: idx === logs.length - 1 ? 0 : '16px', 
                                    borderBottom: idx === logs.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)' 
                                }}
                            >
                                <div style={{ paddingTop: '2px' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 12 12 14 14"></polyline></svg>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <span className="musicCardCategory" style={{ color: '#4caf50' }}>{log.PhaseChangedTo || 'Update'}</span>
                                        <span style={{ fontSize: '11px', opacity: 0.5 }}>{log.Timestamp}</span>
                                    </div>
                                    <p className="musicCardDescription" style={{ margin: '4px 0 0 0'}}>
                                        {log.ChangeSummary}
                                    </p>
                                    <small style={{ fontSize: '11px', opacity: 0.5, display: 'block', marginTop: '2px' }}>
                                        Updated by {log.UpdatedBy || 'System Admin'} • Progress: {log.PreviousProgress}% ➔ {log.NewProgress}%
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}