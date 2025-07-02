import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Plus, PlusIcon, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

import Serchcomponent from "./demo"
import { Button } from "./ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
export default function Viewdata() {

    const programmingLanguages = [
        {
            id: "1",
            name: "JavaScript",
            releaseYear: "1995",
            developer: "Brendan Eich",
            typing: "Dynamic",
            paradigm: "Multi-paradigm",
            extension: ".js",
            latestVersion: "ES2021",
            popularity: "High",
        },
        {
            id: "2",
            name: "Python",
            releaseYear: "1991",
            developer: "Guido van Rossum",
            typing: "Dynamic",
            paradigm: "Multi-paradigm",
            extension: ".py",
            latestVersion: "3.10",
            popularity: "High",
        },
        {
            id: "3",
            name: "Java",
            releaseYear: "1995",
            developer: "James Gosling",
            typing: "Static",
            paradigm: "Object-oriented",
            extension: ".java",
            latestVersion: "17",
            popularity: "High",
        },
        {
            id: "4",
            name: "C++",
            releaseYear: "1985",
            developer: "Bjarne Stroustrup",
            typing: "Static",
            paradigm: "Multi-paradigm",
            extension: ".cpp",
            latestVersion: "C++20",
            popularity: "High",
        },
        {
            id: "5",
            name: "Ruby",
            releaseYear: "1995",
            developer: "Yukihiro Matsumoto",
            typing: "Dynamic",
            paradigm: "Multi-paradigm",
            extension: ".rb",
            latestVersion: "3.0",
            popularity: "Low",
        },
    ]

    return (
        <div className="h-screen w-full bg-background">
            <nav className="p-4 w-full bg-muted flex items-center max-sm:justify-between">
                <p className="text-xl font-bold text-primary">Payment Manager</p>

                <div className="flex-1 flex justify-center max-sm:hidden">
                    <Serchcomponent />
                </div>
                <div className="mr-20 flex items-center space-x-15 max-sm:hidden">
                    <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow">
                        Credit
                    </button>
                    <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow">
                        Debit
                    </button>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                            <Button className='bg-blue-400 hover:bg-blue-600 text-white  text-lg ' size={"lg"} >open</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Save as pdf</DropdownMenuItem>
                            <DropdownMenuItem>share via link</DropdownMenuItem>
                            <DropdownMenuItem>rate this app</DropdownMenuItem>
                            <DropdownMenuItem>more concepts</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant={"outline"}><Menu /></Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                <div className="flex-1 flex justify-center sm:hidden">
                                    <Serchcomponent />
                                </div>
                                <div className="mr-20 flex items-center space-x-15 sm:hidden max-md:flex-col">
                                    <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow">
                                        Credit
                                    </button>
                                    <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow">
                                        Debit
                                    </button>


                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild >
                                            <Button className='bg-blue-400 hover:bg-blue-600 text-white  text-lg ' size={"lg"} >open</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Save as pdf</DropdownMenuItem>
                                            <DropdownMenuItem>share via link</DropdownMenuItem>
                                            <DropdownMenuItem>rate this app</DropdownMenuItem>
                                            <DropdownMenuItem>more concepts</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

            </nav>

            <div className="p-4">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="h-9 py-2">date</TableHead>
                            <TableHead className="h-9 py-2">time</TableHead>
                            <TableHead className="h-9 py-2">purpose</TableHead>
                            <TableHead className="h-9 py-2">credit</TableHead>
                            <TableHead className="h-9 py-2">debit</TableHead>
                            {/* <TableHead className="h-9 py-2">Extension</TableHead>
              <TableHead className="h-9 py-2">Latest Version</TableHead>
              <TableHead className="h-9 py-2">Popularity</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {programmingLanguages.map((language) => (
                            <TableRow key={language.id}>
                                <TableCell className="py-2 font-medium">
                                    {language.name}
                                </TableCell>
                                <TableCell className="py-2">{language.releaseYear}</TableCell>
                                <TableCell className="py-2">{language.developer}</TableCell>
                                <TableCell className="py-2">{language.typing}</TableCell>
                                <TableCell className="py-2">{language.paradigm}</TableCell>
                                {/* <TableCell className="py-2">{language.extension}</TableCell>
                <TableCell className="py-2">{language.latestVersion}</TableCell>
                <TableCell className="py-2">{language.popularity}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="w-full h-[90px] flex items-center justify-center">
                <div className="flex gap-10">
                    <button className="px-6 py-3 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg shadow max-sm:px-2">
                        Credit: <br className=" hidden max-sm:block" /> $1500
                    </button>
                    <button className="px-6 py-3 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg shadow">
                        Debit: $1000
                    </button>
                    <button className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-lg shadow">
                        Total: $2500
                    </button>
                </div>
            </div>
        </div>
    )
}