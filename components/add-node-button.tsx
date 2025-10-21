import { memo } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

export const AddNodeButton = memo(() => {
    return (
        <Button
        onClick={()=>{}}
        size='icon-lg'
        variant='outline'
        className='bg-background'
        >
            <PlusIcon className="size-6"/>
        </Button>
    )
})

AddNodeButton.displayName = "AddNodeButton";