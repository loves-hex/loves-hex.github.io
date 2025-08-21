fetch("poems.json")
  .then(res => res.json())
  .then(poems => {
    const container = document.getElementById("poems");
    poems.forEach(poem => {
      const div = document.createElement("div");
      div.className = "poem";
      div.innerHTML = `
        <h2>${poem.title}</h2>
        <p>${poem.text.replace(/\n/g, "<br>")}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Error loading poems:", err);
  });
