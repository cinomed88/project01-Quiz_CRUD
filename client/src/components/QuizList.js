import QuizForAdmin from './QuizForAdmin';

function QuizList(props) {
    let i = 0;
    const list = props.data.map(
        data => {
            i++;
            return (
            <div>
                <h1 style={{textAlign: "center", marginBottom: 10}}>Question {i}</h1>
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