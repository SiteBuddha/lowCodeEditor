import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { Modal as AntModal } from 'antd'

import { CommonComponent } from '@/store/Editor'

interface ModalRef {
    open: () => void,
    close: () => void
}

interface ModalProps extends CommonComponent {
    title: string,
    onCancel?: () => void,
    onOk?: () => void,
}

const Modal: React.ForwardRefRenderFunction<ModalRef, ModalProps> = (
    { children, title, onCancel, onOk, styles = {} }
    , ref) => {
    const [visible, setVisible] = useState(false)

    useImperativeHandle(ref, () => {
        return {
            open() {
                setVisible(true)
            },
            close() {
                setVisible(false)
            }
        }
    })

    return <AntModal
        title={title}
        style={styles}
        open={visible}
        onCancel={() => {
            if (onCancel) {
                onCancel()
            }
            setVisible(false);
        }}
        onOk={() => {
            if (onOk) {
                onOk()
            }
        }}
        destroyOnClose
    >
        {children}
    </AntModal>
}

export default forwardRef(Modal)