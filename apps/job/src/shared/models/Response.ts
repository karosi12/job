class RNResponse {
  private readonly data;
  private readonly errors;
  private readonly message: string;
  private readonly status: number;
  /**
   * @param {Object} data
   * @param {Object} errors
   * @param {String} message
   * @param {Number} status
   */

  constructor({ data, errors = {}, message = '', status }) {
    this.data = data;
    this.errors = errors;
    this.message = message;
    this.status = status;
  }
}
export default RNResponse;
