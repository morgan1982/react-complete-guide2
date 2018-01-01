import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 0, name: 'Max', age:28},
      { id: 1, name: 'John', age:30},
      { id: 2, name: 'Stephanie', age:36}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p => {
      return p.id === id;
    }));
    const person ={ ...this.state.persons[personIndex] };
    //const person - Object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
        persons
    })
  }

  togglePersonsHandler = () => {
    let toggle = false
    this.state.showPersons === false ? toggle = true : toggle = false;
    this.setState({
      showPersons: toggle
    })
  }
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons
    })
  }

  render() {

    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      color: 'white',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
                      click={() => this.deletePersonHandler(index)}
                      name={person.name}
                      age={person.age}
                      key={person.id}
                      changed={(e) => this.nameChangedHandler(e, person.id)}
                      />
          })}
       </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'tomato',
        color: 'black'
      }
    }
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>hello there</h1>
          <p className={classes.join(' ')}>this is ok</p> 
          <button
          onClick={ this.togglePersonsHandler }
          style={style}
          >Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>

    );
  }
}

export default Radium(App);
