"use client"

import { GripVertical } from "lucide-react"

// Placeholder components - version compatibility needed
const ResizablePanelGroup = ({ children, ...props }: any) => (
  <div className="flex h-full w-full" {...props}>{children}</div>
)

const ResizablePanel = ({ children, ...props }: any) => (
  <div className="flex-1" {...props}>{children}</div>
)

const ResizableHandle = ({ withHandle }: any) => (
  <div className="relative flex w-px items-center justify-center bg-border">
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </div>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
