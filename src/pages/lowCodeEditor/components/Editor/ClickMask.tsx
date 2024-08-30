import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom"

import { Dropdown, Popconfirm, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { getComponentById, useComponetsStore } from "@/store/Editor";


interface HoverMaskProps {
    containerClassName: string
    portalContainerClassName: string
    componentId: number;
}

const ClickMask = ({ containerClassName, portalContainerClassName, componentId }: HoverMaskProps) => {
    const { components, setCurComponent, curComponent, deleteComponent } = useComponetsStore()

    const el = useMemo(() => {
        return document.querySelector(`.${portalContainerClassName}`)
    }, [portalContainerClassName])

    const [position, setPosition] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0
    })

    const parentComponents = useMemo(() => {
        const parentComponents = []
        let component = curComponent
        while (component?.parentId) {
            component = getComponentById(component.parentId, components)!
            parentComponents.push(component)
        }
        return parentComponents.filter(item => item.name === 'Container')
    }, [curComponent])

    useEffect(() => {
        updatePosition()
    }, [componentId])

    useEffect(() => {
        setTimeout(() => {
            updatePosition()
        }, 200)
    }, [components])

    useEffect(() => {
        const resizeHandler = () => {
            updatePosition();
        }
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, []);

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

    if (!el) return null


    const handleConfirmDelete = () => {
        setCurComponent(null)
        deleteComponent(componentId)
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
            {componentId !== 1 && <div style={{
                position: 'absolute',
                left: position.labelLeft,
                top: position.labelTop,
                zIndex: '13',
                borderRadius: '4px',
                transform: 'translate(-100%, -100%)',
                display: `${!position.width || position.width < 10 ? 'none' : 'inline'}`
            }}>
                <Space>
                    <Dropdown menu={{
                        items: parentComponents.map((item) => ({
                            label: item.desc, key: item.id,
                        })),
                        onClick: ({ key }) => {
                            setCurComponent(+key)
                        }
                    }} >
                        <div
                            style={{
                                padding: '0 8px',
                                backgroundColor: 'blue',
                                borderRadius: 4,
                                color: '#fff',
                                cursor: "pointer",
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {curComponent?.desc}
                        </div>
                    </Dropdown>
                    <Popconfirm title="确定删除该组件吗？" onConfirm={handleConfirmDelete}><DeleteOutlined /></Popconfirm>
                </Space >
            </div >}
        </>
        , el!)
}
export default ClickMask