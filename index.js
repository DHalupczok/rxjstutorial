const {Observable} = require("rxjs")
const {map, pluck, filter} = require("rxjs/operators")
const observable = new Observable((subscriber) => {
    subscriber.next(usersWithRightAverageAge)
    //subscriber.next(usersWithToLowAverageAge)
    subscriber.next(usersWithLessThan5Elements)
    subscriber.next(usersWithRightAverageAge)
}).pipe(
  /*  map((value) => {
        //console.log("1 .Inside of first operator", value)
        return value.data
        }
    ),*/
    pluck("data"),
    filter((users) => users.length >=5),
    map((value) => {
        //console.warn("2. Got data from first operator in second operator", value)
        return value.filter(user => user.status === "active")
    }),
    map((value) => {
        //console.log("3. Got data from second operator in third operator", value)
        return (value.reduce((accumulator, currentValue) => accumulator + currentValue.age, 0) / value.length);
    }),
    map((value) => {
        //console.log("4. Got data from third operator in fourth operator", value)
        if (value < 18) throw new Error("Average age is too young!")
        else return value;
    }),
)

const usersWithRightAverageAge = {
    data: [
        {
            status: 'active',
            age: 14
        },
        {
            status: 'inactive',
            age: 32
        },
        {
            status: 'active',
            age: 53
        },
        {
            status: 'active',
            age: 19
        },
        {
            status: 'inactive',
            age: 24
        },
        {
            status: 'active',
            age: 69
        },
        {
            status: 'inactive',
            age: 77
        },
        {
            status: 'active',
            age: 20
        },
    ]
}

const usersWithToLowAverageAge = {
    data: [
        {
            status: 'active',
            age: 14
        },
        {
            status: 'inactive',
            age: 15
        },
        {
            status: 'active',
            age: 14
        },
        {
            status: 'active',
            age: 19
        },
        {
            status: 'inactive',
            age: 4
        },
        {
            status: 'active',
            age: 5
        },
        {
            status: 'inactive',
            age: 11
        },
        {
            status: 'active',
            age: 20
        },
    ]
}
const usersWithLessThan5Elements = {
    data: [
        {
            status: 'active',
            age: 14
        },
        {
            status: 'inactive',
            age: 15
        },
        {
            status: 'active',
            age: 14
        },
        {
            status: 'active',
            age: 19
        },
    ]
}

const observer = {
    next: (value) => {
        console.log("Observer got a value of ", value)
    },
    error: (err) => {
        console.warn("Observer got an error: ", err)
    },
    complete: () => {
        console.log("Observer gor an complete notification")
    }
}

observable.subscribe(observer);
