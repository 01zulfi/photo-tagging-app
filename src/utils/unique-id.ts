const uniqueId = (): string =>
  Math.floor(Math.random() * Date.now() + Math.random() * 9999).toString();

export default uniqueId;
