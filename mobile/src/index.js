import React, {useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

// View: div, footer, header, main, aside, section

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject(){
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Faran Rocha',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }
  return (
  <> 
    <StatusBar barStyle="light-content" backgroundColor='#7159c1'/>
    <SafeAreaView style={styles.container}>
      <FlatList 
        style={styles.container}
        data={projects}
        keyExtractor={project => project.id}
        renderItem={({ item: project }) => (
          <Text style={styles.project} key={project.id}>{project.title}</Text>
        )}    
      />

      <TouchableOpacity 
      activeOpacity={0.4} 
      style={styles.button} 
      onPress={handleAddProject}
      >
        <Text style={styles.buttonText}>Adcionar projeto</Text>
      </TouchableOpacity>

    </SafeAreaView>
    {/* <ScrollView style={styles.container}>
      {projects.map(project => (
      <Text style={styles.project} key={project.id}>{project.title}</Text>
      ))}
    </ScrollView> */}
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    /*justifyContent: 'center',
    alignItems: 'center',*/
  },
  project: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});