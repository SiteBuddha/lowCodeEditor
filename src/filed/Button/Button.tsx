import { omit } from 'lodash-es'

import { Button as AntButton } from "antd";
import { ButtonType } from 'antd/es/button';

import { CommonComponent } from "@/store/Editor";

export interface ButtonProps {
    type: ButtonType,
    text: string;
}

const Button = ({ type, text, styles, ...restProps }: CommonComponent & ButtonProps) => {

    return <AntButton style={styles} type={type} {...omit(restProps, 'id')}>{text}</AntButton>

}

export default Button