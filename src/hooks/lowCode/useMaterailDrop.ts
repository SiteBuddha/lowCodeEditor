import { useDrop } from "react-dnd"

import { getComponentById, useComponetsStore } from "@/store/Editor"
import { useComponentConfigStore } from "@/store/Editor/config"


function useMaterialDrop(id: number, accept: string[]) {
    const { addComponent, components, deleteComponent } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore()

    const [{ isOver }, drop] = useDrop({
        accept,
        drop: (item: { type: string, id: number, dropType: string }, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return
            }

            if (item.id && item.dropType === 'move') {
                const component = getComponentById(item.id, components)!

                deleteComponent(item.id)

                addComponent(component, id)

            } else {
                const config = componentConfig[item.type]
                addComponent({
                    id: new Date().getTime(),
                    name: item.type,
                    desc: config.desc,
                    props: config.defaultProps,
                }, id)
            }

        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
        }),
    })

    return {
        isOver,
        drop
    }
}

export default useMaterialDrop