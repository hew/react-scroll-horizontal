import {Component, ReactNode, CSSProperties} from "react";

interface HorizontalScrollConfig {
  stiffness: number;
  damping: number;
}

interface HorizontalScrollProps {
    pageLock?: boolean;
    reverseScroll?: boolean;
    style?: CSSProperties;
    config?: HorizontalScrollConfig;
    className?: string;
    animValues?: number;
    children: ReactNode | ReactNode[];
}

declare class HorizontalScroll extends Component<HorizontalScrollProps> {
	constructor(props:HorizontalScrollProps);
}

export default HorizontalScroll;
