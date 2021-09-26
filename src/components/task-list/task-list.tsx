import React from 'react';
import Task from '../task';
import './task-list.css';

type IToDo =  {
    id: number,
    text: string,
    active: boolean,
    edit: boolean,
    addTime: Date,
    sec: number,
}

interface IProps {
    onDelete(id: number): void,

    onActive(id: number): void,

    onEdit(id: number): void,

    editForm(id: number, text: string): void,

    addTask(text: string, sec: number): void,

    todos: IToDo[],
}

const TaskList = ({todos, onDelete, onActive, onEdit, editForm}: IProps) => {

    const elements = todos.map((item: IToDo) => {
        const {id} = item;
        return <Task
            {...item}
            key={id}
            onDelete={() => onDelete(id)}
            onActive={() => onActive(id)}
            onEdit={() => onEdit(id)}
            editForm={editForm}
        />
    });

    return (
        <main className="main">
            <ul className="todo-list" key="ul">
                {elements}
            </ul>
        </main>
    );
};

export default TaskList;
