import { useEffect, useState } from "react"

import { Input, Select } from "antd"

import { EventConfig } from "../EventSetting"
import { useComponetsStore } from "@/store/Editor"

interface ShowMessageProps {
    value?: Omit<EventConfig, 'id'>
    onChange: (value: Omit<EventConfig, 'id'>) => void
}

const ShowMessage = ({ value, onChange }: ShowMessageProps) => {

    const { curComponentId } = useComponetsStore()

    const [type, setType] = useState<string>()
    const [showMessage, setShowMessage] = useState<string>()

    useEffect(() => {
        if (value) {
            setType(value.config?.type)
            setShowMessage(value.config?.showMessage)
        } else {
            setType(undefined)
            setShowMessage(undefined)
        }
    }, [value])

    function messageTypeChange(value: string) {
        if (!curComponentId) return;

        setType(value);

        onChange?.({
            type: 'showMessage',
            config: {
                type: value,
                showMessage
            }
        })
    }

    function messageTextChange(value: string) {
        if (!curComponentId) return;

        setShowMessage(value);

        onChange?.({
            type: 'showMessage',
            config: {
                type,
                showMessage: value
            }
        })
    }


    return <div className="mb-[10px]">
        <div className="flex items-center gap-[10px] mb-[10px]">
            <div>类型</div>
            <Select
                style={{ width: 200 }}
                options={[
                    { label: '成功', value: 'success' },
                    { label: '失败', value: 'error' },
                ]}
                onSelect={(value) => messageTypeChange(value)}
                value={type}
            />
        </div>
        <div className="flex items-center gap-[10px] mb-[10px]" >
            <div>提示内容</div>
            <Input
                type="text"
                onChange={(e) => messageTextChange(e.target.value)}
                value={showMessage}
                style={{ width: '200px' }} />
        </div >
    </div>
}

export default ShowMessage