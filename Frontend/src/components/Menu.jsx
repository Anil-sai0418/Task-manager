export default function data() {
  return (
    <div className="h-screen w-full bg-pink-100 text-black flex justify-center items-center">
      <div className="h-[50%] w-[50%] bg-amber-400 rounded-2xl p-4 flex flex-col gap-4 justify-center items-start shadow-md">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">anil</h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-100">✏️</button>
            <button className="p-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-100">🗑️</button>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col items-center bg-gray-200 p-3 rounded-lg flex-1">
            <p className="text-sm">Credit(↑)</p>
            <p className="text-lg font-semibold">₹ 23,980</p>
          </div>
          <div className="flex flex-col items-center bg-gray-200 p-3 rounded-lg flex-1">
            <p className="text-sm">Debit(↓)</p>
            <p className="text-lg font-semibold">₹ 24,000</p>
          </div>
          <div className="flex flex-col items-center bg-purple-600 text-white p-3 rounded-lg flex-1">
            <p className="text-sm">Balance</p>
            <p className="text-lg font-semibold">₹ -20</p>
          </div>
        </div>
      </div>
    </div>
  );
}