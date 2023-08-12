import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface PProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	size?: 's' | 'm' | 'l';
	children: ReactNode;
	color?: 'ghost' | 'red' | 'grey' | 'green' | 'primary';
	href?: string;
}