import QuizForAdmin from "./QuizForAdmin";

function QuizList(props) {
    let index = 0;
    const list = props.data.map(
        data => {
            index++;
            return (
            <div key={index}>
                <h1 style={{textAlign: "center", marginBottom: 10}}>Question {index}</h1>
                <QuizForAdmin data={data} removeData={props.removeData} updateData={props.updateData} />
            </div>
            );
        }
    );

    return(
    <div>
        {list}
    </div>
    );
};

export default QuizList;