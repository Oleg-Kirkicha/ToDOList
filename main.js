document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("ListInput");
    const elementContainer = document.getElementById("elementContainer");
    const clearAllButton = document.getElementById("clearAll");
  

    inputField.addEventListener("keypress", function(event) {
      if (event.key === "Enter" && inputField.value.trim() !== "") {

        const newElement = document.createElement("div");
        newElement.classList.add("element_container", "w-full");
  
        newElement.innerHTML = `
          <div class="element bg-[#462e20] min-h-[10%] w-full grid grid-cols-[24px_1fr] gap-2 p-2 border border-[#5f5f5f]">
            <input class="checkbox w-[24px] h-[24px] rounded-[6px] bg-[#a06b45] border-[#8b4513] cursor-pointer transition-all" type="checkbox">
            <p class="text-white font-[AvaraBold] font-bold text-[18px] leading-relaxed px-[10px] sm:text-[16px] max-w-full overflow-hidden">
              ${inputField.value}
            </p>
            <button class="deleteButton bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </div>
        `;
        

        elementContainer.appendChild(newElement);
  

        inputField.value = "";
  

        const deleteButton = newElement.querySelector(".deleteButton");
        deleteButton.addEventListener("click", function() {
          newElement.remove();
        });
      }
    });
  

    clearAllButton.addEventListener("click", function() {
      elementContainer.innerHTML = "";
    });
  });
  