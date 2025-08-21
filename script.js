let allPoems = [];

fetch("poems.json")
  .then(res => res.json())
  .then(poems => {
    allPoems = poems;
    populateYearFilter(poems);
    renderPoems(poems);
  })
  .catch(err => console.error("Error loading poems:", err));

// Render poems chronologically
function renderPoems(poems) {
  const container = document.getElementById("poems");
  container.innerHTML = "";

  const sorted = [...poems].sort((a, b) => {
    const dateA = a.year * 100 + a.month;
    const dateB = b.year * 100 + b.month;
    return dateA - dateB; // oldest first
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  sorted.forEach(poem => {
    const div = document.createElement("div");
    div.className = "poem";

    // Convert numeric month to name
    const monthName = monthNames[poem.month - 1] || "Unknown";

    div.innerHTML = `
      <h2>${poem.title}</h2>
      <small>${monthName} ${poem.year}</small>
      <p>${poem.text.replace(/\n/g, "<br>")}</p>
    `;
    container.appendChild(div);
    setTimeout(() => div.classList.add("visible"), 50);
  });

  // Populate year filter dropdown
  function populateYearFilter(poems) {
    const select = document.getElementById("yearFilter");
    select.innerHTML = '<option value="all">All</option>'; // reset

    const years = [...new Set(poems.map(p => Number(p.year)))].sort((a,b) => b-a);

    years.forEach(year => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      const selected = select.value;
      if (selected === "all") {
        renderPoems(allPoems);
      } else {
        renderPoems(allPoems.filter(p => p.year == selected));
      }
    });
  }
}
