import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface ModalSettingsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: ReactNode;

}