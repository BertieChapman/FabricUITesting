import React from 'react';
import {Overlay} from 'office-ui-fabric-react/lib/Overlay';
import {Spinner, SpinnerSize} from 'office-ui-fabric-react/lib/Spinner';

import './progress-overlay-component.css';

interface IProgressOverlayComponentProps{
    visible: boolean,
    text: string
}

const ProgressOverlayComponent = (props: IProgressOverlayComponentProps): JSX.Element => {

    return (
        <div>
            {props.visible && (
                <Overlay>
                    <Spinner size={SpinnerSize.large} label={props.text}/>
                </Overlay>
            )}
        </div>
    );
}

export {
    ProgressOverlayComponent
}