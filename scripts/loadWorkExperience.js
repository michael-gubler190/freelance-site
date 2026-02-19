async function loadWorkExperience() {
  const workExperienceList = document.getElementById("work-experience");
  const workExperienceData = await getLocalData("../data/work.json");
  
  workExperienceData.forEach((work, index) => {

    const newWork = `
  <div class="relative my-10 md:my-24">
    <div class="flex flex-col md:flex-row items-center md:items-start">

      <!-- Logo -->
      <div class="md:w-1/2 flex justify-center md:justify-end md:pr-10 mb-6 md:mb-0">
        <div class="w-40 h-40 sm:w-52 sm:h-52 md:w-[308px] md:h-[308px] 
                    rounded-full bg-white shadow-lg flex items-center justify-center 
                    z-10 border-4 border-solid border-purple-400">
          <img src="${work["image"]}" 
              class="w-36 h-36 sm:w-48 sm:h-48 md:w-[300px] md:h-[300px] object-cover rounded-full" 
              alt="${work["employer"]}"/>
        </div>
      </div>

      <!-- Connector Dot (desktop only) -->
      <div class="hidden md:flex absolute left-1/2 
                  transform -translate-x-1/2 
                  w-6 h-6 bg-yellow-400 rounded-full 
                  border-4 border-white z-20">
      </div>

      <!-- Job Info -->
      <div class="md:w-1/2 md:pl-10 w-full px-4 sm:px-0">
        <div class="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 class="text-lg sm:text-xl font-bold">${work["title"]}</h3>
          <p class="text-gray-500 text-sm sm:text-base mb-2">
            ${work["employer"]} • ${work["startMonth"]} ${work["startYear"]} – ${work["endMonth"]} ${work["endYear"]}
          </p>
          <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            ${work["description"]}
          </p>
        </div>
      </div>

    </div>
  </div>
`;

    workExperienceList.insertAdjacentHTML("beforeend", newWork);
  });
}

loadWorkExperience();