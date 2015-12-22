/*
 * 定义一个数组，用于存放数据
 */

var TodoList = [];

/*
 *  actions
 */

var actions = {
    addTodo: function(text) {
        return {type: 'add', text: text };
    },

    delTodo: function(id) {
        return { type: 'del', id: id };
    },

    editTodo: function(id, text) {
        return { type: 'del', id: id, text: text };
    },

    showTodo: function() {
        return { type: 'show', data: TodoList };
    }

}



//初始state
var initialState = {
    data: TodoList,
    id: 0
}
 
/*
 *  reducer
 */
function todoReducer (state, action) {
    if (state === undefined) {
        state = initialState;
    }
    switch (action.type) {
        case 'add':
            state.data.push({id: state.id + 1, text: action.text})
            state.id = state.id + 1;
            return state
        case 'del':
            for (var i = 0; i < state.data.length; i++) {
                if (action.id === state.data[i].id) {
                    state.data.splice(i, 1);
                }
            }
            return state
        case 'edit':
            for (var i = 0; i < state.data.length; i++) {
                if (action.id === state.data[i].id) {
                    state.data[i].text = action.text;
                }
            }
            return state
        default:
            return state
    }
}

/*
 *  创建store
 */
var store = Redux.createStore(todoReducer)

console.log(store.getState());

store.dispatch(actions.addTodo('redux-jQuery-demo'));

console.log(store.getState());

renderList(store.getState());
/*
 *  页面上用到的方法
 */

function renderList(state) {
    var data = state.data;
    var ul = $('#todo-ul');
    ul.empty();
    data.forEach(function(item){
        ul.append('<li todoid="' + item.id + '" class="list-group-item">' + item.text + '<span class="badge" onclick="delTodo()">删除</span></li>');
    });
}

function addTodo() {
    var state;
    var text = $('#new-todo').val();
    store.dispatch(actions.addTodo(text));
    state = store.getState();
    renderList(state);
}

function delTodo() {
    var e = window.event;
    var id = parseInt($(e.target).parent().attr('todoid'), 10);
    store.dispatch(actions.delTodo(id));
    state = store.getState();
    renderList(state);
}
