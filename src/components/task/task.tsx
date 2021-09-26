import React, {useState, useEffect, useCallback, ChangeEvent, FormEvent} from 'react';
import {formatDistanceToNow} from 'date-fns';
import './task.css';

interface IProps {
    active: boolean,
    edit: boolean,
    id: number,
    text: string,
    addTime: Date,
    sec: number,

    onDelete(id: number): void,

    onActive(id: number): void,

    onEdit(id: number): void,

    editForm(id: number, text: string): void,
}

const Task: React.FC<IProps> = (props) => {

    const [value, setValue] = useState<string>('');
    const [formatData, setFormatData] = useState<string>('');
    const [flag, setFlag] = useState<boolean>(true);
    const [secund, setSecund] = useState<number>(props.sec);

    useEffect(() => {
        let ind: number = 0
        if (!flag) {
            ind = window.setInterval(() => {
                setSecund(secund + 1);
            }, 1000)
        }
        return () => {
            clearInterval(ind)
        }

    }, [flag, secund]);

    const editTask = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        props.editForm(props.id, value);
        setValue(value);
    };

    const newState = () => {
        setValue(props.text)
    };

    const editClick = () => {
        newState();
        props.onEdit(props.id);
    };

    const btnPlay = () => {

        if (!flag) {
            return;
        }

        setFlag(false);

    };

    const btnStop = () => {
        setFlag(true)
    };

    const actives = () => {
        btnStop();
        props.onActive(props.id);
    };

    const getMinute = useCallback(() => {
        setFormatData(formatDistanceToNow(props.addTime))
    }, [props.addTime])


    useEffect(() => {
        const timerID = setInterval(() => getMinute(), 1000);

        return () => {
            clearTimeout(timerID);

        };


    }, [getMinute])

    let se: string = (secund % 60).toString();
    let min: string = ((secund - parseFloat(se)) / 60).toString();
    if (parseFloat(se) < 10) {
        se = `0${se}`;
    }

    if (parseFloat(min) < 10) {
        min = `0${min}`;
    }

    let liClass = '';
    if (!props.active) {
        liClass = 'completed';
    }
    if (props.edit) {
        liClass = 'editing';
    }

    return (
        <li className={liClass}>
            <div className="view">
                <input className="toggle" type="checkbox" id={props.id.toString()} onClick={actives}/>
                <label htmlFor={props.id.toString()}>
            <span className="title" onKeyUp={() => {
            }} aria-hidden="true">
              {props.text}
            </span>
                    <span className="description">
              <button className="icon icon-play" type="button" onClick={btnPlay}/>
              <button className="icon icon-pause" type="button" onClick={btnStop}/>
                        {min}:{se}
            </span>

                    <span className="description"> created {formatData} ago </span>
                </label>

                <button type="button" className="icon icon-edit" onClick={editClick}/>
                <button type="button" className="icon icon-destroy" onClick={() => props.onDelete(props.id)}/>
            </div>

            <form onSubmit={onSubmit}>
                <input type="text" className="edit" value={value} onChange={editTask}/>
            </form>
        </li>
    );


}

export default Task;