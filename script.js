const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("mobile-nav");
const userBtn = document.getElementById("user-btn");
const userMenu = document.getElementById("user-menu");
const categoryContainer = document.getElementById("category-button-div");
const petMain = document.getElementById("pet-main");
const petAdded = document.getElementById("pet-added");
const clearButton = document.getElementById("clear-btn");
const loading = document.getElementById("loading");
const viewMoreBtn = document.getElementById("view-more-btn");
const scrollSection = document.getElementById("scroll-section");
const petModal = document.getElementById("pet-modal");
const modalBox = document.getElementById("modal-box");
const sort = document.getElementById("sort");

// sorting
sort.addEventListener("click", async () => {
    petMain.innerHTML = "";
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const info = await response.json();
    const data = info.pets;
    const priceList = [];
    const petID = [];
    data.forEach(element => {
        const price = element.price;
        const id = element.petId;
        priceList.push(price);
        petID.push(id);
    });
    const sortobj = Object.fromEntries(petID.map((id, i) => [id, priceList[i]]));
    const sortPriceList = (Object.values(sortobj).sort((x, y) => x - y));
    for (let i = 0; i < data.length; i++) {
        const id = Object.keys(sortobj).find(key => sortobj[key] === sortPriceList[i]);
        LoadById(id);
    }
});
async function LoadById(id) {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pet/'+id);
    const info = await res.json();
    const data = info.petData;
    const petCard = document.createElement('div');
    petCard.classList.add(
        "flex",
        "flex-col",
        "items-start",
        "justify-center",
        "gap-3",
        "p-4",
        "border-2",
        "border-blue-100",
        "rounded-xl",
        "max-sm:w-full"
    );
    petCard.innerHTML = `
                <img src ="${data.image}" alt="pets" class="rounded-xl object-cover h-full"/>
                <p class="text-2xl font-bold">${data.pet_name}</p>
                <div class="flex items-center gap-2 justify-start w-full">
                    <img src="https://img.icons8.com/?size=100&id=2bbPBbZvbi8l&format=png&color=131313" alt="pets" class="w-6 h-6"/>
                    <p class="text-md text-[#131313]">Breed: ${data.breed}</p>
                </div>
                <div class="flex items-center gap-2 justify-start w-full">
                    <img src="https://img.icons8.com/?size=100&id=vwGXRtPWrZSn&format=png&color=131313" alt="pets" class="w-6 h-6"/>
                    <p class="text-md text-[#131313]">Birth: ${data.date_of_birth}</p>
                </div>
                <div class="flex items-center gap-2 justify-start w-full">
                    <img src="https://img.icons8.com/?size=100&id=Kv6q3DKYDp1T&format=png&color=131313" alt="pets" class="w-6 h-6"/>
                    <p class="text-md text-[#131313]">Gender: ${data.gender}</p>
                </div>
                <div class="flex items-center gap-2 justify-start w-full">
                    <img src="https://img.icons8.com/?size=100&id=0oWpxDgVkkru&format=png&color=131313" alt="pets" class="w-6 h-6"/>
                    <p class="text-md text-[#131313] flex">Price: ${data.price} <img src="https://img.icons8.com/?size=100&id=0oWpxDgVkkru&format=png&color=131313" class="w-6 h-6"/></p>
                </div>
                <div class="flex items-center gap-2 justify-around w-full">
                    <button class=" text-blue-400 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all border-2 border-blue-300" id="p"> <img src="https://img.icons8.com/?size=100&id=u8MTpAq972MG&format=png&color=60a5fa" class="w-6 h-6"/> </button>
                    <button class=" text-blue-400 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all border-2 border-blue-300" id="adopt">Adopt</button>
                    <button class="text-blue-400 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all border-2 border-blue-300" onclick="my_modal.showModal()" id = "details">Details</button>
                </div>`;
    petMain.append(petCard);
}
// sorting

petModal.classList.add(
    "flex",
    "flex-col",
    "gap-2",
    "overflow-scroll",
    "h-[600px]",
    "max-sm:py-2",
    "max-sm:h-[300px]"
);
modalBox.classList.add("rounded-md");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
});

userBtn.addEventListener("click", () => {
    userMenu.classList.toggle("hidden");
});

