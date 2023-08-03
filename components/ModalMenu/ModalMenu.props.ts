import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface ModalMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: ReactNode;

}