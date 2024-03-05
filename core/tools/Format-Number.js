const data = [1,2,3,4,5]

function reduce(array){
    array.reduce((acc, item)=>{
        acc = acc + item
    }, 0)
}

reduce(data)