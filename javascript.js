function openModal(card) {
    const img = card.querySelector("img");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    modal.style.display = "flex";
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
