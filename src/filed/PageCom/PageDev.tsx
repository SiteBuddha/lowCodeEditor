import { useMemo } from "react"

import { useComponentConfigStore } from "@/store/Editor/config"
import { CommonComponent } from "@/store/Editor"
import useMaterialDrop from "@/hooks/lowCode/useMaterailDrop"


const Page = ({ id, children, styles }: CommonComponent) => {
    const { componentConfig } = useComponentConfigStore()

    const componentNames = useMemo(() => {
        return Object.keys(componentConfig).filter(item => item !== 'Page')
    }, [componentConfig])

    const { isOver, drop } = useMaterialDrop(id, componentNames)

    return <div
        data-component-id={id}
        ref={drop}
        style={styles}
        className={
            `p-[20px]
             h-[100%] 
             box-border
            ${isOver ? 'border-[1px] border-blue-500' : ''}`
        }
    >
        {children}
    </div >
}

export default Page