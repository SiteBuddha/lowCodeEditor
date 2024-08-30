import { create } from "zustand";

import {
    Button, ButtonDev, Container, ContainerDev,
    Modal, ModalDev, Page, PageDev
} from '@/filed';

export interface ComponentSetter {
    type: string;
    label: string;
    name: string;
    [key: string]: any
}

export interface ComponentEvent {
    name: string;
    label: string;
}

export interface ComponentMethod {
    name: string;
    label: string;
}

export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>,
    desc: string,
    dev: any,
    prod: any,
    propsSetter?: ComponentSetter[],
    stylesSetter?: ComponentSetter[],
    eventsSetter?: ComponentEvent[],
    methods?: ComponentMethod[]
}

interface State {
    componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
    registerComponent: (name: string, componentConfig: ComponentConfig) => void
}


const useComponentConfigStore = create<State & Action>((set) => ({
    componentConfig: {
        Container: {
            name: 'Container',
            defaultProps: {},
            desc: '容器',
            dev: ContainerDev,
            prod: Container,
        },
        Button: {
            name: 'Button',
            defaultProps: {
                type: 'primary',
                text: '按钮'
            },
            dev: ButtonDev,
            prod: Button,
            desc: '钮按',
            propsSetter: [
                {
                    type: 'select',
                    label: '类型',
                    name: 'type',
                    options: [
                        { label: '默认', value: 'default' },
                        { label: '主要', value: 'primary' },
                        { label: '虚线', value: 'dashed' },
                    ]
                },
                {
                    type: 'input',
                    label: '文本',
                    name: 'text'
                }
            ],
            stylesSetter: [
                {
                    type: 'inputNumber',
                    label: '宽度',
                    name: 'width'
                },
                {
                    type: 'inputNumber',
                    label: '高度',
                    name: 'height'
                }
            ],
            eventsSetter: [
                {
                    name: 'onClick',
                    label: '点击事件'
                },
            ]
        },
        Modal: {
            name: 'Modal',
            defaultProps: {
                title: '弹出框',
            },
            dev: ModalDev,
            prod: Modal,
            desc: '弹出框',
            propsSetter: [
                {
                    type: 'input',
                    label: '标题',
                    name: 'text'
                }
            ],
            stylesSetter: [],
            eventsSetter: [
                {
                    label: '确认事件',
                    name: 'onOk'
                },
                {
                    label: '取消事件',
                    name: 'onCancel'
                }
            ],
            methods: [
                {
                    name: 'open',
                    label: '打开'
                },
                {
                    name: 'close',
                    label: '关闭'
                }
            ]
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            dev: PageDev,
            prod: Page,
            desc: '页面'
        }
    },
    registerComponent: (name, componentConfig) =>
        set((state) => ({
            componentConfig: {
                ...state.componentConfig,
                [name]: componentConfig
            }
        }))
}))

export { useComponentConfigStore };