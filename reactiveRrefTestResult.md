# reactove/Ref/ watch テスト（reactive と ref の結果は同じ）

# Test #1: オブジェクトの値が変更される(1)

state: ✕ props:〇 watch:✕ deepWatch:〇

state:{ "id": "", "name": "" }
props.item:{ "id": "newVal", "name": "newVal" }

# Test #2: オブジェクトの値が変更される(2)

state: 〇 props:〇 watch:✕ deepWatch:〇

state:{ "id": "newVal", "name": "newVal" }
props.item:{ "id": "newVal", "name": "newVal" }

# Test #3: Ref にオブジェクトが再代入される

state: ✕ props:〇 watch:✕ deepWatch:〇

state:{ "id": "1", "name": "john" }
props.item:{ "id": "newVal", "name": "newVal" }

# Test #4: 配列の 1 番目要素の値が変更される

state: 〇 props:〇 watch:✕ deepWatch:〇

state:[
{
"id": "newVal",
"name": "newVal"
},
{
"id": "2",
"name": "kevin"
}
]
props.item:[
{
"id": "newVal",
"name": "newVal"
},
{
"id": "2",
"name": "kevin"
}
]

# Test #5: 配列の 1 番目要素にオブジェクトが再代入される

state: ✕ props:✕ watch:✕ deepWatch:✕

state:[
{
"id": "1",
"name": "john"
},
{
"id": "2",
"name": "kevin"
}
]
props.item:[
{
"id": "1",
"name": "john"
},
{
"id": "2",
"name": "kevin"
}
]

# Test #6: 配列の 1 番目要素にオブジェクトを push する

state: props:〇 watch:〇 deepWatch:〇

state:[
{
"id": "1",
"name": "john"
},
{
"id": "2",
"name": "kevin"
},
{
"id": "newVal",
"name": "newVal"
}
]
props.item:[
{
"id": "1",
"name": "john"
},
{
"id": "2",
"name": "kevin"
},
{
"id": "newVal",
"name": "newVal"
}
]

# Test #7: deep オブジェクトの値が変更される

state: 〇 props:〇 watch:✕ deepWatch:〇

state:{
"id": "1",
"name": "john",
"deep": {
"title": "newValue"
}
}
props.item:{
"id": "1",
"name": "john",
"deep": {
"title": "newValue"
}
}
