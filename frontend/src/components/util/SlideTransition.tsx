import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from "react";

export default React.forwardRef(function Transition(
    props: TransitionProps & {
        children?: any//React.ReactElement<any, any>;
    }, ref: React.Ref<unknown>) {
    return <Slide direction="up" ref={ref} children={''} {...props} />;
});
