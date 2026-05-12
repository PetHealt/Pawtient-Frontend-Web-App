import { User } from "../domain/model/user.entity.js";

/**
 * @typedef {Object} UserApiResource
 * @property {string} [id]
 * @property {string} [clinicId]
 * @property {string} [role]
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [password]
 */

/**
 * Maps user resources from infrastructure responses into domain entities.
 */
export class UserAssembler {
    /**
     * @param {import('axios').AxiosResponse<UserApiResource[]>} response
     * @returns {User[]}
     */
    static toEntitiesFromResponse(response) {
        const usersResponse = response.data;
        return usersResponse.map((user) => {
            return this.toEntityFromResource(user);
        });
    }

    /**
     * @param {UserApiResource} resource
     * @returns {User}
     */
    static toEntityFromResource(resource) {
        return new User(resource);
    }
}