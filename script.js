function solve() {
    const data = [
        { name: "A", value: 430 },
        { name: "B", value: 420 },
        { name: "C", value: 7004 },
        { name: "D", value: 100 },
        { name: "E", value: 70 },
        { name: "F", value: 100 }
    ];

    const sum = data.reduce((acc, entry) => acc + entry.value, 0);
    const avg = (sum / data.length).toFixed(2);

    console.log('Total Expenses: ' + sum);
    console.log('Average: ' + avg);


    const receivers = data.filter(entry => entry.value > avg)
        .map(entry => ({ name: entry.name, value: Math.abs(entry.value - avg) }));

    const borrowers = data.filter(entry => entry.value < avg)
        .map(entry => ({ name: entry.name, value: Math.abs(entry.value - avg) }));


    let borSum = 0;
    const recSum = receivers.reduce((acc, entry) => acc + entry.value, 0);


    let index = 0;
    for (let i = 0; i < borrowers.length; i++) {

        if (index >= receivers.length) break;

        if (receivers[index].value >= borrowers[i].value) {
            console.log(`${borrowers[i].name} will pay to ${receivers[index].name} ==> ${parseFloat(borrowers[i].value).toFixed(2)}`);
            borSum += borrowers[i].value;

            receivers[index].value -= borrowers[i].value;
            borrowers[i].value = 0;

            if (receivers[index].value === 0) {
                index++;
                if (index < receivers.length)
                    receivers[index].value = receivers[index].value;
                else
                    break; // No more receivers, exit the loop
            }
        } else {
            console.log(`${borrowers[i].name} will pay toooo ${receivers[index].name} ==> ${parseFloat(receivers[index].value).toFixed(2)}`);
            borSum += receivers[index].value;


            borrowers[i].value -= receivers[index].value;
            receivers[index].value = 0;
            index++;
            i--; // Retry the same borrower with the remaining receivers[index].value
        }

    }

    console.log('------------', recSum, '-----------------');
    console.log('------------', borSum, '-----------------');

}

// Call the function
solve();
