import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, placeholder, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      placeholder={placeholder}
      className={cn('text-base outline-none disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm',
        className
      )}
      {...props}
    />
  )
}

export { Input }
