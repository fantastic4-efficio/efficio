import {useState} from 'react'

const NewTask = () => {
const [subjectInput, setSubjectInput] = useState('');
const [projectInput, setProjectInput] = useState('');
const [dueInput, setDueInput] = useState('');
const [priorityInput, setPriorityInput] = useState('');
const [ownerInput, setOwnerInput] = useState('');
const [statusInput, setStatusInpt] = useState('');

const submitTask = async(event) =>{
  event.preventDefault();

  const response = fetch('API ENDPOINT HERE', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      subject: subjectInput,
      project: projectInput,
      due_date: dueInput,
      priority: priorityInput,
      owner: ownerInput,
      status: statusInput
    })

  })
}

  return (<>
    <form onSubmit={submitTask}>
      <label>Subject: </label>
      <input placeholder="Subject"
      onChange={(event) => {setSubjectInput(event.target.value)}}>
      </input>
      <label>Project: </label>
      <input placeholder="Project"
      onChange={(event) => {setProjectInput(event.target.value)}}>
      </input>
      <label>Due date: </label>
      <input type="date"
      onChange={(event) => {setDueInput(event.target.value)}}></input>
      <label>Priority</label>
      <select name="priority"
      onchange={(event) => {setPriorityInput(event.target.value)}}>
        <option value = "1">1</option>
        <option value = "2">2</option>
        <option value = "3">3</option>
        <option value = "4">4</option>
        <option value = "5">5</option>
      </select>
      <label>Owner: </label>
      <input placeholder="Owner"
      onChange={(event) => {setOwnerInput(event.target.value)}}>
      </input>
      <label>Status</label>
      <select name="status"
      onChange={(event) => {setStatusInpt(event.target.value)}}>
        <option value = "In Progress">In Progress</option>
        <option value = "Paused">Paused</option>
        <option value = "Completed">Completed</option>
      </select>
    <button>Submit</button>
    </form>
    <button>Cancel</button>
  </>)

}

export default NewTask