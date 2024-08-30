import { useEffect, useMemo, useRef } from "react"

import { useComponentConfigStore } from "@/store/Editor/config"
import useMaterialDrop from "@/hooks/lowCode/useMaterailDrop"
import { CommonComponent } from "@/store/Editor"
import { useDrag } from "react-dnd"


const ModalDev = ({ id, children, styles }: CommonComponent) => {
    const { componentConfig } = useComponentConfigStore()

    const componentNames = useMemo(() => {
        return Object.keys(componentConfig).filter(item => item !== 'Page')
    }, [componentConfig])

    const divRef = useRef(null)

    const { isOver, drop } = useMaterialDrop(id, componentNames)

    const [, drag] = useDrag({
        type: 'Modal',
        item: {
            type: 'Modal',
            id: id,
            dropType: 'move'
        }
    })

    useEffect(() => {
        drag(divRef)
        drop(divRef)
    }, [])

    return <div ref={divRef}
        data-component-id={id}
        className={`
            border-[1px] 
            border-[#000]
            min-h-[100px] 
            p-[20px] 
            ${isOver ? 'border-blue-500' : ''}`
        }
        style={styles}
    >
        {children}
    </div>
}

export default ModalDev