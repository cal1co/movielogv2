const postAge = (date: string): string => {
    const dateObj = new Date(date);
    const currentDateTime = new Date();
    const timeDiff = currentDateTime.getTime() - dateObj.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours
    if (hoursDiff >= 24) {
      const daysDiff = Math.floor(hoursDiff / 24);
      return `${daysDiff}d`;
    } else if (hoursDiff < 1) {
      const minutesDIff = Math.floor((timeDiff / (1000 * 60)))
      return `${minutesDIff}m`;
    }

    return `${hoursDiff}h`;
  };
export default postAge