/**
     * 空判断
     * @param {*} value
     * @returns
     */
  export function  isEmpty(value:any) {
      let result = false;
      if (value === null || value === undefined) {
          result = true;
      }
      if (typeof value === 'string' && (value.replace(/\s+/g, "") === "" || value === "")) {
          result = true;
      }
      if (typeof value === "object" && value instanceof Array && value.length === 0) {
          result = true;
      }
      return result;
  }