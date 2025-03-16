

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
