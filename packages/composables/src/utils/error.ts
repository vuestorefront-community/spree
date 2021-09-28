export const handleApiErrorResponse = (error: any) => {
  if (error.response?.data?.summary) {
    throw new Error(error.response?.data?.summary);
  } else {
    throw error;
  }
};

export const extractApiErrorSummary = (error: any) => {
  if (error.response?.data?.summary) {
    return error.response?.data?.summary;
  } else {
    return null;
  }
};
