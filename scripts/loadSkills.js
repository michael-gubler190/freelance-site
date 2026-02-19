async function loadSkills() {
  const skillsList = document.getElementById("skills-grid");
  const skillsData = await getLocalData("../data/skills.json");
  
  skillsData.forEach((skill, index) => {
    // const newCourse = `
    //   <li><span class="font-bold ${index % 2 == 0 ? "text-purple-400" : "text-yellow-400"}">${course["course_name"]}</span> - ${course["course_description"]}</li>
    // `;

    const newSkill = `
        <div class="">

            <div class="flex items-center gap-3 mb-4">
                <h3 class="text-xl font-semibold">${skill["category"]}</h3>
            </div>

            <ul class="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                ${skill["skills"].map(skill => (
                    `<li>${skill}</li>`
                )).join("")}
            </ul>

        </div>
    `;

    skillsList.insertAdjacentHTML("afterbegin", newSkill);
  });
}

loadSkills();