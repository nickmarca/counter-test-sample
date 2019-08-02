import React from 'react';
import TestRenderer from 'react-test-renderer';

import App from './App';

describe('App component with 0 todos', () => {
  const setStateFns = new Map();
  const useStateSpy = jest.spyOn(React, 'useState');

  useStateSpy.mockImplementation((init) => {
    if (setStateFns.size === 0) {
      setStateFns.set('message', jest.fn());
      return [init, setStateFns.get('message')];
    }

    if(setStateFns.size === 1) {
      setStateFns.set('todos', jest.fn());
      return [init, setStateFns.get('todos')];
    }
  });

  const testRenderer = TestRenderer.create(<App/>);
  const testInstance = testRenderer.root;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  test('should have state 0 at begging', () => {
    const setState = setStateFns.get('todos');
    testInstance.findByType('button').props.onClick();
    expect(setState).toHaveBeenCalled();
  });

  test('should have state 0 at begging', () => {
    const setState = setStateFns.get('message');
    testInstance.findByType('input').props.onChange({ target: { value: 'hello'}});
    testInstance.findByType('button').props.onClick();
    expect(setState).toHaveBeenCalledWith('hello');
  });
});

describe('App component with 1 todo', () => {
  const setStateFns = new Map();
  const useStateSpy = jest.spyOn(React, 'useState');

  const initTodo = [{
    message: 'Todo #1',
    id: 1,
    completed: false
  }];

  useStateSpy.mockImplementation((init) => {
    if (setStateFns.size === 0) {
      setStateFns.set('message', jest.fn());
      return [init, setStateFns.get('message')];
    }

    if(setStateFns.size === 1) {
      setStateFns.set('todos', jest.fn());
      return [initTodo, setStateFns.get('todos')];
    }
  });

  const testRenderer = TestRenderer.create(<App/>);
  const testInstance = testRenderer.root;

  const todoItem = testInstance.findByProps({id: 'id-1'});

  test('renders without crashing', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  test('renders a list element', () => {
    expect(todoItem).toBeTruthy();
  });

  test('complete task', () => {
    const setState = setStateFns.get('todos');

    testInstance.findByProps({id: 'todo-button-1'}).props.onClick();
    expect(setState).toBeCalledWith([{ ...initTodo[0], completed: true }]);
  });
});
