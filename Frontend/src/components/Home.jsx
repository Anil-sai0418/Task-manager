import { Menu, Inbox, Send, Heart, Archive, Trash, AlertCircle, Settings, HeartCrack, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button"
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-muted px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">

            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"secondary"} size={"icon"}>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>anil</SheetTitle>
                  <SheetDescription>
                  </SheetDescription>
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-4 px-2 py-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                      <Inbox className="h-6 w-6 text-primary" />
                      <span className="text-base font-medium text-foreground">Home</span>
                    </div>
                    <div className="flex items-center gap-4 px-2 py-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                      <DollarSign className="h-6 w-6 text-primary" />
                      <span className="text-base font-medium text-foreground">change currency</span>
                    </div>
                    <div className="flex items-center gap-4 px-2 py-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                      <HeartCrack className="h-6 w-6 text-primary" />
                      <span className="text-base font-medium text-foreground">change password</span>
                    </div>
                    <div className="flex items-center gap-4 px-2 py-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                      <Archive className="h-6 w-6 text-primary" />
                      <span className="text-base font-medium text-foreground">Settings</span>
                    </div>
                    <div className="flex items-center gap-4 px-2 py-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                      <Trash className="h-6 w-6 text-primary" />
                      <span className="text-base font-medium text-foreground">share this app</span>
                    </div>
                    <div className="flex items-center gap-4 px-2 py-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                      <AlertCircle className="h-6 w-6 text-primary" />
                      <span className="text-base font-medium text-foreground">Spam</span>
                    </div>
                    <div className="pt-6 border-t mt-6">
                      <div className="flex items-center gap-4 px-2 py-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                        <Settings className="h-6 w-6 text-primary" />
                        <span className="text-base font-medium text-foreground">Settings & account</span>
                      </div>
                    </div>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            
            <div className="text-2xl font-bold">MyApp</div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="hidden md:flex gap-6">
              <li>
                <a href="#" className="  hover:text-gray-300 text-lg ">Home</a>
              </li>
            </ul>
          </div>
          <ModeToggle />
        </div>
      </nav>


      <div className="bg-primary h-screen w-full flex flex-row justify-start items-center  ">
        <div className="h-[300px] w-[30%] bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 shadow-xl rounded-3xl ml-8 flex justify-start flex-col pl-10 pr-10 pt-10 gap-6 transition-transform transform hover:scale-105 duration-300">
         <p className="text-3xl font-extrabold text-gray-900">📊 Account Manager</p>
         <p className="text-base text-gray-800 leading-relaxed">
           Seamlessly track, manage, and organize your financial activities.<br />
           Stay on top of your payments with time and date sorting.
         </p>
         <button
           onClick={() => navigate("/data")}
           className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200"
         >
           Get Started
         </button>
        </div>
        <div className="h-[300px] w-[30%] bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 shadow-xl rounded-3xl ml-8 flex justify-start flex-col pl-10 pr-10 pt-10 gap-6 transition-transform transform hover:scale-105 duration-300">
         <p className="text-3xl font-extrabold text-gray-900">📊 Account Manager</p>
         <p className="text-base text-gray-800 leading-relaxed">
           Seamlessly track, manage, and organize your financial activities.<br />
           Stay on top of your payments with time and date sorting.
         </p>
         <button
           onClick={() => navigate("/track")}
           className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200"
         >
           Get Started
         </button>
        </div>
        <div className="h-[300px] w-[30%] bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 shadow-xl rounded-3xl ml-8 flex justify-start flex-col pl-10 pr-10 pt-10 gap-6 transition-transform transform hover:scale-105 duration-300">
         <p className="text-3xl font-extrabold text-gray-900">📊 Account Manager</p>
         <p className="text-base text-gray-800 leading-relaxed">
           Seamlessly track, manage, and organize your financial activities.<br />
           Stay on top of your payments with time and date sorting.
         </p>
         <button className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200">
           Get Started
         </button>
        </div>
      </div>
    </>
  );
}
