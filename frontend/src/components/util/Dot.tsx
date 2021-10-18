import React from 'react';
import {Circle} from "@mui/icons-material";

interface DotProps {
    size?: number
    margin?: string
    color?: string
}

export default function ({size = 15, margin = '0 20px', color = '#FF0000'}: DotProps) {
    return (<Circle fontSize='small' alignmentBaseline="middle" sx={{
        margin: margin,
        height: size + 'px',
        width: size + 'px',
        color: color
    }}/>);
}
