import React from 'react';

interface ConditionalProps {
    condition: boolean
}

export default function Conditional({condition, children}: React.PropsWithChildren<ConditionalProps>) {
    return condition ? <>{children}</> : <></>;
}