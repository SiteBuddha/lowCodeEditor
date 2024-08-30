import { CSSProperties, PropsWithChildren } from "react";
import { create } from "zustand";

export interface Component {
    id: number;
    name: string;
    props: Record<any, any>;
    desc: string;
    styles?: CSSProperties;
    children?: Component[];
    parentId?: number;
}

export interface CommonComponent extends PropsWithChildren {
    name: string;
    id: number;
    styles?: CSSProperties;
    [key: string]: any;
}

interface State {
    components: Component[];
    curComponent: Component | null;
    curComponentId: number | null;
    mode: 'edit' | 'preview';
}

interface Action {
    addComponent: (component: Component, parentId?: number) => void;
    deleteComponent: (componentId: number) => void;
    updateComponentProps: (componentId: number, props: any) => void;
    updateStyles: (componentId: number, styles: CSSProperties, replace?: boolean) => void;
    setCurComponent: (componentId: number | null) => void;
    setMode: (mode: 'edit' | 'preview') => void
}

export function getComponentById(id: number | null, components: Component[]): null | Component {
    if (!id) return null
    for (const component of components) {
        if (component.id === id) return component
        if (component.children && component.children.length > 0) {
            const child = getComponentById(id, component.children)
            if (child !== null) return child
        }
    }
    return null

}



export const useComponetsStore = create<State & Action>((set, get) => ({
    components: [
        {
            id: 1,
            name: 'Page',
            props: {},
            desc: '页面',
        }
    ],
    curComponent: null,
    curComponentId: null,
    mode: 'edit',
    setCurComponent: (componentId) => set((state) => ({
        curComponentId: componentId,
        curComponent: getComponentById(componentId, state.components)
    })),
    addComponent: (component, parentId) => {
        set(state => {
            if (parentId) {
                const parent = getComponentById(parentId, state.components)
                if (parent) {
                    if (parent.children) {
                        parent.children.push(component)
                    } else {
                        parent.children = [component]
                    }
                }
                component.parentId = parentId
                return { components: [...state.components] }
            }
            return { components: [...state.components, component] }
        })

    },
    deleteComponent: (componentId) => {
        const component = getComponentById(componentId, get().components)
        if (component?.parentId) {
            const parentCom = getComponentById(component?.parentId, get().components)
            if (parentCom) {
                parentCom.children = parentCom.children?.filter(c => c.id !== componentId)
                set(() => ({ components: get().components }))
            }
        }
    },
    updateComponentProps: (componentId, props) => {
        set((state) => {
            const component = getComponentById(componentId, state.components)
            if (component) {
                component.props = { ...component.props, ...props }

                return { components: [...state.components] }
            }

            return { components: [...state.components] }
        })
    },
    updateStyles: (componentId, styles, replace = false) => set((state) => {
        const component = getComponentById(componentId, state.components)
        if (component) {
            component.styles = replace ? { ...styles } : { ...component.styles, ...styles }
            return { components: [...state.components] }
        }

        return { components: [...state.components] }
    }),
    setMode: (mode) => set({ mode })
}))