import { useEffect, useState } from "react";

import MonacoEditor, { OnMount } from '@monaco-editor/react'
import { useComponetsStore } from "@/store/Editor";
import { EventConfig } from "../EventSetting";


export interface CustomJSProps {
    value?: Omit<EventConfig, 'id'>,
    onChange: (config: Omit<EventConfig, 'id'>) => void
}

export function CustomJS(props: CustomJSProps) {
    const { value, onChange } = props;

    const { curComponentId } = useComponetsStore()
    const [codeVal, setCodeVal] = useState<string>();

    useEffect(() => {
        if (value) {
            setCodeVal(value?.config?.code)
        } else {
            setCodeVal(undefined)
        }
    }, [value])

    function codeChange(code?: string) {
        if (!curComponentId) return;

        setCodeVal(code);

        onChange?.({
            type: 'customJS',
            config: {
                code
            }
        })
    }

    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });
    }

    return <div>
        <MonacoEditor
            width={'500px'}
            height={'400px'}
            path='action.js'
            language='javascript'
            onMount={handleEditorMount}
            onChange={codeChange}
            value={codeVal}
            options={
                {
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    minimap: {
                        enabled: false,
                    },
                    scrollbar: {
                        verticalScrollbarSize: 6,
                        horizontalScrollbarSize: 6,
                    },
                }
            }
        />
    </div>
}