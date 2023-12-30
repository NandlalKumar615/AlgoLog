const User = require("../models/userModel");

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                title: {
                    $regex: new RegExp(this.queryStr.keyword, 'i')
                },
            }
            : {};

        // console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(searchFilter) {
        let queryCopy = {...this.queryStr};
        if(searchFilter.userID){
            // queryCopy = { ...this.queryStr, user : userID};
            queryCopy.user = searchFilter.userID;
        }
        if(searchFilter.public){
            queryCopy.public = true;
        }
        if(searchFilter.favourite){
            queryCopy._id = { $in:searchFilter.notesIDArray}
        }

        // console.log(queryCopy);

        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        
        this.query = this.query.find(queryCopy);
        return this;
    };

    pagination() {
        const resultPerPage = this.queryStr.limit || 12;
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = (currentPage-1)*resultPerPage;

        // console.log(currentPage,resultPerPage);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;