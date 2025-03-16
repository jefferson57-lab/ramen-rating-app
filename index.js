

const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "images/shoyu.jpg", rating: 5, comment: "Delicious!" },
    { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "images/miso.jpg", rating: 4, comment: "Very flavorful!" },
    { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "images/tonkotsu.jpg" }
];

function displayRamens() {
    const ramenMenu = document.getElementById("ramen-menu");
    ramenMenu.innerHTML = ""; // Clear existing images
    ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.id = ramen.id;
        img.addEventListener("click", handleClick);
        ramenMenu.appendChild(img);
    });
}

function handleClick(event) {
    const ramenId = parseInt(event.target.dataset.id);
    const ramen = ramens.find((r) => r.id === ramenId);
    if (ramen) {
        const ramenDetail = document.getElementById("ramen-detail");
        ramenDetail.innerHTML = `
            <img src="${ramen.image}" alt="${ramen.name}" style="width: 200px; height: auto;"><br>
            <h2>${ramen.name}</h2>
            <p>Restaurant: ${ramen.restaurant}</p>
            ${ramen.rating ? `<p>Rating: ${ramen.rating}</p>` : ''}
            ${ramen.comment ? `<p>Comment: ${ramen.comment}</p>` : ''}
            <button onclick="editRamen(${ramen.id})">Edit</button>
        `;
    }
}
function editRamen(ramenId) {
    const ramen = ramens.find((r) => r.id === ramenId);
    if (ramen) {
        const ramenDetail = document.getElementById("ramen-detail");
        ramenDetail.innerHTML = `
            <h2>${ramen.name}</h2>
            <p>Restaurant: ${ramen.restaurant}</p>
            <label for="editRating">Rating:</label>
            <input type="number" id="editRating" value="${ramen.rating || ''}"><br>
            <label for="editComment">Comment:</label><br>
            <textarea id="editComment">${ramen.comment || ''}</textarea><br>
            <button onclick="updateRamen(${ramen.id})">Update</button>
        `;
    }
}

function updateRamen(ramenId) {
    const ramen = ramens.find((r) => r.id === ramenId);
    if (ramen) {
        ramen.rating = parseFloat(document.getElementById("editRating").value) || undefined;
        ramen.comment = document.getElementById("editComment").value || undefined;

        if (isNaN(ramen.rating)){
            delete ramen.rating;
        }

        if (ramen.comment === ""){
            delete ramen.comment;
        }

        handleClick({ target: { dataset: { id: ramen.id } } });
    }
}
function addSubmitListener() {
    const form = document.getElementById("ramen-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const restaurant = document.getElementById("restaurant").value;
        const image = document.getElementById("image").value;
        const rating = parseFloat(document.getElementById("rating").value);
        const comment = document.getElementById("comment").value;

        const newRamen = {
            id: ramens.length + 1,
            name: name,
            restaurant: restaurant,
            image: image,
            rating: isNaN(rating) ? undefined : rating,
            comment: comment === "" ? undefined : comment
        };
        ramens.push(newRamen);
        displayRamens();
        form.reset();
    });
}

function main() {
    displayRamens();
    addSubmitListener();
    if (ramens.length > 0) {
        handleClick({ target: { dataset: { id: ramens[0].id } } });
    }
}

document.addEventListener("DOMContentLoaded", main);