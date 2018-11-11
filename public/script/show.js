var selectedItem = document.querySelectorAll(".info>li");
console.log(selectedItem);

function removeActive() {
    selectedItem.forEach(function(item) {
        item.classList.remove("active");
    })
}
selectedItem.forEach(function(item) {
    item.addEventListener("click", function() {
        removeActive();
        item.classList.add("active");
    })
});
