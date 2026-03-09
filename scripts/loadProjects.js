// Modal setup
function setupModal() {
  const modal = document.createElement("div");
  modal.id = "project-modal";
  modal.innerHTML = `
    <div id="modal-backdrop" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 opacity-0 pointer-events-none transition-opacity duration-300"></div>
    <div id="modal-panel" class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div id="modal-card" class="relative bg-zinc-900 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl transform scale-95 opacity-0 transition-all duration-300">
        <button id="modal-close" class="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg transition-colors">✕</button>
        <img id="modal-image" src="" alt="" class="w-full h-64 object-cover" />
        <div class="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black/30 to-transparent"></div>

        <div class="p-6">
          <h2 id="modal-name" class="text-2xl font-bold text-white mb-2"></h2>

          <h2 id="modal-dates" class="text-md font-bold text-zinc-400 mb-2"></h2>

          <p id="modal-description" class="text-zinc-400 text-sm leading-relaxed mb-5"></p>

          <div id="modal-tags" class="flex flex-wrap gap-2 mb-5"></div>

          <a id="modal-link" href="#" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-purple-400 hover:bg-purple-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            View Project <span>→</span>
          </a>

        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const backdrop = document.getElementById("modal-backdrop");
  const panel = document.getElementById("modal-panel");
  const card = document.getElementById("modal-card");
  const closeBtn = document.getElementById("modal-close");

  function openModal(project) {
    document.getElementById("modal-image").src = project["image"];
    document.getElementById("modal-image").alt = project["name"];
    document.getElementById("modal-name").textContent = project["name"];
    document.getElementById("modal-dates").textContent = `${project["startDate"]} - ${project["endDate"]}`
    document.getElementById("modal-description").textContent = project["description"] ?? "";
    document.getElementById("modal-link").href = project["link"];

    const tagsContainer = document.getElementById("modal-tags");
    tagsContainer.innerHTML = "";
    (project["technologies"] ?? []).forEach(tag => {
      const pill = document.createElement("span");
      pill.className = "bg-zinc-800 text-zinc-300 text-xs font-medium px-3 py-1 rounded-full";
      pill.textContent = tag;
      tagsContainer.appendChild(pill);
    });

    backdrop.classList.remove("opacity-0", "pointer-events-none");
    backdrop.classList.add("opacity-100");
    panel.classList.remove("pointer-events-none");
    requestAnimationFrame(() => {
      card.classList.remove("scale-95", "opacity-0");
      card.classList.add("scale-100", "opacity-100");
    });
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    card.classList.add("scale-95", "opacity-0");
    card.classList.remove("scale-100", "opacity-100");
    backdrop.classList.add("opacity-0");
    backdrop.classList.remove("opacity-100");
    setTimeout(() => {
      backdrop.classList.add("pointer-events-none");
      panel.classList.add("pointer-events-none");
      document.body.style.overflow = "";
    }, 300);
  }

  closeBtn.addEventListener("click", closeModal);
  panel.addEventListener("click", closeModal);
  card.addEventListener("click", e => e.stopPropagation());
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  return openModal;
}

async function loadProjects() {
  const projectList = document.getElementById("projects-grid");
  const projectData = await getLocalData("../data/projects.json");
  const openModal = setupModal();

  projectData.forEach((project, index) => {
    const newProject = `
      <div class="relative overflow-hidden rounded-xl group transition-transform duration-300 hover:scale-95 hover:cursor-pointer" data-index="${index}">
        <img
          src="${project["image"]}"
          class="w-full h-64 object-cover"
          alt="${project["name"]}"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div class="absolute bottom-4 left-4 right-4 text-white z-10">
          <h3 class="text-lg font-semibold">${project["name"]}</h3>
        </div>
      </div>
    `;
    projectList.insertAdjacentHTML("afterbegin", newProject);

    // Attach click listener to the card just inserted
    projectList.firstElementChild.addEventListener("click", () => openModal(project));
  });
}

loadProjects();