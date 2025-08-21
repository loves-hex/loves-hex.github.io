let allPoems = [];

fetch("poems.json")
  .then(res => res.json())
  .then(poems => {
    allPoems = poems;
    populateDateFilter(poems);
    renderPoems(poems);
  })
  .catch(err => console.error("Error loading poems:", err));

// Render poems chronologically
function renderPoems(poems) {
  const container = document.getElementById("poems");
  container.innerHTML = "";

  const sorted = [...poems].sort((a, b) => {
    // Create a date number for comparison: YYYYMM
    const dateA = a.year * 100 + a.month;
    const dateB = b.year * 100 + b.month;
    return dateA - dateB; // ascending order
  });

  sorted.forEach(poem => {
    const div = document.createElement("div");
    div.className = "poem";
    div.innerHTML = `
      <h2>${poem.title}</h2>
      <small>${poem.month}/${poem.year}</small>
      <p>${poem.text.replace(/\n/g, "<br>")}</p>
    `;
    container.appendChild(div);
    // Animate in
    setTimeout(() => div.classList.add("visible"), 50);
  });
}

// Populate date filter dropdown
function populateDateFilter(poems) {
  const select = document.getElementById("dateFilter");
  select.innerHTML = '<option value="all">All</option>'; // reset

  // Generate unique year/month pairs
  const dateSet = new Set(poems.map(p => `${p.year}-${p.month}`));
  const dateArray = Array.from(dateSet)
    .map(str => {
      const [year, month] = str.split("-").map(Number);
      return { year, month };
    })
    .sort((a, b) => a.year * 100 + a.month - (b.year * 100 + b.month)); // ascending

  // Add options to dropdown
  dateArray.forEach(d => {
    const option = document.createElement("option");
    option.value = `${d.year}-${d.month}`;
    option.textContent = `${d.month}/${d.year}`;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const selected = select.value;
    if (selected === "all") {
      renderPoems(allPoems);
    } else {
      const [year, month] = selected.split("-").map(Number);
      renderPoems(allPoems.filter(p => p.year === year && p.month === month));
    }
  });
}
