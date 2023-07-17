//checkbox

const selectAllCheckbox = document.getElementById("selectAll");

function toggleCheckboxes() {
  const checkboxes = document.querySelectorAll(
    '.dropdown-menu input[type="checkbox"]'
  );

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = selectAllCheckbox.checked;
  }
}

selectAllCheckbox.addEventListener("click", toggleCheckboxes);
