import React, { MouseEventHandler, useState } from "react"

import { Component, useComponetsStore } from "@/store/Editor"
import { useComponentConfigStore } from "@/store/Editor/config"

import HoverMask from './HoverMask'
import ClickMask from "./ClickMask"

const WARRPER_CONTENT = 'warrper-content'
const PAGE_EDITOR = 'page_editor'

const Editor = () => {
    const { components, curComponentId, setCurComponent } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore();

    const [hoverComponentId, setHoverComponentId] = useState<number>()

    const renderComponent = (components: Component[]): React.ReactNode => {

        return components.map((item) => {
            const config = componentConfig[item.name];

            if (!config?.dev) {
                return null
            }

            return React.createElement(config.dev, {
                key: item.id,
                id: item.id,
                name: item.name,
                styles: item?.styles,
                ...config.defaultProps,
                ...item.props,
            }, renderComponent(item.children || []))
        })

    }

    const handleClick: MouseEventHandler = (e) => {
        const paths = e.nativeEvent.composedPath()
        for (let i = 0; i < paths.length; i++) {
            const ele = paths[i] as HTMLElement
            const componentId = ele?.dataset?.componentId
            if (componentId) {
                setCurComponent(+componentId)
                return
            }
        }
    }

    const handleMouseOver: MouseEventHandler = (e) => {
        const paths = e.nativeEvent.composedPath()
        for (let i = 0; i < paths.length; i++) {
            const ele = paths[i] as HTMLElement
            const componentId = ele?.dataset?.componentId
            if (componentId) {
                setHoverComponentId(+componentId)
                return
            }
        }
    }

    return <div
        className={`h-[100%] ${PAGE_EDITOR}`}
        style={{ position: 'relative' }}
        onMouseLeave={() => setHoverComponentId(undefined)}
        onMouseOver={handleMouseOver}
        onClick={handleClick}
    >
        {renderComponent(components)}
        {
            hoverComponentId && hoverComponentId !== curComponentId && (
                <HoverMask
                    portalContainerClassName={WARRPER_CONTENT}
                    containerClassName={PAGE_EDITOR}
                    componentId={hoverComponentId}
                />)
        }
        {
            curComponentId && (
                <ClickMask
                    portalContainerClassName={WARRPER_CONTENT}
                    containerClassName={PAGE_EDITOR}
                    componentId={curComponentId}
                />)
        }
        <div className={WARRPER_CONTENT}></div>
    </div>
}

export default Editor