import React, { useState } from "react"

import { Segmented } from "antd"
import AttrSetting from "./components/AttrSetting"
import StyleSetting from "./components/StyleSetting"
import EventSetting from "./components/EventSetting"

const SettingEnum: Record<string, React.ReactNode> = {
    1: <AttrSetting />,
    2: <StyleSetting />,
    3: <EventSetting />,
}

const Setting = () => {
    const [key, setKey] = useState<string>('1')
    return <div>
        <Segmented
            value={key}
            onChange={setKey}
            block
            options={[
                { label: '属性', value: '1' },
                { label: '样式', value: '2' },
                { label: '事件', value: '3' }]
            }
            size="large"
        />
        <div className="mt-[16px] pr-[16px]">{SettingEnum[key]}</div>
    </div>
}

export default Setting