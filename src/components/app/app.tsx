import React, {useState, useCallback} from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

interface IToDo {
    id: number,
    text: string,
    active: boolean,
    edit: boolean,
    addTime: Date,
    sec: number,
}

const App: React.FC = () => {

    const [todoData, setTodoData] = useState<IToDo[] | []>([]);
    const [filters, setFilters] = useState<string>('all');
    const [numID, setNumID] = useState<number>(100);


    const onFilter = (item: Array<IToDo>, value: string) => {
        if (value === 'active') return item.filter((el: IToDo) => el.active);
        if (value === 'complected') return item.filter((el: IToDo) => !el.active);
        return item;
    };

    const deleteItem = (id: number) => {

        const idx: number = todoData.findIndex((el) => el.id === id);
        const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
        setTodoData(newData)

    };

    const onActive = (id: number): void => {

        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = {
            ...oldItem,
            active: !oldItem.active,
        };
        const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        setTodoData(newData)
    };

    const editForm = (id: number, text: string): void => {
        if (text.length === 0) {
            return;
        }
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = {
            ...oldItem,
            text,
            edit: !oldItem.edit,
        };
        const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        setTodoData(newData)
    };

    const onEdit = (id: number): void => {

        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = {
            ...oldItem,
            edit: !oldItem.edit,
        };
        const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        setTodoData(newData)

    };


    const addTask = useCallback((text: string, sec = 0): void => {
        if (text.length === 0) {
            return;
        }
        setNumID(numID + 1);

        const newTask: IToDo = {
            id: numID,
            text,
            active: true,
            edit: false,
            addTime: new Date(),
            sec,
        };

        const newData: Array<IToDo> = [newTask, ...todoData];
        setTodoData(newData)
    }, [todoData, numID]);


    const btnClear = (): void => {

        const activeData = todoData.filter((item) => item.active);

        setTodoData(activeData)

    };

    const btnFilter = (filter: any): void => {
        setFilters(filter);
    };


    const countComplected = todoData.filter((item) => item.active).length;

    const filter = onFilter(todoData, filters);


    return (
        <div className="todoapp">
            <NewTaskForm addTask={addTask}/>

            <TaskList
                todos={filter}
                onDelete={deleteItem}
                onActive={onActive}
                onEdit={onEdit}
                addTask={addTask}
                editForm={editForm}
            />
            <Footer
                count={countComplected}
                filter={filters}
                btnFilter={btnFilter}
                btnClear={btnClear}
            />
        </div>
    );


}


export default App;