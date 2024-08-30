import { useEffect, useState } from "react"

import { Input } from "antd"

import { EventConfig } from "../EventSetting"

interface GoToLinkProps {
    value?: Omit<EventConfig, 'id'>,
    onChange: (config: Omit<EventConfig, 'id'>) => void
}

const GoToLink = ({ value, onChange }: GoToLinkProps) => {
    const [url, setUrl] = useState<string>()

    useEffect(() => {
        if (value) {
            setUrl(value?.config?.url)
        } else {
            setUrl(undefined)
        }
    }, [value])

    return <div className="flex items-center gap-[10px] mb-[10px]">
        <div>跳转链接: </div>
        <Input
            type="link"
            onChange={(e) => onChange?.({ type: 'goToLink', config: { url: e.target.value } })}
            value={url}
            style={{ width: '200px' }}
        />
    </div>
}

export default GoToLink