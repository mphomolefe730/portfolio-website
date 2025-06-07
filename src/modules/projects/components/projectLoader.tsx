import { useEffect, useState } from "react";
import { useParams } from "react-router";
import projects from '../../../assets/jsons/personal_projects.json';
import ProjectModel from "../../../models/projectModel";

function ProjectLoader(){
    const [ messageContext, setMessageContext ] = useState("starting server");
    const length = 19;
    const [position, setPosition] = useState(0);
    let { projectName } = useParams();
    let projectInfo:ProjectModel = projects.find((n)=> n.title == projectName);
    
    useEffect(() => {
      fetch((projectInfo?.confirmation_link)? projectInfo?.confirmation_link : "https://ecommerce-test-api-i2se.onrender.com/api/products")
      .then((response) => response.json())
      .then(() => {
          setMessageContext("server launched, redirecting");
          setTimeout(() => {
            window.location.href = projectInfo?.project_link;
          }, 1000);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prevPosition) => (prevPosition + 1) % length);
        }, 250);

        return () => clearInterval(interval);
    }, []);

  const loadingIndicator = Array(length).fill("-").map((_char, index) =>  (index === position ? "|" : "=")).join("");

    return(
		<div style={{ margin: "auto", maxWidth: "600px", textAlign: "center", alignContent: "center", position: 'relative', height: "80svh"}}>
			<h1> {loadingIndicator} </h1>
            <p className="company_name"> { messageContext.toLocaleUpperCase() }</p>
		</div>
    )
};

export default ProjectLoader;