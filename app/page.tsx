'use client';
import Head from 'next/head';
import '../styles/global.css';
import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';

interface TodoItem {
  text: string;
  checked: boolean;
}

const HomePage = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filterChecked, setFilterChecked] = useState<boolean | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('todoItems');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items));
  }, [items]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setItems([...items, { text: inputValue.trim(), checked: false }]);
      setInputValue('');
    }
  };

  const toggleCheck = (index: number) => {
    const updated = [...items];
    updated[index].checked = !updated[index].checked;
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const toggleAll = () => {
    const allChecked = items.every(item => item.checked);
    const updated = items.map(item => ({ ...item, checked: !allChecked }));
    setItems(updated);
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    const dragFrom = dragItem.current;
    const dragTo = dragOverItem.current;
    if (dragFrom === null || dragTo === null || dragFrom === dragTo) return;

    const updatedItems = [...items];
    const draggedItem = updatedItems.splice(dragFrom, 1)[0];
    updatedItems.splice(dragTo, 0, draggedItem);

    setItems(updatedItems);
    dragItem.current = null;
    dragOverItem.current = null;
    setDraggedIndex(null);
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/avara" type="text/css" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todolist</title>
      </Head>

      <div className="page-container bg-[#1e1e1e] w-full h-screen flex items-center justify-center">
        <div id="all" className="bg-[#2c2c2c] grid grid-cols-1 gap-4 p-5 max-w-[500px] w-full mx-auto rounded-xl">
          <div>
            <h1 className="text-[#e0e0e0] font-[AvaraBold] text-[70px] font-normal text-center sm:text-[50px]">Todolist</h1>
          </div>

          <div className="lists grid gap-2 w-full">
            <input
              type="text"
              id="ListInput"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-[#374151] text-[#e0e0e0] placeholder-[#a0a0a0] h-[50px] w-full p-[10px] text-lg outline-none border border-[#4b5563] focus:border-2 focus:border-[#8b5cf6] transition"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setFilterChecked(null)}
                className={`font-[AvaraBold] text-[#e0e0e0] px-4 py-2 rounded transition ${
                  filterChecked === null ? 'bg-[#3b82f6]' : 'bg-[#4b5563] hover:bg-[#374151]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterChecked(true)}
                className={`font-[AvaraBold] text-[#e0e0e0] px-4 py-2 rounded transition ${
                  filterChecked === true ? 'bg-[#3b82f6]' : 'bg-[#4b5563] hover:bg-[#374151]'
                }`}
              >
                Done
              </button>
              <button
                onClick={() => setFilterChecked(false)}
                className={`font-[AvaraBold] text-[#e0e0e0] px-4 py-2 rounded transition ${
                  filterChecked === false ? 'bg-[#3b82f6]' : 'bg-[#4b5563] hover:bg-[#374151]'
                }`}
              >
                Undone
              </button>

              {items.length > 0 && (
                <button
                  onClick={toggleAll}
                  className="font-[AvaraBold] text-[#e0e0e0] bg-[#10b981] hover:bg-[#059669] px-4 py-2 rounded transition"
                >
                  {items.every(item => item.checked) ? 'Undone All' : 'Done All'}
                </button>
              )}
            </div>

            {items.length > 0 ? (
              <div className="element_container w-full" id="elementContainer">
                <AnimatePresence>
                  {items
                    .filter(item => filterChecked === null || item.checked === filterChecked)
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`element bg-[#2c2c2c] min-h-[10%] w-full grid grid-cols-[24px_1fr] gap-2 p-2 border border-[#3a3a3a] rounded-md transition-all duration-200 ${draggedIndex === index ? 'ring-2 ring-violet-500 scale-105' : ''}`}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragEnter={() => handleDragEnter(index)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                        >
                          <button
                            onClick={() => toggleCheck(index)}
                            className="focus:outline-none w-[24px] h-[24px] border-[#4b5563] rounded-[6px] cursor-pointer"
                          >
                            <Image
                              src={item.checked ? "/circle_ok.svg" : "/circle.svg"}
                              alt={item.checked ? "Checked" : "Unchecked"}
                              width={24}
                              height={24}
                              className="transition-all"
                            />
                          </button>
                          <p
                            className={`text-[#e0e0e0] font-[AvaraBold] font-bold text-[20px] leading-relaxed px-[10px] sm:text-[16px] max-w-full overflow-hidden break-words ${item.checked ? 'line-through' : ''}`}
                            style={{
                              textDecoration: item.checked ? 'line-through' : 'none',
                              textDecorationColor: item.checked ? 'black' : 'transparent'
                            }}
                          >
                            {item.text}
                          </p>
                          <button
                            onClick={() => removeItem(index)}
                            className="deleteButton w-20 text-center text-white font-[AvaraBold] rounded text-sm border border-white py-1 hover:bg-black hover:text-red-500 transition-all duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            ) : null}
          </div>

          <button
            id="clearAll"
            type="button"
            className="font-[AvaraBold] text-[#e0e0e0] bg-[#3b82f6] hover:bg-[#2563eb] px-4 py-2 rounded transition"
            onClick={() => setItems([])}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;