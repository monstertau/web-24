import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    todos: [],
    inputValue: '',
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const todoContent = this.state.inputValue;
    const newTodo = {
      content: todoContent,
      finished: false,
    }
    this.setState({
      todos: [...this.state.todos, newTodo],
      inputValue: '',
    })
  }

  render() {
    console.log(this.state.todos);
    return (
      <div className="todo-app">
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' value={this.state.inputValue} onChange={(event) => {
            this.setState({
              inputValue: event.target.value
            });
          }} />
          <input type='submit' value='submit' />
        </form>
        {this.state.todos.map((item, index) => {
          return (
            <div key={index}>
              <input type="checkbox" checked={item.finished} onChange={(event) => {
                const newTodos = this.state.todos.map((todo, i) => {
                  if (index === i) {
                    return {
                      content: todo.content,
                      finished: event.target.checked,
                    }
                  } else {
                    return todo;
                  }
                })
                this.setState({
                  todos: newTodos,
                })
              }} />
              {item.finished ? <strike>{item.content}</strike> : <span>{item.content}</span>}
              <button onClick={(event) => {
                const NewTodos = this.state.todos.filter((todo, i) => {
                  if (index === i) {
                    return false;
                  }
                  return true;
                });
                this.setState({
                  todos: NewTodos,
                });
              }}>Delete</button>
            </div>
          );
        })}
      </div>
    )
  }
}
export default App;