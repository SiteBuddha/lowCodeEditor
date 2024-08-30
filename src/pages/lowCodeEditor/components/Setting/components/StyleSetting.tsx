import { useEffect, useState } from 'react'
import { debounce } from 'lodash-es'
import styleToObject from 'style-to-object'

import { Form, message } from 'antd'

import { useComponetsStore } from "@/store/Editor"
import { useComponentConfigStore } from "@/store/Editor/config"
import { renderEle } from '../covert'
import CssEditor from './CssEditSetting'


const StyleSetting = () => {
    const { curComponent, curComponentId, updateStyles } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore()

    const [cssValue, setCss] = useState<string>(`.comp {\n\n}`)

    const [form] = Form.useForm()

    useEffect(() => {
        form?.resetFields()

        const data = form?.getFieldsValue()
        form.setFieldsValue({
            ...data,
            ...curComponent?.styles
        })

        setCss(toCssStr(curComponent?.styles || {}))
    }, [curComponent])

    function toCssStr(css: Record<string, any>) {
        let str = `.comp { \n`
        for (const key in css) {
            const value = css[key]
            if (!value || ['width', 'height'].includes(key)) {
                continue
            }

            str += `\t${key}: ${value};\n`
        }

        str += '}'
        return str
    }

    if (!curComponent || !curComponentId) {
        return null
    }


    function renderFormItems() {
        const { stylesSetter } = componentConfig[curComponent!.name]
        return stylesSetter?.map(item => <Form.Item key={item.name} name={item.name} label={item.label}>
            {renderEle(item)}
        </Form.Item>)
    }

    const handleEditorChange = debounce((value) => {
        const css: Record<string, any> = {};

        try {
            const cssStr = value.replace(/\/\*.*\*\//, '') // 去掉注释 /** */
                .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
                .replace('}', '');// 去掉 }

            styleToObject(cssStr, (name, value) => {
                css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value;
            });

            updateStyles(curComponentId, { ...form.getFieldsValue(), ...css }, true);
        } catch {
            message.error('CSS格式错误');
        }
    }, 1000);


    return <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onValuesChange={(values) => {
            updateStyles(curComponentId, values)
        }}
    >
        {renderFormItems()}
        <div className='h-[200px] border-[1px] border-[#ccc] ml-[16px]'>
            <CssEditor value={cssValue} onChange={handleEditorChange} />
        </div>
    </Form>
}

export default StyleSetting