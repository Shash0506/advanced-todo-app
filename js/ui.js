function showSection(section) {
  const title = document.getElementById("sectionTitle");

  if (section === "today") {
    title.innerText = "Today's Tasks";
  } 
  else if (section === "upcoming") {
    title.innerText = "Upcoming Tasks";
  } 
  else if (section === "completed") {
    title.innerText = "Completed Tasks";
  } 
  else if (section === "filter") {
    title.innerText = "Filter Tasks";
  }

  // 🔥 ONLY render tasks (no UI duplication)
  renderTasks(section);
}