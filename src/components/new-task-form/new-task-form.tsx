import React, {ChangeEvent, useState} from 'react';
import './new-task-form.css';

interface IProps {
    addTask(text: string, sec: number): void
}


const NewTaskForm: React.FC<IProps> = ({addTask}) => {


    const [text, setText] = useState<string>('');
    const [min, setMin] = useState<string>('');
    const [sec, setSec] = useState<string>('');


    const AddText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    };
    const AddMin = (event: ChangeEvent<HTMLInputElement>) => setMin(event.target.value);
    const AddSec = (event: ChangeEvent<HTMLInputElement>) => setSec(event.target.value);

    const toSecund = (minut: string, secund: string): number => {
        if (minut === '') {
            minut = '0'
        }

        if (secund === '') {
            secund = '0'
        }
        return parseFloat(minut) * 60 + parseFloat(secund)
    };

    const OnSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        const toSec = toSecund(min, sec);
        event.preventDefault();
        addTask(text, toSec);
        setText('');
        setMin('');
        setSec('');

    };


    return (
        <header className="header">
            <h1>todos</h1>
            <div className="new-todo-form">
                <form className="new-todo-form" onSubmit={OnSubmit}>
                    <input
                        type="text"
                        className="new-todo"
                        placeholder="Task"
                        value={text}
                        onChange={AddText}
                        name="text"
                    />
                </form>
                <form className="new-todo-form" onSubmit={OnSubmit}>
                    <input
                        type="number"
                        className="new-todo-form__timer"
                        placeholder="Min"
                        value={min}
                        onChange={AddMin}
                        name="min"
                    />
                </form>
                <form className="new-todo-form" onSubmit={OnSubmit}>
                    {' '}
                    <input
                        type="number"
                        className="new-todo-form__timer"
                        placeholder="Sec"
                        value={sec}
                        onChange={AddSec}
                        name="sec"
                    />
                </form>
            </div>
        </header>
    );
}


export default NewTaskForm;
