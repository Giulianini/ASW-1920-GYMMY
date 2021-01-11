import React from 'react';
import TrainingBar from "./TrainingBar";

function Training(props) {
    const badges = ["Leg", "Upper", "Arm"]
    const trainingTime = "45'"
    const trainingCardTitle = "Bodyweight"

    return (
        <TrainingBar title={trainingCardTitle} badges={badges} trainingTime={trainingTime}/>
    );
}

export default Training;