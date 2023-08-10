import React, { useState, useEffect } from "react";

const QuizResult = (props) => {
    const [Image, SetImage] = useState(null);

    useEffect(() => {
        if (props.score > 8) {
            SetImage("/Images/p-removebg-preview.png");
        } else if (props.score >= 5) {
            SetImage("/Images/5-removebg-preview.png");
        } else if(props.score < 3){
            SetImage("/Images/3-removebg-preview.png") 
        }else if(props.score = 4){
            SetImage("/Images/3-removebg-preview.png") 
        }
    }, [props.score]);

    return (
        <div className="h-96 text-xl bg-cyan-400 rounded-lg p-auto text-center font-bold font-serif pt-16">
            <div>
                Your Score: {props.score}
                <br />
                Total Score: {props.totalScore}
                <h1 className="mt-4 font-serif text-2xl">Congrats You Win a Reward</h1>
            </div>
            {<img src={Image} alt="Score Reward" className="mt-4 w-48 h-48  m-auto" />}
        </div>
    );
};

export default QuizResult;
