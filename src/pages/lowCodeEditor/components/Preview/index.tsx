import React, { useRef } from "react"
import { omit } from 'lodash-es'
import { message } from "antd"

import { Component, useComponetsStore } from "@/store/Editor"
import { ComponentEvent, useComponentConfigStore } from "@/store/Editor/config"
import { EventConfig } from "../Setting/components/EventSetting"

const Preview = () => {
    const { components } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore();

    const methodRefs = useRef<Record<string, any>>({})

    function formatEventProps(componentProps: Record<string, any>, eventsSetter: ComponentEvent[]) {
        if (!eventsSetter.length) return {}
        const eventProps: Record<string, any> = {}
        eventsSetter.forEach((item) => {
            const currEventProps = componentProps[item.name]
            if (currEventProps?.actions) {
                eventProps[item.name] = () => {
                    currEventProps?.actions.forEach((action: EventConfig) => {
                        const { type, config } = action
                        if (type === 'goToLink') {
                            window.open(config?.url, '_blank')
                        } else if (type === 'showMessage') {
                            switch (config?.type) {
                                case 'success':
                                    message.success(config.showMessage)
                                    break;
                                case 'error':
                                    message.error(config.showMessage)
                                    break;
                                default:
                                    message.info(config?.showMessage)
                            }
                        } else if (type === 'customJS') {
                            const func = new Function('context', config?.code)
                            func({ name: item.name, props: componentProps })
                        } else if (type === 'linkage') {
                            const component = methodRefs.current[config?.componentId]
                            if (component) {
                                component[config?.actionType]()
                            }
                        }
                    })

                }
            }
        })

        return eventProps
    }

    const renderComponent = (components: Component[]): React.ReactNode => {

        return components.map((component) => {
            const config = componentConfig[component.name];

            if (!config?.prod) {
                return null
            }

            const restProps = omit(component.props, componentConfig[component.name]?.eventsSetter?.map(item => item.name) || [])
            const eventProps = formatEventProps(component.props, config.eventsSetter || [])

            return React.createElement(config.prod, {
                key: component.id,
                id: component.id,
                name: component.name,
                styles: component?.styles,
                ref: (ref: React.RefObject<any>) => {
                    methodRefs.current[component.id] = ref
                },
                ...config.defaultProps,
                ...restProps,
                ...eventProps,
            }, renderComponent(component.children || []))
        })

    }

    return <div
        className={`h-[100%]`}
        style={{ position: 'relative' }}
    >
        {renderComponent(components)}
    </div>
}

export default Preview