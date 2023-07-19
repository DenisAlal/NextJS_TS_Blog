import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface ModalAuthProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: ReactNode;

}