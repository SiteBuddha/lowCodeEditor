import { useEffect, useState } from "react"

import { message, Modal, Tabs } from "antd"

import { EventConfig, EventConfigType } from "../EventSetting"
import GoToLink from "./GoToLink";
import ShowMessage from "./ShowMessage";
import { CustomJS } from "./Custom";
import Linkage from "./Linkage";

interface ActionModelPorps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onOk: (config: EventConfig) => void;
    curAction?: EventConfig,
}

const ActionModel = ({ visible, setVisible, onOk, curAction }: ActionModelPorps) => {
    const [currTab, setCurrTab] = useState<EventConfigType>('goToLink')
    const [actionConfig, setActionConfig] = useState<Omit<EventConfig, 'id'>>()

    useEffect(() => {
        if (curAction) {
            setActionConfig(curAction)
            setCurrTab(curAction.type)
        } else {
            setActionConfig(undefined)
            setCurrTab('goToLink')
        }
    }, [curAction])

    const items = [
        {
            key: 'goToLink',
            label: '跳转链接',
            children: <GoToLink value={actionConfig} onChange={(config) => {
                setActionConfig(config)
            }} />
        },
        {
            key: 'showMessage',
            label: '提示信息',
            children: <ShowMessage value={actionConfig} onChange={(config) => {
                setActionConfig(config)
            }} />
        },
        {
            key: 'linkage',
            label: '组件联动',
            children: <Linkage value={actionConfig} onChange={(config) => {
                setActionConfig(config)
            }} />
        },
        {
            key: 'customJS',
            label: '自定义JS',
            children: <CustomJS value={actionConfig} onChange={(config) => {
                setActionConfig(config)
            }} />
        },
    ]

    const handleOk = () => {
        if (!actionConfig) {
            message.error('请填写事件配置')
            return
        }
        onOk({
            ...actionConfig,
            id: curAction?.id ?? new Date().getTime().toString()
        })
    }


    return <Modal
        width='700px'
        title='事件处理配置'
        open={visible}
        okText='确认配置'
        cancelButtonProps={{ style: { display: 'none' } }}
        onOk={() => handleOk()}
        onClose={() => setVisible(false)}
        onCancel={() => setVisible(false)}
    >
        <Tabs
            tabPosition='left'
            activeKey={currTab}
            onChange={(activeKey) => setCurrTab(activeKey as EventConfigType)}
            items={items}
        />
    </Modal>
}

export default ActionModel