import React, {useState} from "react"

function TickTacToe() {
    const [board, setBoard] = useState([["", "", ""],
                                        ["", "", ""],
                                        ["", "", ""]])
    const [turn, setTurn] = useState("X")
    function Button(props){
        return (
            <div className="square" onClick={handleClick(props.x, props.y)}>{board[props.y][props.x]}</div>
        )
    }
    function handleClick(x, y){
        setBoard(board => board[parseInt(y)][parseInt(x)] = turn)
        turn === "X" ? setTurn("Y") : setTurn("X")
    }
    return (
        <div className="board">
            <div className="row">
                <Button x={0} y={0} />
                <Button x={1} y={0} />
                <Button x={2} y={0} />
            </div>
            <div className="row">
                <Button x={0} y={1} />
                <Button x={1} y={1} />
                <Button x={2} y={1} />
            </div>
            <div className="row">
                <Button x={0} y={2} />
                <Button x={1} y={2} />
                <Button x={2} y={2} />
            </div>
        </div>
    )

    
}



export default TickTacToe