var colorArray = [
    {color: 'red'},
    {color: 'orange'},
    {color: 'yellow'}
];

for (i=0;i<colorArray.length;i++){
    console.log(`i value: ${i} | Color Name: ${colorArray[i].color}`);
}
//---
console.log('---');

colorArray.forEach(function(obj,i){
    console.log(`i value: ${i} | Color Name: ${obj.color}`);
});
//---
console.log('---');

var emps = [
    {name: 'Bev', title:'manager', salary: 90000},
    {name: 'Bob', title:'developer', salary: 50000},
    {name: 'Sam', title:'designer', salary: 35000},
];

for (i=0; i < emps.length; i++){
    console.log(`${i}: ${emps[i].name} is a ${emps[i].title} who makes \$${emps[i].salary} per year`);
}
//---
console.log('---');

emps.forEach(function(emp, i){
   console.log(`${i}: ${emp.name} is a ${emp.title} who makes \$${emp.salary} per year`); 
});