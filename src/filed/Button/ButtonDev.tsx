import { Button as AntButton } from "antd";
import { ButtonType } from 'antd/es/button';
import { CommonComponent } from "@/store/Editor";
import { useDrag } from "react-dnd";

export interface ButtonProps {
    type: ButtonType,
    text: string;
}

const Button = ({ type, text, id, styles }: CommonComponent & ButtonProps) => {

    const [, drag] = useDrag({
        type: 'Button',
        item: {
            type: 'Button',
            id: id,
            dropType: 'move'
        }
    })

    return <AntButton ref={drag} data-component-id={id} style={styles} type={type}>{text}</AntButton>

}

export default Button