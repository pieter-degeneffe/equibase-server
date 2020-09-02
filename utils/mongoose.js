exports.deleteItem = async (model, id) => {
  const item = await model.findByIdAndDelete(id);
  console.log('Arne: item= ', item);
  if (item) {
    return item;
  } else {
    throw { statusCode: 404, message: `${ id } not found`, status: 'Not Found' };
  }
}

