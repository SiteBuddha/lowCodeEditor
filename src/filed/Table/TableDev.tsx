// 实现table 拖拽物料
import { useEffect, useMemo, useRef } from 'react';

import { Table as AntTable } from 'antd';

import { CommonComponent } from '@/store/Editor';
import { useComponentConfigStore } from '@/store/Editor/config';
import useMaterialDrop from '@/hooks/lowCode/useMaterailDrop';
import { useDrag } from 'react-dnd';


const Table = ({ id, styles }: CommonComponent) => {
    const { componentConfig } = useComponentConfigStore()

    const componentNames = useMemo(() => {
        return Object.keys(componentConfig).filter(item => item !== 'Page')
    }, [componentConfig])

    const divRef = useRef(null)

    const { isOver, drop } = useMaterialDrop(id, componentNames)

    const [, drag] = useDrag({
        type: 'Container',
        item: {
            type: 'Container',
            id: id,
            dropType: 'move'
        }
    })

    useEffect(() => {
        drag(divRef)
        drop(divRef)
    }, [])

    return <div
        data-component-id={id}
        ref={divRef}
        style={styles}
        className={`w-[100%] border-[2px] ${isOver ? ' border-blue-500' : 'border-gray-300'}`}
    >
        <AntTable pagination={false} />
    </div>
}

export default Table