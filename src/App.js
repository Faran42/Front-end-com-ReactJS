import React, { useState, useEffect } from 'react';
import api from './services/api';
import regeneratorRuntime from "regenerator-runtime";

import './App.css'
//import backgroundImage from './assets/background.jpeg'

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(()=> {
    api.get('projects').then(response =>{
      setProjects(response.data);
    });
  }, []);

    async function handleAddProject(){
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Faran Resolve"
    });

    const project = response.data

    setProjects([...projects, project]);
  }
  return(
    <>
      <Header title = "Projects"/>

      {/* <img width={300} src={backgroundImage}/> <br/> */}

      <button type="button" onClick={handleAddProject}>Adcionar projeto</button>
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

     
    </>
  );  
}

export default App;