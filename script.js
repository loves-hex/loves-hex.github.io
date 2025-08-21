let allPoems = [];

fetch("poems.json")
  .then(res => res.json())
  .then(poems => {
    allPoems = poems;
    populateYearFilter(poems);
    renderPoems(poems);
  })
  .catch(err => {
    console.error("Error loading poems:", err);
  });

// Render poems (A → Z only)
function renderPoems(poems) {
  const container = document.getElementById("poems");
  container.innerHTML = "";

  const sorted = [...poems].sort((a, b) => a.title.localeCompare(b.title));

  sorted.forEach(poem => {
    const div = document.createElement("div");
    div.className = "poem";
    div.innerHTML = `
      <h2>${poem.title}</h2>
      <small>Year: ${poem.year}</small>
      <p>${poem.text.replace(/\n/g, "<br>")}</p>
    `;
    container.appendChild(div);
    // Animate in
    setTimeout(() => div.classList.add("visible"), 50);
  });
}

// Populate year filter
function populateYearFilter(poems) {
  const years = [...new Set(poems.map(p => p.year))].sort((a,b) => b-a);
  const select = document.getElementById("yearFilter");

  years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const selected = select.value;
    if(selected === "all") {
      renderPoems(allPoems);
    } else {
      renderPoems(allPoems.filter(p => p.year == selected));
    }
  });
}
