import { Input, InputNumber, Select } from "antd";

import { ComponentSetter } from "@/store/Editor/config";

export function renderEle(setter: ComponentSetter) {
    switch (setter.type) {
        case 'input':
            return <Input type="text" />;
        case 'select':
            return <Select options={setter?.options} />
        case 'inputNumber':
            return <InputNumber />
        default:
            return null
    }
}