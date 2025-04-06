export default function HomePage() {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const clearRef = useRef(null);
  console.log("go");
  useEffect(() => {
    const inputField = inputRef.current;
    const elementContainer = containerRef.current;
    const clearAllButton = clearRef.current;

    if (!inputField || !elementContainer || !clearAllButton) return;

    // Load saved elements and their checkbox states
    const loadElements = () => {
      const savedElements = JSON.parse(localStorage.getItem("elements")) || [];
      savedElements.forEach(element => {
        const newElement = document.createElement("div");
        newElement.classList.add("element_container", "w-full");

        newElement.innerHTML = `
          <div className="element bg-[#2c2c2c] min-h-[10%] w-full grid grid-cols-[24px_1fr] gap-2 p-2 border border-[#3a3a3a] rounded-md">
            <input className="checkbox w-[24px] h-[24px] rounded-[6px] bg-[#374151] border-[#4b5563] cursor-pointer transition-all focus:ring-0 checked:bg-[#4ade80] checked:border-[#22c55e]" type="checkbox" ${element.checked ? 'checked' : ''}>
            <p className="text-[#e0e0e0] font-[AvaraBold] font-bold text-[18px] leading-relaxed px-[10px] sm:text-[16px] max-w-full overflow-hidden transition-all">
              ${element.text}
            </p>
            <button className="deleteButton w-20 text-center text-white font-[AvaraBold] rounded text-sm border border-white py-1 hover:bg-black hover:text-red-500 transition-all duration-200">
              Delete
            </button>
          </div>
        `;

        elementContainer.appendChild(newElement);

        // Delete button
        const deleteButton = newElement.querySelector(".deleteButton");
        deleteButton.addEventListener("click", function() {
          removeElement(element.text);
          newElement.remove();
        });

        // Add event listener to the checkbox 
        const checkbox = newElement.querySelector(".checkbox");
        checkbox.addEventListener("change", function() {
          updateCheckboxStatus(element.text, checkbox.checked);
        });
      });
    };

    // Save new element
    const saveElement = (text, checked) => {
      const savedElements = JSON.parse(localStorage.getItem("elements")) || [];
      savedElements.push({ text, checked });
      localStorage.setItem("elements", JSON.stringify(savedElements));
    };

    // Update the checkbox status
    const updateCheckboxStatus = (text, checked) => {
      let savedElements = JSON.parse(localStorage.getItem("elements")) || [];
      savedElements = savedElements.map(element => 
        element.text === text ? { ...element, checked } : element
      );
      localStorage.setItem("elements", JSON.stringify(savedElements));
    };

    // Remove an element from localStorage
    const removeElement = (text) => {
      let savedElements = JSON.parse(localStorage.getItem("elements")) || [];
      savedElements = savedElements.filter(item => item.text !== text);
      localStorage.setItem("elements", JSON.stringify(savedElements));
    };

    // Event listener for Enter key to add an element
    inputField.addEventListener("keypress", function(event) {
      if (event.key === "Enter" && inputField.value.trim() !== "") {
        const text = inputField.value.trim();

        // Add the new element to the page
        const newElement = document.createElement("div");
        newElement.classList.add("element_container", "w-full");

        newElement.innerHTML = `
          <div className="element bg-[#2c2c2c] min-h-[10%] w-full grid grid-cols-[24px_1fr] gap-2 p-2 border border-[#3a3a3a] rounded-md">
            <input className="checkbox w-[24px] h-[24px] rounded-[6px] bg-[#374151] border-[#4b5563] cursor-pointer transition-all focus:ring-0 checked:bg-[#4ade80] checked:border-[#22c55e]" type="checkbox">
            <p className="text-[#e0e0e0] font-[AvaraBold] font-bold text-[18px] leading-relaxed px-[10px] sm:text-[16px] max-w-full overflow-hidden transition-all">
              ${text}
            </p>
            <button className="deleteButton w-20 text-center text-white font-[AvaraBold] rounded text-sm border border-white py-1 hover:bg-black hover:text-red-500 transition-all duration-200">
              Delete
            </button>
          </div>
        `;

        elementContainer.appendChild(newElement);
        inputField.value = "";
        saveElement(text, false);

        // Delete button
        const deleteButton = newElement.querySelector(".deleteButton");
        deleteButton.addEventListener("click", function() {
          removeElement(text);
          newElement.remove();
        });

        // Checkbox save its state
        const checkbox = newElement.querySelector(".checkbox");
        checkbox.addEventListener("change", function() {
          updateCheckboxStatus(text, checkbox.checked);
        });
      }
    });

    // "Clear All" button
    clearAllButton.addEventListener("click", function() {
      localStorage.removeItem("elements");
      elementContainer.innerHTML = "";
    });

    // Load the saved elements
    loadElements();
  }, []);
  console.log("main.js is loaded");

}
