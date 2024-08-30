import { Tree } from "antd"

import { useComponetsStore } from "@/store/Editor"

const Outline = () => {
    const { components, setCurComponent } = useComponetsStore()

    return <Tree
        className="pt-[16px]"
        fieldNames={{ title: 'desc', key: 'id' }}
        treeData={components as any}
        showLine
        defaultExpandAll
        onSelect={(key) => {
            setCurComponent(+key)
        }}
    />
}

export default Outline