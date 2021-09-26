import React from 'react';
import TasksFilter from '../tasks-filter';
import './footer.css';


interface IProps {
    count: number,
    btnClear: React.MouseEventHandler<HTMLButtonElement>,
    filter: string,

    btnFilter(text: string): void,
}

const Footer = ({count, btnClear, filter, btnFilter}: IProps) => {

    return (
        <footer className="footer">
            <span className="todo-count">{count} items left</span>
            <TasksFilter filter={filter} btnFilter={btnFilter}/>
            <button type="button" className="clear-completed" onClick={btnClear}>
                Clear completed
            </button>
        </footer>
    );
};

export default Footer;
