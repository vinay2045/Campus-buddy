
// ---------- GLOBAL DATA ARRAYS ----------
let notes = [];
let assignments = [];
let jobs = [];

// ---------- UTILITY ----------
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB');
}

// ---------- RENDERING ----------
function renderNotes() {
  const list = document.getElementById("notesList");
  if (!list) return;
  list.innerHTML = "";
  notes.forEach((note, index) => {
    list.innerHTML += \`
      <tr>
        <td>\${note.title}</td>
        <td>\${formatDate(note.date)}</td>
        <td>
          <button onclick="editNote(\${index})">Edit</button>
          <button onclick="deleteNote(\${index})">Delete</button>
        </td>
      </tr>
    \`;
  });
}

function renderAssignments() {
  const list = document.getElementById("assignList");
  if (!list) return;
  list.innerHTML = "";
  assignments.forEach((item, index) => {
    list.innerHTML += \`
      <tr>
        <td>\${item.subject}</td>
        <td>\${item.assignment}</td>
        <td>\${formatDate(item.due)}</td>
        <td>\${item.status}</td>
        <td>
          <button onclick="editAssign(\${index})">Edit</button>
          <button onclick="deleteAssign(\${index})">Delete</button>
        </td>
      </tr>
    \`;
  });
}

function renderJobs() {
  const list = document.getElementById("jobsList");
  if (!list) return;
  list.innerHTML = "";
  jobs.forEach((job, index) => {
    list.innerHTML += \`
      <tr>
        <td>\${job.role}</td>
        <td>\${job.company}</td>
        <td>\${job.pay}</td>
        <td>\${job.status}</td>
        <td>
          <button onclick="editJob(\${index})">Edit</button>
          <button onclick="deleteJob(\${index})">Delete</button>
        </td>
      </tr>
    \`;
  });
}

// ---------- CRUD FUNCTIONS: NOTES ----------
function openNoteForm(index = null) {
  const form = document.createElement("form");
  form.innerHTML = \`
    <label>Title: <input type="text" id="noteTitle" required></label><br/>
    <label>Date: <input type="date" id="noteDate" required></label><br/>
    <button type="submit">\${index === null ? "Add Note" : "Update Note"}</button>
  \`;
  form.onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById("noteTitle").value;
    const date = document.getElementById("noteDate").value;
    if (index === null) {
      notes.push({ title, date });
    } else {
      notes[index] = { title, date };
    }
    document.body.removeChild(form.parentElement);
    renderNotes();
  };
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.top = "20%";
  wrapper.style.left = "40%";
  wrapper.style.background = "#fff";
  wrapper.style.padding = "2rem";
  wrapper.style.border = "1px solid #ccc";
  wrapper.appendChild(form);
  document.body.appendChild(wrapper);
}

function editNote(index) { openNoteForm(index); }
function deleteNote(index) { notes.splice(index, 1); renderNotes(); }

// ---------- CRUD FUNCTIONS: ASSIGNMENTS ----------
function openAssignForm(index = null) {
  const form = document.createElement("form");
  form.innerHTML = \`
    <label>Subject: <input type="text" id="assignSub" required></label><br/>
    <label>Assignment: <input type="text" id="assignText" required></label><br/>
    <label>Due Date: <input type="date" id="assignDue" required></label><br/>
    <label>Status: <select id="assignStatus">
      <option>Not Started</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select></label><br/>
    <button type="submit">\${index === null ? "Add Assignment" : "Update Assignment"}</button>
  \`;
  form.onsubmit = (e) => {
    e.preventDefault();
    const subject = document.getElementById("assignSub").value;
    const assignment = document.getElementById("assignText").value;
    const due = document.getElementById("assignDue").value;
    const status = document.getElementById("assignStatus").value;
    if (index === null) {
      assignments.push({ subject, assignment, due, status });
    } else {
      assignments[index] = { subject, assignment, due, status };
    }
    document.body.removeChild(form.parentElement);
    renderAssignments();
  };
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.top = "20%";
  wrapper.style.left = "40%";
  wrapper.style.background = "#fff";
  wrapper.style.padding = "2rem";
  wrapper.style.border = "1px solid #ccc";
  wrapper.appendChild(form);
  document.body.appendChild(wrapper);
}

function editAssign(index) { openAssignForm(index); }
function deleteAssign(index) { assignments.splice(index, 1); renderAssignments(); }

// ---------- CRUD FUNCTIONS: JOBS ----------
function openJobForm(index = null) {
  const form = document.createElement("form");
  form.innerHTML = \`
    <label>Role: <input type="text" id="jobRole" required></label><br/>
    <label>Company: <input type="text" id="jobCompany" required></label><br/>
    <label>Monthly Pay: <input type="text" id="jobPay" required></label><br/>
    <label>Status: <select id="jobStatus">
      <option>Open</option><option>Closed</option>
    </select></label><br/>
    <button type="submit">\${index === null ? "Post Job" : "Update Job"}</button>
  \`;
  form.onsubmit = (e) => {
    e.preventDefault();
    const role = document.getElementById("jobRole").value;
    const company = document.getElementById("jobCompany").value;
    const pay = document.getElementById("jobPay").value;
    const status = document.getElementById("jobStatus").value;
    if (index === null) {
      jobs.push({ role, company, pay, status });
    } else {
      jobs[index] = { role, company, pay, status };
    }
    document.body.removeChild(form.parentElement);
    renderJobs();
  };
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.top = "20%";
  wrapper.style.left = "40%";
  wrapper.style.background = "#fff";
  wrapper.style.padding = "2rem";
  wrapper.style.border = "1px solid #ccc";
  wrapper.appendChild(form);
  document.body.appendChild(wrapper);
}

function editJob(index) { openJobForm(index); }
function deleteJob(index) { jobs.splice(index, 1); renderJobs(); }

// ---------- INIT ----------
window.onload = () => {
  document.getElementById("createNote")?.addEventListener("click", () => openNoteForm());
  document.getElementById("createAssign")?.addEventListener("click", () => openAssignForm());
  document.getElementById("createJob")?.addEventListener("click", () => openJobForm());
  renderNotes();
  renderAssignments();
  renderJobs();
};
