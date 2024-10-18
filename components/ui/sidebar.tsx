import { LayoutGrid, List } from "lucide-react";
import { Button } from "./button";

<div className={`bg-background  border-r shadow-sm transition-all max-sm:hidden w-52 md:w-64`}>
  <div className="flex flex-col h-full ">
    <div className="p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold dark:text-white">Task Manager</h1>
    </div>
    <nav className={`flex-1 space-y-2 px-2 `}>
      <Button>
        <List className=" h-4 w-4" />
        List View
      </Button>
      <Button>
        <LayoutGrid className="h-4 w-4" />
        Board View
      </Button>
    </nav>
  </div>
</div>;
