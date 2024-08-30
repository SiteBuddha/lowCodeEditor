import { useEffect, useState } from "react"

import { Select, TreeSelect } from "antd"

import { EventConfig } from "../EventSetting"
import { useComponetsStore, getComponentById, Component } from "@/store/Editor"
import { useComponentConfigStore } from "@/store/Editor/config"

interface GoToLinkProps {
    value?: Omit<EventConfig, 'id'>,
    onChange: (config: Omit<EventConfig, 'id'>) => void
}

const GoToLink = ({ value, onChange }: GoToLinkProps) => {

    const { components, curComponentId, } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore()
    const [actionType, setActionType] = useState<string>()
    const [selectedComponent, setSelectedComponent] = useState<Component | null>();

    useEffect(() => {
        if (value) {
            setActionType(value?.config?.actionType)
            setSelectedComponent(getComponentById(value?.config?.componentId, components))
        } else {
            setActionType(undefined)
            setSelectedComponent(undefined)
        }
    }, [value])

    function componentChange(value: number) {
        if (!curComponentId) return null
        setSelectedComponent(getComponentById(value, components))
    }

    function componentMethodChange(value: string) {
        if (!curComponentId || !selectedComponent) return;
        console.log(value)
        setActionType(value);

        onChange?.({
            type: 'linkage',
            config: {
                componentId: selectedComponent?.id,
                actionType: value
            }
        })
    }

    return <div className="mb-[10px]">
        <div className="flex items-center gap-[10px] mb-[10px]">
            <div>组件</div>
            <TreeSelect
                style={{ width: 500, height: 50 }}
                treeData={components}
                value={selectedComponent?.id}
                fieldNames={{
                    label: 'name',
                    value: 'id',
                }}
                onChange={(value) => { componentChange(value) }}
            />
        </div>
        {componentConfig[selectedComponent?.name || ''] && (
            <div className='flex items-center gap-[10px] mt-[20px]'>
                <div>方法：</div>
                <div>
                    <Select
                        style={{ width: 500, height: 50 }}
                        options={componentConfig[selectedComponent?.name || ''].methods?.map(
                            method => ({ label: method.label, value: method.name })
                        )}
                        value={actionType}
                        onChange={(value) => { componentMethodChange(value) }}
                    />
                </div>
            </div>
        )}
    </div>
}

export default GoToLink