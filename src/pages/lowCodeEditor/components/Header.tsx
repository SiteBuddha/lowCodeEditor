import { Button } from "antd"

import { useComponetsStore } from "@/store/Editor"

const Header = () => {

    const { mode, setMode } = useComponetsStore()

    return <div className="h-[60px] flex justify-between items-center border-solid border-b-[1px] border-[#b1a9a9] px-[10px]">
        <div>Header</div>
        <div>
            <Button type='primary' onClick={() => setMode(mode === 'preview' ? 'edit' : 'preview')}>
                {mode === 'preview' ? '退出预览' : '预览'}
            </Button>
        </div>
    </div>
}

export default Header