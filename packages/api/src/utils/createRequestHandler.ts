export const createRequestHandler = handler => async (req, res) => {
  try {
    const result = await handler(req, res);
    return res.json({
      error: null,
      data: result,
    });
  } catch (error) {
    return {
      error: error.message,
      data: null,
    };
  }
};
