export const paginate = (data, page, perPage = 10) => {
    const start = (page - 1) * perPage;
    return data.slice(start, start + perPage);
  };
  