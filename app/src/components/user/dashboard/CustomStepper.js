import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import GradeIcon from '@material-ui/icons/Grade';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import StepConnector from '@material-ui/core/StepConnector';

withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useStepIconStyle = makeStyles({
    root: {
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function StepIcons(props) {
    const classes = useStepIconStyle();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

StepIcons.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const SteppingConnector = withStyles({
    alternativeLabel: {
        top: 23,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const StepsStyling = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function StepIconFilling(props) {
    const classes = StepsStyling();
    const {active, completed} = props;

    const icons = {
        1: <BeenhereIcon />,
        2: <GradeIcon />,
        3: <EmojiEventsIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

StepIconFilling.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

export default function CustomizedSteppers() {
    const [activeStep, setActiveStep] = React.useState(1);  // 0 = beginner, 1 = intermediate, 2 = advanced

    // Level increase
    const handleNext = () => {
        setActiveStep((prevLevel) => prevLevel + 1);
    };

    // Level decrease (perchè? boh. magari ti spacchi una gamba)
    const handleBack = () => {
        setActiveStep((prevLevel) => prevLevel - 1);
    };

    // Level reset to 0 (perchè? boh. magari ti spacchi pure l'altra)
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Stepper alternativeLabel activeStep={activeStep} connector={<SteppingConnector />}>
            <Step key={"Beginner"}>
                <StepLabel StepIconComponent={StepIconFilling}>{"Beginner (0-100 points)"}</StepLabel>
            </Step>
            <Step key={"Average"}>
                <StepLabel StepIconComponent={StepIconFilling}>{"Average (100-500 points)"}</StepLabel>
            </Step>
            <Step key={"Advanced"}>
                <StepLabel StepIconComponent={StepIconFilling}>{"Advanced (500+ points)"}</StepLabel>
            </Step>
        </Stepper>
    );
}
