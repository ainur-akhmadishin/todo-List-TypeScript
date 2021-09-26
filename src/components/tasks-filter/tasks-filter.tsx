import React from 'react';
import './tasks-filter.css';


interface ITascFilterFilter {
    btnFilter(text: string): void,

    filter: string,
}

const TasksFilter: React.FC<ITascFilterFilter> = ({filter, btnFilter}) => {


    const button = [
        {name: 'all', value: 'All'},
        {name: 'active', value: 'Active'},
        {name: 'complected', value: 'Complected'},
    ];

    const buttons = button.map((el) => {
        let classNm = '';
        if (filter === el.name) classNm += 'selected';
        return (
            <li key={el.name}>
                <button type="button" className={classNm} onClick={() => btnFilter(el.name)}>
                    {el.value}
                </button>
            </li>
        );
    });

    return <ul className="filters">{buttons}</ul>;
}


export default TasksFilter;