// Optional: close menus on outside click
window.addEventListener("click", (e) => {
    if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.add("hidden");
    }
});
// category button code
const categoryButtonFunction = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await response.json();
    const categories = data.categories;
    categories.forEach((element) => {
        const categoryButton = document.createElement("button");
        categoryButton.setAttribute("id", element.category);
        categoryButton.classList.add(
            "flex",
            "items-center",
            "justify-center",
            "gap-2",
            "hover:bg-[rgba(200,200,243,0.44)]",
            "hover:rounded-full",
            "hover:border-2",
            "hover:border-blue-500",
            "transition-all",
            "p-3"
        );
        categoryButton.innerHTML = `
            <img src ="${element.category_icon}" alt="pets"/>
            <p class="text-lg font-bold">${element.category}</p>
        `;
        categoryContainer.appendChild(categoryButton);
        categoryButton.addEventListener("click", () => {
            loading.classList.remove("hidden");
            setTimeout(() => {
                loading.classList.add("hidden");
                petMain.innerHTML = "";
                petMain.scrollIntoView({ behavior: "smooth" });
                const link = `https://openapi.programming-hero.com/api/peddy/category/${element.category}`;
                petCardFunction(link, 1);
            }, 2000);
            buttonSaverFunction();
            categoryButton.classList.add(
                "bg-[rgba(200,200,243,0.44)]",
                "rounded-full",
                "border-2",
                "border-blue-500"
            );
        });
    });
    function buttonSaverFunction() {
        for (let i = 0; i < categoryContainer.children.length; i++) {
            categoryContainer.children[i].classList.remove(
                "bg-[rgba(200,200,243,0.44)]",
                "rounded-full",
                "border-2",
                "border-blue-500"
            );
        }
    }
};
categoryButtonFunction();
// pet card code
const petCardFunction = async (
    link = "https://openapi.programming-hero.com/api/peddy/pets",
    n = 0
) => {
    const response = await fetch(link);
    const info = await response.json();
    const pets = info.pets;
    const data = info.data;
    const ar = [pets, data];
    ar[n].forEach((element) => {
        const petCard = document.createElement("div");
        const petId = element.petId;
        petCard.classList.add(
            "flex",
            "flex-col",
            "items-start",
            "justify-center",
            "gap-3",
            "p-4",
            "border-2",
            "border-blue-100",
            "rounded-xl",
            "max-sm:w-full"
        );
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
                    <button class=" text-blue-400 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all border-2 border-blue-300" id="adopt${petId}">Adopt</button>
                    <button class="text-blue-400 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-all border-2 border-blue-300" onclick="my_modal.showModal()" id = "details${petId}">Details</button>
                </div>
            `;
        petMain.appendChild(petCard);
        let isClear = false;
        document.getElementById(petId).addEventListener("click", () => {
            isClear = true;
            const likePet = document.createElement("div");
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
        // modal
        document.getElementById(`details${petId}`).addEventListener("click", () => {
            petModal.innerHTML = `<img src = "${element.image}" class="object-cover w-full" />
            <h1 class = "font-bold text-2xl pt-2">${element.pet_name}</h1>
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
            <div class="flex items-center gap-2 justify-start w-full">
                    <img src="https://img.icons8.com/?size=100&id=Nqk16xLY1vt5&format=png&color=131313" alt="pets" class="w-6 h-6"/>
                    <p class="text-md text-[#131313] flex">Vaccinated Status: ${element.vaccinated_status}</p>
            </div>
            <div class="flex flex-col gap-2 justify-between w-full">
                    <h1 class = "font-bold text-lg">Details Information:</h1>
                    <p class="text-center">${element.pet_details}</p>
            </div>`;
        });
        document.getElementById(`adopt${petId}`).addEventListener("click", (e) => {
            e.target.innerHTML = "Adopted";
            e.target.disabled = true;
            e.target.classList.remove(
                "text-blue-400",
                "px-4",
                "py-2",
                "rounded-lg",
                "hover:text-blue-600",
                "hover:border-blue-600",
                "transition-all",
                "border-2",
                "border-blue-300"
            );
            e.target.classList.add("cursor-not-allowed");
        });
    });
    if (petMain.children.length === 0) {
        petMain.innerHTML = `<img src="error.webp" class="mx-auto text-center col-span-3"/>
        <h1 class="font-bold text-2xl text-center mx-auto col-span-3">No Information Available</h1>
        <p class="text-lg text-center mx-auto col-span-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.</p>`;
    }
};
petCardFunction();
// scroll

viewMoreBtn.addEventListener("click", () => {
    scrollSection.scrollIntoView({ behavior: "smooth" });
});
