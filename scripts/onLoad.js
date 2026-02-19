// Get json data
async function getLocalData(path) {
  const response = await fetch(path);
  const data = await response.json();
  
  return data;
}


const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > 100) {
    navbar.classList.remove("bg-transparent");
    navbar.classList.add("bg-purple-400");
  } else {
    navbar.classList.remove("bg-purple-400");
  }
});



const modal = document.getElementById("courseModal");
const overlay = document.getElementById("modalOverlay");

const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");

const courses = [];

function openModal(index) {
  const course = courses[index];

  modalTitle.textContent = course.course_name;
  modalImage.src = course.image;
  modalDescription.textContent = course.description || "";
  
  overlay.classList.remove("hidden");
  requestAnimationFrame(() => {
    modal.classList.remove("-translate-x-full");
  });
}


function closeModal() {
  modal.classList.add("-translate-x-full");

  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 300);
}

document.getElementById("closeModal").addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);


async function loadCoursework() {
  const courseworkList = document.getElementById("course-grid");
  const courseworkData = await getLocalData("../data/coursework.json");
  
  courseworkData.forEach((course, index) => {
    // const newCourse = `
    //   <li><span class="font-bold ${index % 2 == 0 ? "text-purple-400" : "text-yellow-400"}">${course["course_name"]}</span> - ${course["course_description"]}</li>
    // `;
    courses.push(course);

    const newCourse = `
      <div onclick="openModal(${index})" class="relative overflow-hidden rounded-xl group transition-transform duration-300 hover:scale-95 hover:cursor-pointer">
  
        <!-- Image -->
        <img
          src="${course["image"]}"
          class="w-full h-64 object-cover"
          alt="${course["course_name"]}"
        />
        
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <!-- Text -->
        <div class="absolute bottom-4 left-4 right-4 text-white z-10">
          <h3 class="text-lg font-semibold">
            ${course["course_name"]}
          </h3>
        </div>

      </div>

    `;

    courseworkList.insertAdjacentHTML("afterbegin", newCourse);
  });
}

loadCoursework();


const headings = document.querySelectorAll(".typeHeading");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;

      const textLength = el.textContent.length;
      el.style.setProperty("--characters", textLength);
      el.style.setProperty("--type-width", textLength + "ch");

      el.classList.add("active");
      observer.unobserve(el);
    }
  });
}, { threshold: 0.5 });

headings.forEach(h => observer.observe(h));
