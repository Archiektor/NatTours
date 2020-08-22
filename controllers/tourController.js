const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
// 2) ROUTE HANDLER
exports.checkId = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        })
    }
    next();
}

exports.checkBody = (req, res, next) => { // check incoming Request for a body
    console.log('req from checkbody', req);
    if (!req.body.name || !req.body.price) return res.status(400).json({
        status: 'fail',
        message: 'Missing name or price'
    });
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200)
        .json({
            status: 'success',
            requestedAt: req.requestTime,
            results: tours.length,
            data: {
                tours: tours,
            }
        })
};
exports.getTour = (req, res) => { // optional parametr :id?
    const id = req.params.id * 1;
    const tour = tours.find(t => t.id === id);
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour,
        }
    })

};
exports.createTour = (req, res) => {
    //console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = {id: newId, ...req.body}

    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res
            .status(201)
            .json({
                status: 'success',
                data: {
                    tour: newTour,
                }
            })
    })
}; //request contains all data from browser/user try to send to server
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        }
    })
};
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
};