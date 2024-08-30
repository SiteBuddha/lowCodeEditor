import { getComponentById, useComponetsStore } from "@/store/Editor";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom"

interface HoverMaskProps {
    containerClassName: string
    portalContainerClassName: string
    componentId: number;
}

const HoverMask = ({ containerClassName, portalContainerClassName, componentId }: HoverMaskProps) => {
    const { components } = useComponetsStore()

    const hoverComponent = useMemo(() => {
        return getComponentById(componentId, components)
    }, [componentId])

    const el = useMemo(() => {
        return document.querySelector(`.${portalContainerClassName}`)
    }, [])

    const [position, setPosition] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0
    })

    useEffect(() => {
        updatePosition()
    }, [componentId])

    useEffect(() => {
        updatePosition()
    }, [components])

    function updatePosition() {
        if (!componentId) return
        const container = document.querySelector(`.${containerClassName}`)
        if (!container) return
        const node = document.querySelector(`[data-component-id="${componentId}"]`)
        if (!node) return

        const { left, top, width, height } = node.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        let labelTop = top - containerRect.top + container.scrollTop
        const labelLeft = left - containerRect.left + container.scrollLeft + width

        if (labelTop <= 0) {
            labelTop -= -20
        }

        setPosition({
            left: left - containerRect.left + container.scrollLeft,
            top: top - containerRect.top + container.scrollTop,
            width: width,
            height: height,
            labelTop,
            labelLeft
        })

    }


    return createPortal(
        <>
            <div style={
                {
                    pointerEvents: 'none',
                    position: 'absolute',
                    left: position.left,
                    top: position.top,
                    width: position.width,
                    height: position.height,
                    border: '1px dashed #1890ff',
                    zIndex: '12',
                    borderRadius: '4px',
                }}
            ></div>
            <div style={{
                position: 'absolute',
                left: position.labelLeft,
                top: position.labelTop,
                border: '1px dashed #1890ff',
                zIndex: '13',
                borderRadius: '4px',
                transform: 'translate(-100%, -100%)',
                display: `${!position.width || position.width < 10 ? 'none' : 'inline'}`
            }}>
                <div style={{
                    color: '#fff',
                    backgroundColor: 'blue',
                    padding: '0 8px',
                    fontSize: '14px',
                    cursor: "pointer",
                    whiteSpace: 'nowrap',
                }}>
                    {hoverComponent?.desc}
                </div>
            </div>
        </>
        , el!)
}
export default HoverMask