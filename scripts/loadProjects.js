async function loadProjects() {
  const projectList = document.getElementById("projects-grid");
  const projectData = await getLocalData("../data/projects.json");
  
  projectData.forEach((project, index) => {
    // const newCourse = `
    //   <li><span class="font-bold ${index % 2 == 0 ? "text-purple-400" : "text-yellow-400"}">${course["course_name"]}</span> - ${course["course_description"]}</li>
    // `;

    const newProject = `
      <div onclick="openModal(${index})" class="relative overflow-hidden rounded-xl group transition-transform duration-300 hover:scale-95 hover:cursor-pointer">
  
        <!-- Image -->
        <img
          src="${project["image"]}"
          class="w-full h-64 object-cover"
          alt="${project["name"]}"
        />
        
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <!-- Text -->
        <div class="absolute bottom-4 left-4 right-4 text-white z-10">
          <h3 class="text-lg font-semibold">
            ${project["name"]}
          </h3>
        </div>

      </div>

    `;

    projectList.insertAdjacentHTML("afterbegin", newProject);
  });
}

loadProjects();