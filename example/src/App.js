import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Section({section, instructors, onChange, onDelete}) {
  const handleChange = e => {
    const instructorId = parseInt(e.target.value);
    onChange(section.id, instructorId);
  }

  return(
    <>  
      <div className="col-auto">
        <div className="input-group">
          <select className="form-select" value={section.instructor} onChange = {handleChange}>
            {instructors.map(instructor => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>
          <button className="btn btn-danger" onClick={() => onDelete(section.id)}>-</button>
        </div>
      </div>
    </>
  )
}

function Course({course, instructors, setError}) {
  const [sections, setSections] = useState(course.sections);
  const [isLoading, setIsLoading] = useState(false);

  const addSection = async (e) => {
    const instructorId = e.target.value;
    
    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:8080/courses/${course.id}/newSection`,{instructorId});
      const newSection = response.data; 
      setSections([...sections, newSection]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to add section");
    }
  };

  const updateSectionInstructor = async (sectionId, instructorId) => {
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:8080/sections/${sectionId}`, {instructorId});
  
      setSections(sections.map(section =>
        section.id === sectionId ? { ...section, instructor: instructorId } : section
      ));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to update section instructor");
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:8080/sections/${sectionId}`);
  
      setSections(sections.filter(section => section.id !== sectionId));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to delete section");
    }
  };

  return(
    <>
    {isLoading ? (
      <tr>
        <td colSpan="2">Loading...</td>
      </tr>
    ):(
    <tr>
      <th scope="row">{course.name}</th>
      <td>
        <div className="row g-2">
          {sections.map((section) => (
            <Section key={section.id} section={section} instructors={instructors} onChange={updateSectionInstructor} onDelete={deleteSection}/>
          ))}
          <div className="col-auto">
            <select className="form-select" value="-1" onChange={addSection} >
              <option disabled value="-1">Add Section...</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
      </td>
    </tr>)}
    </>
  );
}

function App() {

  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetch = async () => {
      try{
        setLoading(true);
        const response = await axios.get("http://localhost:8080/data");
        const { instructors, courses } = response.data;
        setLoading(false);
        setInstructors(instructors);
        setCourses(courses);
      }
      catch (error) {
        setLoading(false);
        setError("Unable to retrieve data from server, please try again later.");
      }
      
    };
    fetch();
  }, []);

  const addCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/courses', {name: newCourseName});
      const newCourse = { ...response.data, sections: [] };
      setCourses([...courses, newCourse]);
      setNewCourseName('');
    } catch (error) {
      setError("Failed to add course");
    }
  }

  return (
    <div className="container">

      {loading
      ?
      <h2>Loading...</h2>
      : error ? 
      <div>
        <h2>Error</h2>
        <pre>{error}</pre>
      </div>
      :
      <>
      <h1>Build-A-Schedule</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Course</th>
            <th scope="col">Sections</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course =>
            <Course key = {course.name} course = {course} instructors = {instructors} setError={setError}/>
          )}
        </tbody>
      </table>
      
      <div className="row">
        <div className="col-auto">
          <div className="input-group mb-3">
            <form onSubmit={addCourse}>
              <input type="text" className="form-control" placeholder="Course Number" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} />
              <button type="submit" className="btn btn-primary" id="button-addon2">Add Course</button>
            </form>
          </div>
        </div>
      </div>
      </>}
    </div>
  );
}

export default App;
