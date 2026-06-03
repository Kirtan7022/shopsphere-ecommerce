class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Text search by keyword
  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { name: { $regex: this.queryStr.keyword, $options: 'i' } },
            { description: { $regex: this.queryStr.keyword, $options: 'i' } },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter by fields (price[gte]=100&category=electronics)
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ['keyword', 'page', 'limit', 'sort', 'fields'];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Advanced filtering (gt, gte, lt, lte, in)
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Sort results
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  // Select specific fields
  selectFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // Paginate
  paginate(defaultLimit = 12) {
    const page = Math.max(1, parseInt(this.queryStr.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(this.queryStr.limit) || defaultLimit));
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    this.pagination = { page, limit, skip };
    return this;
  }
}

export default ApiFeatures;
