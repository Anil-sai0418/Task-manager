export default function List() {
    return (
        <div className="h-screen w-full bg-primary ">
            <nav className="p-4 w-full bg-amber-50">
                <p className="w-[20%] h-ful pl-20" >my app</p>

            </nav>
            <div className="flex justify-center items-center h-[80%]">
                <div className="h-[70%] w-[50%] bg-white rounded-2xl p-4 space-y-4 overflow-y-auto">
                    {["Abhishek", "anil", "bharani"].map((name, i) => (
                        <div key={i} className="bg-white shadow-md rounded-xl p-4">
                            <h2 className="text-xl font-bold capitalize mb-3">{name}</h2>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-gray-200 text-center p-2 rounded-md">
                                    <p className="text-sm font-medium">Credit(↑)</p>
                                    <p className="font-bold">₹ 0</p>
                                </div>
                                <div className="bg-gray-200 text-center p-2 rounded-md">
                                    <p className="text-sm font-medium">Debit(↓)</p>
                                    <p className="font-bold">₹ 0</p>
                                </div>
                                <div className="bg-primary text-white text-center p-2 rounded-md">
                                    <p className="text-sm font-medium">Balance</p>
                                    <p className="font-bold">₹ 0</p>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-2">
                                <button className="bg-gray-100 p-1 rounded-full">✏️</button>
                                <button className="bg-gray-100 p-1 rounded-full">🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}