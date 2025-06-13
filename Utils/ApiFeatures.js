class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const excludeFields = ["sort", "page", "limit", "fields"];
    const queryObj = { ...this.queryStr };

    excludeFields.forEach((el) => {
      delete queryObj[el];
    });

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);

    this.query = this.query.find(query);

    console.log("filter");
    console.log(this);

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    console.log("sort");
    console.log(this);
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    console.log("limitFields");
    console.log(this);
    return this;
  }

  paginate() {
    const page = parseInt(this.queryStr.page) || 1;
    const limit = parseInt(this.queryStr.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    // if (this.queryStr.page) {
    //   const moviesCount = await this.query.countDocuments();
    //   if (skip >= moviesCount) {
    //     throw new Error("This page is not found!");
    //   }
    // }

    console.log("paginate");
    console.log(this.query);
    return this;
  }
}

module.exports = ApiFeatures;
