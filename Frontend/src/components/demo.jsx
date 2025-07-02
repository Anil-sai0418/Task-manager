import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Serchcomponent () {
  const id = useId()
  return (
    <div className="*:not-first:mt-2 w-[50%] mb-2 ml-20">
      <Label htmlFor={id}></Label>
      <div className="relative">
        <Input
          id={id}
          className="pe-11"
          placeholder="Search..."
          type="search"
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
          <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  )
}
