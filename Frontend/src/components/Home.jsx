export default function Home() {
  return (
    <>
      <nav className="bg-black text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-2xl hover:text-gray-300 cursor-pointer">☰</button>
            <div className="text-2xl font-bold">MyApp</div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="hidden md:flex gap-6">
              <li>
                <a href="#" className="  hover:text-gray-300 text-lg ">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
