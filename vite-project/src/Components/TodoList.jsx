import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrash, FaEdit, FaPlus, FaSave } from 'react-icons/fa';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);  //todoları listdə tutmaq üçün vəziyyət idarəedici
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos && savedTodos[0] === '[') {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const addTodo = () => {
    if (inputValue !== '') {
      const newTodos = [...todos, { text: inputValue, completed: false }];
      setTodos(newTodos);
      setInputValue('');
      localStorage.setItem('todos', JSON.stringify(newTodos));
    } else {
      alert('Zəhmət olmasa tapşırığı daxil edin.');
    }
  };
console.log(addTodo);
  const deleteTodo = (indexToDelete) => {
    const newTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const saveTodo = () => {
    const newTodos = todos.map((todo, index) => (index === editIndex ? { ...todo, text: editValue } : todo));
    setTodos(newTodos);
    setEditIndex(null);
    setEditValue('');
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <Container className="todo-list-container">
      <h1>Todo List</h1>
      <Form.Group className="d-flex mb-3">
        <Form.Control 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a new task..."
          className="me-2"
        />
        <Button onClick={addTodo} variant="success">
          <FaPlus />
        </Button>
      </Form.Group>
      <ListGroup>
        {todos.map((todo, index) => (
          <ListGroup.Item 
            key={index} 
            className={`d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}
          >
            <div className="d-flex align-items-center">
              <Form.Check 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleComplete(index)}
                className="me-2"
              />
              <div className="custom-label">{`${index + 1}. ${todo.text}`}</div>
            </div>
            {editIndex === index ? (
              <>
                <Form.Control 
                  type="text" 
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)} 
                />
                <Button onClick={saveTodo} variant="primary" className="ms-2">
                  <FaSave />
                </Button>
              </>
            ) : (
              <div className="ms-auto">
                <Button onClick={() => editTodo(index)} variant="warning" className="me-2">
                  <FaEdit />
                </Button>
                <Button onClick={() => deleteTodo(index)} variant="danger">
                  <FaTrash />
                </Button>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default TodoList;
