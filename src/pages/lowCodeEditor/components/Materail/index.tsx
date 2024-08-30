
import { Tabs } from 'antd'

import Materail from './Materail'
import Outline from './Outline'
import Source from './Source'

const warrper = () => {
    const tabItems = [
        {
            label: '物料',
            key: 'material',
            children: <Materail />
        },
        {
            label: '大纲',
            key: 'outline',
            children: <Outline />
        },
        {
            label: '源码',
            key: 'sorce',
            children: <Source />
        }
    ]

    return <Tabs
        className='h-[calc(100vh-60px)]'
        tabPosition='left' items={tabItems}
        defaultActiveKey='material'
    />

}

export default warrper