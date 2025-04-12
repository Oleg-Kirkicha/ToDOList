import Head from 'next/head';
import Script from 'next/script'
import '../styles/global.css';

const HomePage = () => {
  return (
    <>

      <Head>
        <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/avara" type="text/css" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todolist</title>
      </Head>
      
      <div className="bg-[#1e1e1e] w-full h-screen">

        <div id="all" className="bg-[#2c2c2c] grid grid-cols-1 gap-4 p-5 max-w-[500px] w-full mx-auto rounded-xl">
          <div>
            <h1 className="text-[#e0e0e0] font-[AvaraBold] text-[70px] font-normal text-center sm:text-[50px]">Todolist</h1>
          </div>
          <div className="lists grid gap-2 w-full">
            <input
              type="text"
              id="ListInput"
              placeholder="What needs to be done?"
              className="bg-[#374151] text-[#e0e0e0] placeholder-[#a0a0a0] h-[50px] w-full p-[10px] text-lg outline-none border border-[#4b5563] focus:border-2 focus:border-[#8b5cf6] transition"
            />
            <div className="element_container w-full" id="elementContainer"></div>
          </div>

          <button id="clearAll" type="button" className="font-[AvaraBold] text-[#e0e0e0] bg-[#3b82f6] hover:bg-[#2563eb] px-4 py-2 rounded transition">
            Clear All
          </button>
        </div>
                 <Script type="module" src="/scripts/main.js" strategy="afterInteractive"/>
      </div>

      

    </>
  );
};

export default HomePage;