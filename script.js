const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('mobile-nav');
const userBtn = document.getElementById('user-btn');
const userMenu = document.getElementById('user-menu');
const categoryContainer = document.getElementById("category-button-div");
const petMain = document.getElementById("pet-main");
const petAdded = document.getElementById("pet-added");
const clearButton = document.getElementById("clear-btn");
const loading = document.getElementById("loading");
const viewMoreBtn = document.getElementById('view-more-btn');
const scrollSection = document.getElementById("scroll-section");

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
});

userBtn.addEventListener('click', () => {
    userMenu.classList.toggle('hidden');
});

// Optional: close menus on outside click
window.addEventListener('click', (e) => {
    if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.add('hidden');
    }
});
// category button code
const categoryButtonFunction = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
    const categories = data.categories;
    categories.forEach(element => {
        const categoryButton = document.createElement("button");
        categoryButton.setAttribute("id", element.category);
        categoryButton.classList.add("flex", "items-center", "justify-center", "gap-2", "hover:bg-[rgba(200,200,243,0.44)]", "hover:rounded-full", "hover:border-2", "hover:border-blue-500", "transition-all", "p-3");
        categoryButton.innerHTML = `
            <img src ="${element.category_icon}" alt="pets"/>
            <p class="text-lg font-bold">${element.category}</p>
        `;
        categoryContainer.appendChild(categoryButton);
        categoryButton.addEventListener("click", () => {
            loading.classList.remove('hidden');
            setTimeout(() => {
                loading.classList.add('hidden');
                petMain.innerHTML = "";
                petMain.scrollIntoView({ behavior: "smooth" });
                const link = `https://openapi.programming-hero.com/api/peddy/category/${element.category}`;
                petCardFunction(link, 1);
            }, 2000);
        });
    });
}
categoryButtonFunction();
// pet card code
const petCardFunction = async (link = 'https://openapi.programming-hero.com/api/peddy/pets', n = 0) => {
    const response = await fetch(link);
    const info = await response.json();
    const pets = info.pets;
    const data = info.data;
    const ar = [pets, data];
    ar[n].forEach(element => {
        const petCard = document.createElement("div");
        const petId = element.petId;
        petCard.classList.add("flex", "flex-col", "items-start", "justify-center", "gap-3", "p-4", "border-2", "border-blue-100", "rounded-xl", "max-sm:w-full");
        petCard.innerHTML = `
                <img src ="${element.image}" alt="pets" class="rounded-xl object-cover h-full"/>
                <p class="text-2xl font-bold">${element.pet_name}</p>
                <div class="flex items-center gap-2 justify-start w-full">
                    <img src="https://img.icons8.com/?size=100&id=2bbPBbZvbi8l&format=png&color=131313" alt="pets" class="w-6 h-6"/>
                    <p class="text-md text-[#131313]">Breed: ${element.breed}</p>
                </div>
                <div class="flex items-center gap-2 justify-start w-full">
                    <img src="https://img.icons8.com/?size=100&id=vwGXRtPWrZSn&format=png&color=131313" alt="pets" class="w-6 h-6"/>
                    <p class="text-md text-[#131313]">Birth: ${element.date_of_birth}</p>
                </div>
                <div class="flex items-center gap-2 justify-start w-full">
                    <img src="https://img.icons8.com/?size=100&id=Kv6q3DKYDp1T&format=png&color=131313" alt="pets" class="w-6 h-6"/>
                    <p class="text-md text-[#131313]">Gender: ${element.gender}</p>
                </div>
                <div class="flex items-center gap-2 justify-start w-full">
                    <img src="https://img.icons8.com/?size=100&id=0oWpxDgVkkru&format=png&color=131313" alt="pets" class="w-6 h-6"/>
                    <p class="text-md text-[#131313] flex">Price: ${element.price} <img src="https://img.icons8.com/?size=100&id=0oWpxDgVkkru&format=png&color=131313" class="w-6 h-6"/></p>
                </div>
                <div class="flex items-center gap-2 justify-around w-full">
                    <button class=" text-blue-400 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all border-2 border-blue-300" id="${petId}"> <img src="https://img.icons8.com/?size=100&id=u8MTpAq972MG&format=png&color=60a5fa" class="w-6 h-6"/> </button>
                    <button class=" text-blue-400 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all border-2 border-blue-300">Adopt</button>
                    <button class="text-blue-400 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all border-2 border-blue-300">Details</button>
                </div>
            `;
        petMain.appendChild(petCard);
        let isClear = false;
        document.getElementById(petId).addEventListener("click", () => {
            isClear = true;
            const likePet = document.createElement('div');
            const clearLiked = "liked";
            likePet.innerHTML = `
                    <img src="${element.image}" class="rounded-lg"/>
                `;
            petAdded.appendChild(likePet);
            if (isClear) {
                clearButton.innerHTML = `
                    <button class="text-blue-400 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all border-2 border-blue-300" id=${clearLiked}>Clear All</button>
                `;
            }
            document.getElementById(clearLiked).addEventListener("click", () => {
                petAdded.innerHTML = "";
                clearButton.innerHTML = "";
                isClear = false;
            });
        });
    });
}
petCardFunction();

// scroll

viewMoreBtn.addEventListener("click", () => {
    scrollSection.scrollIntoView({ behavior: "smooth" });
});