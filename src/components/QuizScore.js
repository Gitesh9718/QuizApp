import React, { useState, useEffect } from "react";
const QuizResult = (props) => {
    const [Image, SetImage] = useState(null);
    // const Preview = () =>{
    //     if()
    // }

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
        <div className="h-full text-xl bg-cyan-400 rounded-lg p-auto text-center font-bold font-serif pt-16">
            <div>
                Your Score: {props.score}
                <br />
                Total Score: {props.totalScore}
                <h1 className="mt-3 font-serif text-2xl p-2">Congrats <span className="text-3xl text-red-500">{props.name}</span> You Won a Reward</h1>
            </div>
            {<img src={Image} alt="Score Reward" className="mt-4 w-48 h-48  m-auto" />}
            <button className="border-1 p-3 font-serif my-4 m-2 rounded-lg bg-white shadow-xl shadow-gray hover:bg-green-500 shadow-spread">Preview</button>
        </div>
    );
};

export default QuizResult;
