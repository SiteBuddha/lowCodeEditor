import { Fragment, useState } from 'react'

import { Collapse, CollapseProps } from "antd"

import { useComponetsStore, getComponentById } from "@/store/Editor"
import { ComponentEvent, useComponentConfigStore } from "@/store/Editor/config"
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons"
import ActionModel from './Event/ActionModel'

export type EventConfigType = 'goToLink' | 'showMessage' | 'customJS' | 'linkage'

export interface EventConfig {
    type: EventConfigType,
    id: string,
    config?: {
        [key: string]: any
    }
}

const EventSetting = () => {
    const { componentConfig } = useComponentConfigStore()
    const { components, curComponent, curComponentId, updateComponentProps } = useComponetsStore()

    const [actionBol, setActionBol] = useState<boolean>(false)
    const [currEvent, setCurrEvent] = useState<ComponentEvent>()
    const [curAction, setCurAction] = useState<EventConfig>()

    if (!curComponent) return <div>请选择元素</div>

    const handleOk = (config?: EventConfig) => {
        if (!config || !currEvent || !curComponentId) return

        let actions: EventConfig[] = []

        if (curAction) {
            const otherActions = (curComponent?.props?.[currEvent.name]?.actions as (EventConfig)[] ?? [])
                .filter(item => item.id !== curAction.id)

            actions = otherActions.concat(config)
        } else {
            actions = [
                ...(curComponent?.props?.[currEvent.name]?.actions ?? []),
                { ...config, id: new Date().getTime().toString() }
            ]
        }

        updateComponentProps(curComponentId, {
            [currEvent.name]: { actions }
        })
        setActionBol(false)
        setCurAction(undefined)
        setCurrEvent(undefined)
    }

    const deleteAction = (event: ComponentEvent, action: EventConfig) => {
        if (!curComponentId) return
        updateComponentProps(curComponentId, {
            [event.name]: {
                actions: (curComponent?.props?.[event.name]?.actions as EventConfig[] ?? [])
                    .filter(item => item.id !== action.id)
            }
        })
    }

    const editAction = (event: ComponentEvent, action: EventConfig) => {
        if (!curComponentId) return
        setCurrEvent(event)
        setCurAction(action)
        setActionBol(true)
    }


    const collapseItems: CollapseProps['items'] = (componentConfig?.[curComponent?.name]?.eventsSetter ?? []).map(
        (item, index) => {
            return {
                key: index + item.name,
                label: item.label,
                children: curComponent?.props?.[item.name]?.actions && <div>
                    {
                        curComponent?.props?.[item.name]?.actions?.map((action: EventConfig) => {
                            return <Fragment key={action.id}>
                                {
                                    action.type === 'goToLink' ? <div className='border border-[#aaa] m-[10px] p-[10px]'>
                                        <div className='flex justify-between items-center'>
                                            <div className='text-[blue]'>跳转链接</div>
                                            <div className='flex items-center gap-[8px]'>
                                                <DeleteOutlined onClick={() => { deleteAction(item, action) }} />
                                                <EditOutlined onClick={() => editAction(item, action)} />
                                            </div>
                                        </div>
                                        <div>{action.config?.url}</div>
                                    </div> : null
                                }
                                {
                                    action.type === 'showMessage' ? <div className='border border-[#aaa] m-[10px] p-[10px]'>
                                        <div className='flex justify-between items-center'>
                                            <div className='text-[blue]'>提示信息</div>
                                            <div className='flex items-center gap-[8px]'>
                                                <DeleteOutlined onClick={() => { deleteAction(item, action) }} />
                                                <EditOutlined onClick={() => editAction(item, action)} />
                                            </div>
                                        </div>
                                        <div>{action.config?.type}</div>
                                        <div>{action.config?.showMessage}</div>
                                    </div> : null
                                }
                                {
                                    action.type === 'linkage' ? <div key="componentMethod" className='border border-[#aaa] m-[10px] p-[10px]'>
                                        <div className='flex justify-between items-center'>
                                            <div className='text-[blue]'>组件方法</div>
                                            <div className='flex items-center gap-[8px]'>
                                                <DeleteOutlined onClick={() => { deleteAction(item, action) }} />
                                                <EditOutlined onClick={() => editAction(item, action)} />
                                            </div>
                                        </div>
                                        <div>{getComponentById(action.config?.componentId, components)?.desc}</div>
                                        <div>{action.config?.componentId}</div>
                                        <div>{action.config?.actionType}</div>
                                    </div> : null
                                }
                                {
                                    action.type === 'customJS' ? <div className='border border-[#aaa] m-[10px] p-[10px]'>
                                        <div className='flex justify-between items-center'>
                                            <div className='text-[blue]'>自定义JS</div>
                                            <div className='flex items-center gap-[8px]'>
                                                <DeleteOutlined onClick={() => { deleteAction(item, action) }} />
                                                <EditOutlined onClick={() => editAction(item, action)} />
                                            </div>
                                        </div>
                                    </div> : null
                                }
                            </Fragment>
                        })
                    }
                </div >,
                extra: <PlusCircleOutlined onClick={(e) => {
                    e.stopPropagation()
                    setCurAction(undefined)
                    setActionBol(true)
                    setCurrEvent(item)
                }} />
            }
        })

    return <div className="w-[100%] ml-[10px]">
        <Collapse items={collapseItems} />
        <ActionModel
            visible={actionBol}
            curAction={curAction}
            setVisible={setActionBol}
            onOk={handleOk} />
    </div>
}

export default EventSetting