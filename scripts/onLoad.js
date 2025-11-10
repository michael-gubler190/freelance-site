// Get json data
async function getLocalData(path) {
  const response = await fetch(path);
  const data = await response.json();
  
  return data;
}


// Load in work experience
const workExperiencesElement = document.getElementById("work-experiences");
const workData = await getLocalData("../data/work.json");

workData.forEach(work => {
  const newWorkElement = `
    <div class="flex flex-col md:flex-row md:items-center bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      <div class="md:w-1/3 mb-4 md:mb-0 flex-shrink-0">
        <h4 class="text-xl font-semibold">${work["title"]}</h4>
        <h4 class="text-lg text-gray-500 dark:text-gray-400">${work["employer"]}</h4>

        <br />

        <p class="text-gray-500 dark:text-gray-400">${work["startYear"]} – ${work["endYear"]}</p>
      </div>

      <!-- Truncated description -->
      <div class="md:w-2/3 text-gray-700 dark:text-gray-300 overflow-hidden text-ellipsis line-clamp-4">
        ${work["description"]}
      </div>
    </div>

  `;

  workExperiencesElement.insertAdjacentHTML("afterbegin", newWorkElement);
});
// END Work data


// Load in projects
const projectsElement = document.getElementById("projects-catalog");
const projectData = await getLocalData("../data/projects.json");

projectData.forEach(project => {
  const newProjectElement = `
    <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition h-70 flex flex-col">
      <img src="https://via.placeholder.com/400x250" alt='Project ${project["id"]}' class="rounded-lg mb-4 flex-shrink-0">
      <h4 class="text-xl font-semibold mb-2 flex-shrink-0">
        <span>${project["name"]}</span>
        <div>
          ${project["technologies"].map(technology => `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">${technology}</span>`).join("")}
        </div>
      </h4>

      <!-- Truncate only the description -->
      <p class="text-gray-600 dark:text-gray-300 my-3 overflow-hidden text-ellipsis line-clamp-3">
        ${project["description"]}
      </p>

      <a href="#" class="text-blue-600 dark:text-blue-400 font-medium hover:underline flex-shrink-0 mt-auto">View Project →</a>
    </div>


  `;

  projectsElement.insertAdjacentHTML("afterbegin", newProjectElement);
});
// END Load projects
