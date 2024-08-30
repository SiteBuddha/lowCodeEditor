import { Form, Input } from 'antd'

import { useComponetsStore } from "@/store/Editor"
import { useComponentConfigStore } from "@/store/Editor/config"
import { useEffect } from 'react'
import { renderEle } from '../covert'

const Attr = () => {
    const { curComponent, curComponentId, updateComponentProps } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore()

    const [form] = Form.useForm()

    useEffect(() => {
        const data = form?.getFieldsValue()
        form.setFieldsValue({
            ...data,
            ...curComponent?.props
        })
    })

    if (!curComponent || !curComponentId) {
        return null
    }


    function renderFormItems() {
        const { propsSetter } = componentConfig[curComponent!.name]
        return propsSetter?.map(item => <Form.Item key={item.name} name={item.name} label={item.label}>
            {renderEle(item)}
        </Form.Item>)
    }


    return <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onValuesChange={(values) => {
            updateComponentProps(curComponentId, values)
        }}
    >
        <Form.Item key='id' label="组件ID">
            <Input value={curComponent.id} disabled />
        </Form.Item>
        <Form.Item key='name' label="组件名称">
            <Input value={curComponent.name} disabled />
        </Form.Item>
        <Form.Item key='desc' label="组件描述">
            <Input value={curComponent.desc} disabled />
        </Form.Item>
        {renderFormItems()}
    </Form>

}


export default Attr