//Group members


var express = require('express');
var router = express.Router();
var axios = require("axios");
var dayjs = require("dayjs");
var placeModel = require("./../models/place.model");
var reviewModel = require("./../models/review.model");
var favModel = require("./../models/fav.model");

//const API_KEY = 'AIzaSyCvHcIZbtF80KUW23vCV_kmmr2EVixerAI'
const API_KEY = 'AIzaSyCtxequ1UZM0sFrefdmgMOVx_5YbpZ7_mc'

const without = (arr, ...args) => arr.filter(v => !args.includes(v.place_id));
const pick = (obj, arr) =>
    arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});


async function getPlacesNameList() {
    var data = await axios.get("https://www.ha.org.hk/opendata/aed/aedwtdata-en.json");
        var data1=data.data.waitTime;
    time=data.data.updateTime;
        for(i=0;i<data1.length;i++) {data1[i].updateTime=data.data.updateTime;};

    return data1
}

const getPlaceList = async (placeJson) => {
    var nameList = placeJson;
    var reqList = nameList.map(
        async (it, index) =>
            await axios.get(
                `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&key=${API_KEY}&input=${it.hospName}`
            )
    );

    var data = await Promise.all(reqList);
    var axsData = data.map(it => it.data)

    var finalDataList = axsData
        .map((it) => it.predictions[0].place_id)
        .map(
            async (it, index) =>
                await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?&key=${API_KEY}&placeid=${it}`)
        );

    var dataList = await Promise.all(finalDataList);
    var axsDataList = dataList.map(it => it.data)
    var finalData = axsDataList.map((it, index) => ({
        ...it.result,
        wait: nameList[index],
    }));

    var saveJson = finalData.map((it) =>
        pick(it, [
            "name",
            "formatted_address",
            "formatted_phone_number",
            "icon",
            "geometry",
            "opening_hours",
            "place_id",
            "rating",
            "user_ratings_total",
            "wait",
            "website",
        ])
    );
    var reviewsJson = finalData.map((it) => pick(it, ["reviews", "place_id"]));
    return { saveJson, reviewsJson }
}

router.get('/', async function (req, res, next) {
//	var data1 = await getPlacesNameList();
    var data = await getPlaceList(getPlacesNameList())

    return res.json({ code: 200, data })
});

router.get('/delPlace', async function (req, res, next) {
    let id = req.query.id
    placeModel.findByIdAndRemove(id, function (err, doc) {
        favModel.remove({place_id:doc.place_id}, function (err, doc) {
            return res.send({ code: 200, msg: 'success' })
        })
    })
});

router.get('/getJson', async function (req, res, next) {
    return res.json({ code: 200, data: await getPlacesNameList() })
});

router.get('/getPlaceInfo', async function (req, res, next) {
    var { place_id } = req.query

    placeModel.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "place_id",
                foreignField: "place_id",
                as: "review"
            }
        }, {
            $match: { place_id }
        }

    ], function (err, resdata) {
        return res.json({ code: 200, data: resdata })
    })
});

router.get('/getFavsList', async function (req, res, next) {
    var { user_id } = req.query

    favModel.aggregate([
        {
            $match: { user_id }
        },
        {
            $lookup: {
                from: "places",
                localField: "place_id",
                foreignField: "place_id",
                as: "place"
            }
        },

    ], function (err, resdata) {
        return res.json({ code: 200, data: resdata })
    })
});


router.get('/getPlaceList', async function (req, res, next) {
    var { place_id } = req.query
    console.log('place_id -> :', place_id)

    placeModel.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "place_id",
                foreignField: "place_id",
                as: "review"
            }
        }, {
            $match: { place_id }
        }

    ], function (err, resdata) {
        return res.json({ code: 200, data: resdata })
    })
});

router.get('/getPlacesLists', async function (req, res, next) {
    placeModel.find({}, function (err, resdata) {
        return res.json({ code: 200, data: resdata })
    })
});

router.post('/saveJson', async function (req, res, next) {
    var { data } = req.body
    // var newd = JSON.parse(data)
    // saveJson, reviewsJson
	//var data1 = await getPlacesNameList();
    var newdataes = await getPlaceList(await getPlacesNameList())
    var newd = newdataes.saveJson

    var place_ids = []
    newd.forEach((it, index) => {
        placeModel.find({
            place_id: it.place_id
        }).then((resdata, err) => {
            if (resdata.length) {
                place_ids.push(it.place_id)
            }
        })
    })
    setTimeout(() => {
        var newDatas = without(newd, ...place_ids)
        console.log('newDatas -> :', newDatas)

        var newData = newDatas.map((it, index) => new placeModel({
            ...it
        }))

        placeModel.insertMany(newData, function (err) {
            console.log(err);
        });

        return res.json({ code: 200, msg: 'ok' })
    }, 1500)
});

router.post('/saveReviewsJson', async function (req, res, next) {
    var { data } = req.body
    // var newd = JSON.parse(data)

    // saveJson, reviewsJson
var data1 = await getPlacesNameList();
    var newdataes = await getPlaceList(data1)
    var newd = newdataes.reviewsJson

    var place_ids = []
    newd.forEach((it, index) => {
        reviewModel.find({
            place_id: it.place_id
        }).then((resdata, err) => {
            if (resdata.length) {
                place_ids.push(it.place_id)
            }
        })
    })
    setTimeout(() => {
        var newDatas = without(newd, ...place_ids)
        console.log('newDatas -> :', newDatas)

        var newData = newDatas.map((it, index) => new reviewModel({
            ...it
        }))

        reviewModel.insertMany(newData, function (err) {
            console.log(err);
        });

        return res.json({ code: 200, msg: 'ok' })
    }, 1500)
});

router.post('/updateText', async function (req, res, next) {
    var { data } = req.body
    var newd = JSON.parse(data)
    var sum=0;
    for (var i=0 ; i<newd.reviews.length;i++){
        sum= sum+ parseInt(newd.reviews[i].rating);
    }
    reviewModel.findOneAndUpdate(
        { place_id: newd.place_id },
        { $set: { reviews: newd.reviews } },
        {},
        function (err, data) {
            placeModel.findOneAndUpdate(
                { place_id: newd.place_id },
                {$set: {user_ratings_total: sum,rating: (sum/newd.reviews.length).toFixed(1)} },
                {},
                function (err, data) {
                    return res.json({ code: 200, msg: 'ok' })
                })
        })

    
});

router.post('/addPlace', async (req, res, next) => {
    var { place_id, user_id } = req.body

    var favs = new favModel({
        place_id, user_id
    })

    favModel.find({ place_id, user_id }, function (err, resdata) {
        if (resdata && resdata.length) {
            return res.json({ code: 500, msg: 'Users have followed the site' })
        }
        favs.save()
        return res.json({ code: 200, msg: 'ok' })
    })

})

router.post('/updatePlace', async (req, res, next) => {
    var { name, rating, formatted_phone_number, formatted_address, website, _id, lat, lng } = req.body;
    const geometry = {location:{lat: lat,lng:lng}}
    const aa = { name:name,rating:rating, formatted_phone_number:formatted_phone_number, formatted_address:formatted_address, 
        website:website, _id:_id,geometry:geometry}
    if (!name || !_id) {
        return res.json({ code: 500, msg: 'Parameter cannot be empty' })
    }

    placeModel.findByIdAndUpdate(_id, { $set: { ...aa } }, function (err, doc) {
        res.send({ code: 200, data: 'ok' })
    })
})


router.post('/addNewPlace', async (req, res, next) => {
    const { name, rating, formatted_phone_number, formatted_address, website, lat, lng } = req.body;
    const user_ratings_total = 1;
    const geometry = {location:{lat: lat,lng:lng}}
    const wait = {hospName:name}
    if (!name) {
        return res.json({ code: 500, msg: 'Parameter cannot be empty' })
    }
    placeModel.find({
        name: name
    }, (err, doc) => {
        if (doc.length) {
            return res.json({ code: 500, msg: 'Name already exists' })
        }
    })
    var place = new placeModel({
        name, rating, user_ratings_total, formatted_phone_number, formatted_address, website,geometry,wait
    })
    
    var place_id= place._id

    place = new placeModel({
        name, rating, user_ratings_total, formatted_phone_number, formatted_address, website,geometry,wait, place_id
    })
    
    place.save()
    var review = new reviewModel({
        place_id
    })
    review.save()
    res.json({ code: 200, msg: 'success' })
});


function get7days() {
    var arr = []
    for (let index = 0; index < 7; index++) {
        var hs = dayjs().subtract(index, 'day').format("YYYYMMDD-HHmm")
        arr.push(hs)
    }
    arr = arr.map(it => {
        var hs = it.slice(0, 11)
        var cum = it.slice(11, 13)
        var cm = Number(cum) - (Number(cum) % 15)
        return hs + (cm < 9 ? '0' + cm : cm)
    })
    return arr.reverse()
}
function gettimes(len) {
    var arr = []
    for (let index = 0; index < len; index++) {
        var hs = dayjs().subtract(15 * index, 'minute').format("YYYYMMDD-HHmm")
        arr.push(hs)
    }
    arr = arr.map(it => {
        var hs = it.slice(0, 11)
        var cum = it.slice(11, 13)
        var cm = Number(cum) - (Number(cum) % 15)
        return hs + (cm < 9 ? '0' + cm : cm)
    })
    return arr.reverse()
}

const flatten = (arr, depth = 1) =>
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);


router.get('/tenData', async function (req, res, next) {
    var times = gettimes(41)

    var reqList = times.map(
        async (it, index) =>
            await axios.get(
                `https://api.data.gov.hk/v1/historical-archive/get-file?url=http%3A%2F%2Fwww.ha.org.hk%2Fopendata%2Faed%2Faedwtdata-tc.json&time=${it}`
            )
    );

    var data = await Promise.all(reqList);
    var axsData = data.map(it => it.data)
    return res.json({ code: 200, data: axsData })
});



router.get('/daysData', async function (req, res, next) {
    var times = get7days()

    var reqList = times.map(
        async (it, index) =>
            await axios.get(
                `https://api.data.gov.hk/v1/historical-archive/get-file?url=http%3A%2F%2Fwww.ha.org.hk%2Fopendata%2Faed%2Faedwtdata-tc.json&time=${it}`
            )
    );

    var data = await Promise.all(reqList);
    var axsData = data.map(it => it.data)
    return res.json({ code: 200, data: axsData })
});

module.exports = router;
