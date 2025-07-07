import { Menu, Inbox } from "lucide-react";
import { Button } from "../components/ui/button"
import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";


export default function Home() {
  const navigate = useNavigate();
  
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 fixed top-0 w-full z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 ">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"secondary"} size={"icon"}>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>anil</SheetTitle>
                </SheetHeader>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-4 px-2 py-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
                    <Inbox className="h-6 w-6 text-primary" />
                    <span className="text-base font-medium text-foreground">Home</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-2xl font-bold">MyApp</div>
          </div>
          <ModeToggle />
        </div>
      </nav>

      <div className="h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">

        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 animate-fade-in-up">
            Welcome to <span className="text-green-400">Task Manager</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 animate-fade-in-up delay-150">
            Organize your tasks in an ordered way
          </p>
          <button
            onClick={() => navigate("/List")}
            className="w-[30%] py-3 px-6 bg-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 text-white font-semibold text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out"
          >
             Get Started
          </button>
        </div>
      </div>
      
    </>
  );
}
