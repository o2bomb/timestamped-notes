/**
 * Example usage:
 * const [{ exists }] = await Lecture.query(
 *     isExistsQuery(
 *      Lecture.createQueryBuilder()
 *         .select('*')
 *        .where(`id = ${lectureId}`)
 *       .getQuery()
 *     )
 * );
 * 
 * SOURCE:
 * - https://github.com/typeorm/typeorm/issues/2815#issuecomment-475040651
 * @param query 
 */
export const isExistsQuery = (query: string) =>
  `SELECT EXISTS(${query}) AS "exists"`;